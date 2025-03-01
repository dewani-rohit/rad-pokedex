"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "@/lib/api";
import { PokemonDetails } from "@/types";

export function usePokemonDetails(id: string) {
	return useQuery<PokemonDetails, Error>({
		queryKey: ["pokemon", id],
		queryFn: () => getPokemonDetails(id),
		retry: 2,
		refetchOnWindowFocus: false,
	});
}
