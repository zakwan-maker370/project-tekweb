const LoadingSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="animate-pulse">
        <div className="w-full h-96 bg-gray-300 rounded-2xl"></div>
        <div className="mt-6 bg-white rounded-2xl p-6 shadow space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;