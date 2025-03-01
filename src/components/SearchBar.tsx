import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface SearchBarProps {
	onSearch: (term: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchInput, setSearchInput] = useState("");

	useEffect(() => {
		const searchTerm = searchParams.get("search") || "";
		setSearchInput(searchTerm);

		if (searchTerm) {
			onSearch(searchTerm);
		}
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		const params = new URLSearchParams(searchParams.toString());

		if (searchInput) {
			params.set("search", searchInput);
		} else {
			params.delete("search");
		}

		router.push(`?${params.toString()}`);

		onSearch(searchInput);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex justify-center"
		>
			<div className="relative flex gap-2">
				<Input
					type="text"
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					placeholder="Search pokémon..."
					className="w-full sm:w-64"
				/>

				<Button
					type="submit"
					className="cursor-pointer"
				>
					Submit
				</Button>
			</div>
		</form>
	);
};

export default SearchBar;
