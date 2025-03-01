import { Button } from "./ui/button";

interface ErrorDisplayProps {
	errorHeading?: string;
	message?: string;
	onRetry?: () => void;
	buttonText?: string;
}

const ErrorDisplay = ({
	errorHeading,
	message,
	onRetry,
	buttonText,
}: ErrorDisplayProps) => {
	return (
		<div className="rounded-lg bg-red-50 p-6 text-center">
			<h3 className="text-lg font-semibold text-red-800 mb-2">
				{errorHeading || "Something went wrong"}
			</h3>
			<p className="text-red-700 mb-4">
				{message || "Failed to load data. Please try again."}
			</p>
			{onRetry && (
				<Button
					variant="destructive"
					onClick={onRetry}
					className="cursor-pointer"
				>
					{buttonText || "Try Again"}
				</Button>
			)}
		</div>
	);
};

export default ErrorDisplay;
