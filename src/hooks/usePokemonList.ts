"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "@/lib/api";
import { PokemonListItem } from "@/types";

interface UsePokemonListResult {
	pokemonList: PokemonListItem[];
	totalCount: number;
	totalPages: number;
	isLoading: boolean;
	isError: boolean;
	error: unknown;
	page: number;
	limit: number;
}

export function usePokemonList(
	page: number = 1,
	limit: number = 20,
	searchTerm: string = ""
): UsePokemonListResult {
	const offset = (page - 1) * limit;

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["pokemonList", page, limit],
		queryFn: () => getPokemonList(limit, offset),
	});

	let pokemonList: PokemonListItem[] = [];
	let totalCount = 0;

	if (data) {
		pokemonList = data.results;
		totalCount = data.count;

		if (searchTerm) {
			pokemonList = pokemonList.filter((pokemon) =>
				pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
			totalCount = pokemonList.length;
		}
	}

	const totalPages = Math.ceil(totalCount / limit);

	return {
		pokemonList,
		totalCount,
		totalPages,
		isLoading,
		isError,
		error,
		page,
		limit,
	};
}
