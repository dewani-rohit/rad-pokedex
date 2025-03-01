import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function capitalizeFirstLetter(string: string): string {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getImageUrl(id: string | number): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export function formatPokemonId(id: number | string): string {
	return `#${String(id).padStart(4, "0")}`;
}

type PokemonType =
	| "normal"
	| "fire"
	| "water"
	| "electric"
	| "grass"
	| "ice"
	| "fighting"
	| "poison"
	| "ground"
	| "flying"
	| "psychic"
	| "bug"
	| "rock"
	| "ghost"
	| "dragon"
	| "dark"
	| "steel"
	| "fairy";

export function getTypeColor(type: string): string {
	const colors: Record<PokemonType, string> = {
		normal: "bg-gray-400",
		fire: "bg-red-500",
		water: "bg-blue-500",
		electric: "bg-yellow-400",
		grass: "bg-green-500",
		ice: "bg-blue-200",
		fighting: "bg-red-700",
		poison: "bg-purple-500",
		ground: "bg-yellow-700",
		flying: "bg-indigo-300",
		psychic: "bg-pink-500",
		bug: "bg-green-400",
		rock: "bg-yellow-800",
		ghost: "bg-purple-700",
		dragon: "bg-indigo-700",
		dark: "bg-gray-800",
		steel: "bg-gray-500",
		fairy: "bg-pink-300",
	};

	return colors[type as PokemonType] || "bg-gray-400";
}
