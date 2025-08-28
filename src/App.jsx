import Header from "./components/Header"
import SearchBar from "./components/SearchBar"
import BookList from "./components/BookList"
import Pagination from "./components/Pagination"
import LoadingSpinner from "./components/LoadingSpinner"
import { useSelector } from "react-redux"

function App() {
  const { loading, error } = useSelector((state) => state.books)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchBar />

        {error && (
          <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fade-in">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <BookList />
            <Pagination />
          </>
        )}
      </main>
    </div>
  )
}

export default App
