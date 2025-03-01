"use client";

import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "@/lib/api";
import { PokemonDetail } from "@/types/pokemon";

export function usePokemonDetails(id: string) {
	return useQuery<PokemonDetail, Error>({
		queryKey: ["pokemon", id],
		queryFn: () => getPokemonDetails(id),
		retry: 2,
		refetchOnWindowFocus: false,
	});
}
