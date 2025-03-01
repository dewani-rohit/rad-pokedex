"use client";

import ErrorDisplay from "@/components/ErrorDisplay";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
	const router = useRouter();

	return (
		<ErrorDisplay
			errorHeading={"Error 404"}
			message="The page you are looking for does not exist"
			onRetry={() => router.push("/")}
			buttonText="Go back home"
		/>
	);
}
