import Grid from "@/components/Grid";
import { getPokemonList } from "@/lib/api";

export const revalidate = 86400;

export default async function Home() {
	const initialData = await getPokemonList(20, 0);

	return <Grid initialData={initialData} />;
}
