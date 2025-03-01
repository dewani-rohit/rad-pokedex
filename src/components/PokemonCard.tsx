import { PokemonListItem } from "@/types";
import Link from "next/link";
import Image from "next/image";
import {
	capitalizeFirstLetter,
	formatPokemonId,
	getImageUrl,
} from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

interface PokemonCardProps {
	pokemon: PokemonListItem;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
	const id = pokemon.url.split("/").slice(-2, -1)[0];

	return (
		<Link href={`/pokemon/${id}`}>
			<Card className="hover:border-pokemon-red hover:rotate-1 transition-all duration-300 ease-out">
				<CardContent>
					<div className="relative h-40">
						<Image
							src={getImageUrl(id)}
							alt={pokemon.name}
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
							className="object-contain p-4"
						/>
					</div>

					<div className="p-4">
						<p className="text-gray-500 text-sm mb-1">{formatPokemonId(id)}</p>
						<h2 className="font-semibold text-lg mb-2">
							{capitalizeFirstLetter(pokemon.name)}
						</h2>
					</div>
				</CardContent>
			</Card>
		</Link>
	);
};

export default PokemonCard;
