import { useState } from "react"

const BookCard = ({ book, index }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const getBookCoverUrl = (book) => {
    // Try using cover_id field if available (most reliable method)
    if (book.cover_id) {
      console.log(" Using cover_id:", book.cover_id)
      return `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    }

    // Try using cover_i field if available
    if (book.cover_i) {
      console.log(" Using cover_i:", book.cover_i)
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    }

    console.log(" No valid cover identifier found")
    return null
  }

  const coverUrl = getBookCoverUrl(book)
  const authors = book.author_name ? book.author_name.join(", ") : "Unknown Author"

  console.log(" Book data:", {
    title: book.title,
    coverUrl,
    cover_i: book.cover_i,
    key: book.key,
  })

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-4">
        {/* Book Cover */}
        <div className="relative mb-4 h-48 bg-gray-100 rounded-lg overflow-hidden">
          {coverUrl && !imageError ? (
            <>
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse-slow text-gray-400">
                    
                  </div>
                </div>
              )}
              <img
                src={coverUrl || "/placeholder.svg"}
                alt={book.title}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
                onLoad={() => {
                  setImageLoading(false)
                  console.log(" Image loaded successfully:", coverUrl)
                }}
                onError={() => {
                  console.log(" Image failed to load:", coverUrl)
                  setImageError(true)
                  setImageLoading(false)
                }}
              />
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="text-center text-gray-500">
                
                <p className="text-xs">No Cover</p>
              </div>
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800 line-clamp-2 leading-tight">{book.title}</h3>

          <p className="text-sm text-gray-600 line-clamp-1">by {authors}</p>

          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{book.first_publish_year ? `Published: ${book.first_publish_year}` : "Year: N/A"}</span>
            <span>
              {book.edition_count} {book.edition_count === 1 ? "edition" : "editions"}
            </span>
          </div>

          {book.language && book.language.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {book.language.slice(0, 3).map((lang, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {lang.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookCard
