import Link from "next/link";

const Footer = () => {
	return (
		<div className="h-20 px-5 py-3 bg-pokemon-red flex items-center gap-1 text-md md:text-xl">
			Made using{" "}
			<Link
				href="https://pokeapi.co/"
				target="_blank"
				className="hover:underline"
			>
				PokeAPI
			</Link>
		</div>
	);
};

export default Footer;
