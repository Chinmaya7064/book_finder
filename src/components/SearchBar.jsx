import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks, setSearchQuery, clearBooks } from "../redux/bookSlice"

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("")
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.books)

  const handleSearch = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      dispatch(setSearchQuery(inputValue.trim()))
      dispatch(fetchBooks({ title: inputValue.trim(), page: 1 }))
    }
  }

  const handleClear = () => {
    setInputValue("")
    dispatch(setSearchQuery(""))
    dispatch(clearBooks())
  }

  return (
    <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter book title to search..."
              className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              disabled={loading}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Searching...
              </div>
            ) : (
              "Search"
            )}
          </button>

          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="px-4 py-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default SearchBar
