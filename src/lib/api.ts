import {
	EvolutionChain,
	PokemonDetails,
	PokemonListResponse,
	PokemonSpecies,
} from "@/types";

const API_BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
	limit = 20,
	offset = 0
): Promise<PokemonListResponse> {
	try {
		const response = await fetch(
			`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
		);

		if (!response.ok) throw new Error("Failed to fetch pokemon list");

		return response.json();
	} catch (error) {
		console.error("Error fetching pokemon list:", error);
		throw error;
	}
}

export async function getPokemonDetails(id: string): Promise<PokemonDetails> {
	try {
		const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);

		if (!response.ok) throw new Error(`Failed to fetch pokemon: ${id}`);

		return response.json();
	} catch (error) {
		console.error(`Error fetching pokemon ${id}:`, error);
		throw error;
	}
}

export async function getPokemonSpecies(
	id: string | number
): Promise<PokemonSpecies> {
	try {
		const response = await fetch(`${API_BASE_URL}/pokemon-species/${id}`);

		if (!response.ok) throw new Error(`Failed to fetch pokemon species: ${id}`);

		return response.json();
	} catch (error) {
		console.error(`Error fetching pokemon species ${id}:`, error);
		throw error;
	}
}

export async function getEvolutionChain(url: string): Promise<EvolutionChain> {
	try {
		const response = await fetch(url);

		if (!response.ok) throw new Error(`Failed to fetch evolution chain`);

		return response.json();
	} catch (error) {
		console.error(`Error fetching evolution chain:`, error);
		throw error;
	}
}
