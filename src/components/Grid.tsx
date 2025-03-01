"use client";

import { getPokemonList } from "@/lib/api";
import { PokemonListItem, PokemonListResponse } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorDisplay from "./ErrorDisplay";
import SearchBar from "./SearchBar";
import { Button } from "./ui/button";
import PokemonCard from "./PokemonCard";
import LoadingCard from "./LoadingCard";

interface GridProps {
	initialData?: PokemonListResponse;
}

const ITEMS_PER_LOAD = 20;

const Grid = ({ initialData }: GridProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialSearch = searchParams.get("search") || "";

	const [searchTerm, setSearchTerm] = useState(initialSearch);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [pokemonList, setPokemonList] = useState<PokemonListItem[]>(
		initialData?.results || []
	);
	const [offset, setOffset] = useState(initialData?.results.length || 0);
	const [hasMore, setHasMore] = useState(true);

	const handleLoadMore = async () => {
		if (isLoading || !hasMore) return;

		setIsLoading(true);

		try {
			const moreData = await getPokemonList(ITEMS_PER_LOAD, offset);

			let morePokemon = moreData.results;

			if (searchTerm) {
				morePokemon = morePokemon.filter((pokemon) =>
					pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
				);
			}

			setPokemonList((prevList) => [...prevList, ...morePokemon]);

			setOffset((prev) => prev + ITEMS_PER_LOAD);

			setHasMore(offset + ITEMS_PER_LOAD < moreData.count);
		} catch (error) {
			setIsError(true);
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSearch = async (searchInput: string) => {
		setSearchTerm(searchInput);
		setIsLoading(true);

		const params = new URLSearchParams(searchParams.toString());

		if (searchInput) params.set("search", searchInput);
		else params.delete("search");

		router.push(`?${params.toString()}`);

		try {
			setOffset(0);

			const newData = await getPokemonList(ITEMS_PER_LOAD, 0);

			let newPokemon = newData.results;

			if (searchInput) {
				newPokemon = newPokemon.filter((pokemon) =>
					pokemon.name.toLowerCase().includes(searchInput.toLowerCase())
				);
			}

			setPokemonList(newPokemon);

			setHasMore(newPokemon.length === ITEMS_PER_LOAD);
		} catch (error) {
			setIsError(true);
			setError(error as Error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (initialSearch && !pokemonList.length) {
			handleSearch(initialSearch);
		}
	}, []);

	if (isError) {
		return (
			<ErrorDisplay
				message={error?.message || "An error occurred"}
				onRetry={() => router.push("/")}
				buttonText="Go back home"
			/>
		);
	}

	const hasNoResults = !isLoading && pokemonList.length === 0;

	return (
		<div>
			<div className="mb-4">
				<SearchBar onSearch={handleSearch} />
			</div>

			{hasNoResults && searchTerm && (
				<div className="text-center py-8 rounded-lg mb-6">
					<p className="text-lg">
						No Pokémon found matching &quot;{searchTerm}&quot;
					</p>
					<Button
						variant="default"
						onClick={() => {
							handleSearch("");
						}}
						className="mt-2 px-4 py-2 rounded cursor-pointer"
					>
						Clear Search
					</Button>
				</div>
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{pokemonList.map((pokemon) => (
					<PokemonCard
						key={`${pokemon.name}-${pokemon.url}`}
						pokemon={pokemon}
					/>
				))}
			</div>

			{isLoading && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
					{Array.from({ length: 4 }).map((_, index) => (
						<LoadingCard key={`loading-${index}`} />
					))}
				</div>
			)}

			{!isLoading && hasMore && pokemonList.length > 0 && (
				<div className="flex justify-center mt-8">
					<Button
						onClick={handleLoadMore}
						className="px-6 py-3 rounded font-medium cursor-pointer"
					>
						Load More Pokémon
					</Button>
				</div>
			)}

			{!hasMore && pokemonList.length > 0 && (
				<div className="text-center mt-8 text-gray-500">
					You&apos;ve reached the end of the list
				</div>
			)}
		</div>
	);
};

export default Grid;
