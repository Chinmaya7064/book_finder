import { useSelector } from "react-redux"
import BookCard from "./BookCard"

const BookList = () => {
  const { books, searchQuery, totalBooks } = useSelector((state) => state.books)

  if (!searchQuery) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-6xl mb-4">📖</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Start Your Book Discovery</h2>
        <p className="text-gray-500">Search for any book title to begin exploring</p>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Books Found</h2>
        <p className="text-gray-500">Try searching with different keywords</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Search Results for "{searchQuery}"</h2>
        <p className="text-gray-600">Found {totalBooks.toLocaleString()} books</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book, index) => (
          <BookCard key={`${book.key}-${index}`} book={book} index={index} />
        ))}
      </div>
    </div>
  )
}

export default BookList
