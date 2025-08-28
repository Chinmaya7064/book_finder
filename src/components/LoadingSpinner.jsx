const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16 animate-fade-in">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Searching for books...</p>
        <p className="text-gray-500 text-sm mt-1">Please wait while we find the best results</p>
      </div>
    </div>
  )
}

export default LoadingSpinner
