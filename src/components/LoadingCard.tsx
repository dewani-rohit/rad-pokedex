const LoadingCard = () => {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<div className="h-40 bg-gray-200 animate-pulse" />
			<div className="p-4">
				<div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse" />
				<div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
			</div>
		</div>
	);
};

export default LoadingCard;
