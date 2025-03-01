/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PokemonListItem {
	name: string;
	url: string;
}

export interface PokemonListResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokemonListItem[];
}

export interface PokemonDetails {
	id: number;
	name: string;
	base_experience: number;
	height: number;
	weight: number;
	abilities: {
		ability: {
			name: string;
			url: string;
		};
		is_hidden: boolean;
		slot: number;
	}[];
	types: {
		slot: number;
		type: {
			name: string;
			url: string;
		};
	}[];
	stats: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	}[];
	moves: {
		move: {
			name: string;
			url: string;
		};
		version_group_details: {
			level_learned_at: number;
			move_learn_method: {
				name: string;
				url: string;
			};
			version_group: {
				name: string;
				url: string;
			};
		}[];
	}[];
	sprites: {
		front_default: string;
		other: {
			"official-artwork": {
				front_default: string;
			};
		};
	};
}

export interface PokemonSpecies {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchable: boolean;
	growth_rate: {
		name: string;
		url: string;
	};
	pokedex_numbers: {
		entry_number: number;
		pokedex: {
			name: string;
			url: string;
		};
	}[];
	egg_groups: {
		name: string;
		url: string;
	}[];
	color: {
		name: string;
		url: string;
	};
	shape: {
		name: string;
		url: string;
	};
	evolves_from_species: {
		name: string;
		url: string;
	} | null;
	evolution_chain: {
		url: string;
	};
	habitat: {
		name: string;
		url: string;
	} | null;
	generation: {
		name: string;
		url: string;
	};
	flavor_text_entries: {
		flavor_text: string;
		language: {
			name: string;
			url: string;
		};
		version: {
			name: string;
			url: string;
		};
	}[];
	genera: {
		genus: string;
		language: {
			name: string;
			url: string;
		};
	}[];
}

export interface EvolutionChain {
	id: number;
	baby_trigger_item: any;
	chain: ChainLink;
}

export interface ChainLink {
	is_baby: boolean;
	species: {
		name: string;
		url: string;
	};
	evolution_details: EvolutionDetail[];
	evolves_to: ChainLink[];
}

export interface EvolutionDetail {
	item: {
		name: string;
		url: string;
	} | null;
	trigger: {
		name: string;
		url: string;
	} | null;
	gender: number | null;
	held_item: {
		name: string;
		url: string;
	} | null;
	known_move: {
		name: string;
		url: string;
	} | null;
	known_move_type: {
		name: string;
		url: string;
	} | null;
	location: {
		name: string;
		url: string;
	} | null;
	min_level: number | null;
	min_happiness: number | null;
	min_beauty: number | null;
	min_affection: number | null;
	needs_overworld_rain: boolean;
	party_species: {
		name: string;
		url: string;
	} | null;
	party_type: {
		name: string;
		url: string;
	} | null;
	relative_physical_stats: number | null;
	time_of_day: string;
	trade_species: {
		name: string;
		url: string;
	} | null;
	turn_upside_down: boolean;
}
