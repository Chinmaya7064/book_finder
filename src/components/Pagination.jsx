import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks, setCurrentPage } from "../redux/bookSlice"

const Pagination = () => {
  const dispatch = useDispatch()
  const { currentPage, totalPages, searchQuery, loading } = useSelector((state) => state.books)

  if (!searchQuery || totalPages <= 1) {
    return null
  }

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      dispatch(setCurrentPage(page))
      dispatch(fetchBooks({ title: searchQuery, page }))
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  const visiblePages = getVisiblePages()

  return (
    <div className="mt-12 flex justify-center animate-fade-in">
      <nav className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Previous
        </button>

        {/* Page Numbers */}
        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">...</span>
            ) : (
              <button
                onClick={() => handlePageChange(page)}
                disabled={loading}
                className={`px-3 py-2 text-sm font-medium border transition-colors duration-200 ${
                  currentPage === page
                    ? "text-blue-600 bg-blue-50 border-blue-500 z-10"
                    : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages || loading}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          Next
        </button>
      </nav>
    </div>
  )
}

export default Pagination
