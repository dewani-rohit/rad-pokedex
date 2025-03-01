import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";

const poppins = Poppins({
	variable: "--font-sans",
	subsets: ["latin"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	title: "Pokédex",
	description: "Explore pokémon with the help of PokeAPI",
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased dark`}>
				<QueryProvider>
					<Header />
					<main className="min-h-screen px-10 py-5">{children}</main>
					<Footer />
				</QueryProvider>
			</body>
		</html>
	);
}
