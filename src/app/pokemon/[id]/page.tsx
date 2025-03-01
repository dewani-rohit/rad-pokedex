/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
	getPokemonDetails,
	getPokemonSpecies,
	getEvolutionChain,
} from "@/lib/api";
import {
	capitalizeFirstLetter,
	formatPokemonId,
	getImageUrl,
	getTypeColor,
} from "@/lib/utils";
import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface PokemonDetailPageProps {
	params: {
		id: string;
	};
}

export async function generateMetadata({
	params,
}: PokemonDetailPageProps): Promise<Metadata> {
	const { id } = await params;

	try {
		const pokemon = await getPokemonDetails(id);
		return {
			title: `${capitalizeFirstLetter(pokemon.name)} | Pokémon Explorer`,
			description: `View details about ${capitalizeFirstLetter(
				pokemon.name
			)}, a ${pokemon.types
				.map((t) => capitalizeFirstLetter(t.type.name))
				.join("/")} type Pokémon.`,
		};
	} catch (error) {
		console.error(error);
		return {
			title: "Pokémon Details",
			description: "View detailed information about this Pokémon.",
		};
	}
}

export const revalidate = 86400;

export default async function PokemonDetailsPage({
	params,
}: PokemonDetailPageProps) {
	const { id } = await params;

	try {
		const pokemon = await getPokemonDetails(id);
		const species = await getPokemonSpecies(id);
		const evolutionChain = await getEvolutionChain(species.evolution_chain.url);

		const gameDescriptions: Record<string, string> = {};
		species.flavor_text_entries
			.filter((entry) => entry.language.name === "en")
			.forEach((entry) => {
				const version = capitalizeFirstLetter(entry.version.name);
				if (!gameDescriptions[version]) {
					gameDescriptions[version] = entry.flavor_text.replace(/\f/g, " ");
				}
			});

		const gameVersions = Object.keys(gameDescriptions);

		const levelUpMoves = pokemon.moves
			.filter((move) => {
				const versionDetail = move.version_group_details[0];
				return (
					versionDetail?.move_learn_method.name === "level-up" &&
					versionDetail.level_learned_at > 0
				);
			})
			.sort(
				(a, b) =>
					(a.version_group_details[0]?.level_learned_at || 0) -
					(b.version_group_details[0]?.level_learned_at || 0)
			)
			.slice(0, 100);

		return (
			<div className="max-w-4xl mx-auto pb-12">
				<div className="rounded-lg shadow-md overflow-hidden">
					<div className="p-8">
						<div className="flex flex-col md:flex-row items-center">
							<div className="relative h-64 w-64 mb-6 md:mb-0">
								<Image
									src={getImageUrl(id)}
									alt={pokemon.name}
									fill
									priority
									className="object-contain"
								/>
							</div>

							<div className="md:ml-8 flex-1">
								<div className="flex items-baseline mb-2">
									<span className="text-gray-500 mr-2">
										{formatPokemonId(pokemon.id)}
									</span>
									<h1 className="text-3xl font-bold">
										{capitalizeFirstLetter(pokemon.name)}
									</h1>
								</div>

								<div className="mb-4">
									<div className="flex gap-2">
										{pokemon.types.map((typeInfo) => (
											<span
												key={typeInfo.type.name}
												className={`${getTypeColor(
													typeInfo.type.name
												)} px-3 py-1 rounded`}
											>
												{capitalizeFirstLetter(typeInfo.type.name)}
											</span>
										))}
									</div>
								</div>

								<div className="text-gray-300">
									<p>
										<span className="font-medium">Species:</span>{" "}
										{species.genera.find((g) => g.language.name === "en")
											?.genus || "Unknown"}
									</p>
									<p>
										<span className="font-medium">Height:</span>{" "}
										{pokemon.height / 10} m
									</p>
									<p>
										<span className="font-medium">Weight:</span>{" "}
										{pokemon.weight / 10} kg
									</p>
									<p>
										<span className="font-medium">Habitat:</span>{" "}
										{species.habitat
											? capitalizeFirstLetter(species.habitat.name)
											: "Unknown"}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="p-6">
						<Tabs
							defaultValue="about"
							className="w-full"
						>
							<TabsList className="flex flex-wrap gap-2 mb-10 h-fit">
								<TabsTrigger
									className="cursor-pointer"
									value="about"
								>
									About
								</TabsTrigger>
								<TabsTrigger
									className="cursor-pointer"
									value="stats"
								>
									Stats
								</TabsTrigger>
								<TabsTrigger
									className="cursor-pointer"
									value="evolution"
								>
									Evolution
								</TabsTrigger>
								<TabsTrigger
									className="cursor-pointer"
									value="moves"
								>
									Moves
								</TabsTrigger>
							</TabsList>

							<TabsContent
								value="about"
								className="space-y-6"
							>
								<div>
									<h2 className="text-lg font-semibold mb-2">Abilities</h2>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-2">
										{pokemon.abilities.map((abilityInfo) => (
											<div
												key={abilityInfo.ability.name}
												className="p-3 rounded border"
											>
												<div className="font-medium">
													{capitalizeFirstLetter(abilityInfo.ability.name)}
													{abilityInfo.is_hidden && (
														<span className="ml-2 text-xs text-gray-500">
															(Hidden)
														</span>
													)}
												</div>
											</div>
										))}
									</div>
								</div>

								<h2 className="text-lg font-semibold mb-4">Pokédex Entries</h2>

								<div className="space-y-4">
									{gameVersions.length > 0 ? (
										<Tabs
											defaultValue={gameVersions[0]}
											className="w-full"
										>
											<TabsList className="flex flex-wrap mb-4 h-fit">
												{gameVersions.slice(0, 8).map((version) => (
													<TabsTrigger
														key={version}
														value={version}
														className="m-1 cursor-pointer"
													>
														{version}
													</TabsTrigger>
												))}
											</TabsList>

											{gameVersions.slice(0, 8).map((version) => (
												<TabsContent
													key={version}
													value={version}
												>
													<div className="p-4 rounded border">
														{gameDescriptions[version]}
													</div>
												</TabsContent>
											))}
										</Tabs>
									) : (
										<p className="text-gray-500">
											No Pokédex entries available.
										</p>
									)}
								</div>
							</TabsContent>

							<TabsContent value="stats">
								<div className="grid grid-cols-1 gap-8">
									<div>
										<h2 className="text-lg font-semibold mb-4">Base Stats</h2>
										<div className="space-y-4">
											{pokemon.stats.map((stat) => (
												<div key={stat.stat.name}>
													<div className="flex justify-between mb-1">
														<span className="font-medium">
															{capitalizeFirstLetter(
																stat.stat.name.replace("-", " ")
															)}
															:
														</span>
														<span>{stat.base_stat}</span>
													</div>
													<div className="w-full bg-gray-200 rounded-full h-2.5">
														<div
															className={`h-2.5 rounded-full ${
																stat.base_stat > 150
																	? "bg-green-600"
																	: stat.base_stat > 100
																	? "bg-green-500"
																	: stat.base_stat > 70
																	? "bg-blue-500"
																	: stat.base_stat > 50
																	? "bg-yellow-500"
																	: "bg-red-500"
															}`}
															style={{
																width: `${Math.min(
																	100,
																	(stat.base_stat / 255) * 100
																)}%`,
															}}
														/>
													</div>
												</div>
											))}
										</div>

										<div className="mt-4 pt-4 border-t">
											<div className="flex justify-between font-bold">
												<span>Total:</span>
												<span>
													{pokemon.stats.reduce(
														(sum, stat) => sum + stat.base_stat,
														0
													)}
												</span>
											</div>
										</div>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="evolution">
								<h2 className="text-lg font-semibold mb-4">Evolution Chain</h2>
								<div className="flex flex-col items-center">
									<EvolutionChain chain={evolutionChain.chain} />
								</div>
							</TabsContent>

							<TabsContent value="moves">
								<h2 className="text-lg font-semibold mb-4">Level-Up Moves</h2>

								<div className="overflow-x-auto">
									<table className="min-w-full divide-y divide-gray-200">
										<thead>
											<tr>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Move
												</th>
												<th
													scope="col"
													className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													Level
												</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-gray-200">
											{levelUpMoves.map((moveInfo) => (
												<tr key={moveInfo.move.name}>
													<td className="px-6 py-4 whitespace-nowrap">
														<div className="font-medium">
															{capitalizeFirstLetter(
																moveInfo.move.name.replace("-", " ")
															)}
														</div>
													</td>
													<td className="px-6 py-4 whitespace-nowrap">
														{
															moveInfo.version_group_details[0]
																?.level_learned_at
														}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</TabsContent>
						</Tabs>
					</div>
				</div>

				<div className="flex justify-center mt-10">
					<Link href="/">
						<Button className="px-4 py-2 rounded cursor-pointer">
							Back to list
						</Button>
					</Link>
				</div>
			</div>
		);
	} catch (error) {
		console.error("Error fetching Pokemon details:", error);
		notFound();
	}
}

function EvolutionChain({ chain, level = 0 }: { chain: any; level?: number }) {
	const pokemon = {
		name: chain.species.name,
		id: extractIdFromUrl(chain.species.url),
	};

	return (
		<div className="flex flex-col items-center">
			<div className={`flex flex-col items-center ${level > 0 ? "mt-8" : ""}`}>
				{level > 0 && (
					<div className="mb-2 text-sm text-center">
						{chain.evolution_details.map((detail: any, index: number) => {
							let method = "";
							if (detail.min_level) method = `Level ${detail.min_level}`;
							else if (detail.item?.name)
								method = `Use ${capitalizeFirstLetter(
									detail.item.name.replace("-", " ")
								)}`;
							else if (detail.trigger?.name === "trade") method = "Trade";
							else if (detail.min_happiness)
								method = `Happiness (${detail.min_happiness}+)`;
							else method = "Special condition";

							return <div key={index}>{method}</div>;
						})}
						<div className="h-8 w-0.5 bg-gray-300 mx-auto my-1" />
					</div>
				)}

				<Link href={`/pokemon/${pokemon.id}`}>
					<div>
						<div className="relative h-20 w-20">
							<Image
								src={getImageUrl(pokemon.id)}
								alt={pokemon.name}
								fill
								className="object-contain"
							/>
						</div>

						<div className="text-center mt-2 font-medium">
							{capitalizeFirstLetter(pokemon.name)}
						</div>
					</div>
				</Link>
			</div>

			{chain.evolves_to.length > 0 && (
				<div
					className={`flex ${
						chain.evolves_to.length > 1
							? "flex-wrap justify-center gap-8"
							: "flex-col"
					} mt-2`}
				>
					{chain.evolves_to.map((nextChain: any, index: number) => (
						<EvolutionChain
							key={index}
							chain={nextChain}
							level={level + 1}
						/>
					))}
				</div>
			)}
		</div>
	);
}

function extractIdFromUrl(url: string): string {
	const parts = url.split("/");
	return parts[parts.length - 2];
}
