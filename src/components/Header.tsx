import Image from "next/image";
import Link from "next/link";

const Header = () => {
	return (
		<div className="h-20 px-5 py-3 bg-pokemon-red flex items-center">
			<Link
				href="/"
				className="text-xl font-semibold md:text-3xl md:font-bold flex items-center gap-1 md:gap-2"
			>
				<Image
					src="/pokedex.png"
					alt="logo"
					width={30}
					height={30}
				/>
				Pokédex
			</Link>
		</div>
	);
};

export default Header;
