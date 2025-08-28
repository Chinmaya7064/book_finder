import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async ({ title, page = 1 }, { rejectWithValue }) => {
  try {
    const limit = 8 // Books per page
    const offset = (page - 1) * limit

    const response = await axios.get(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&limit=${limit}&offset=${offset}`,
    )

    return {
      books: response.data.docs,
      totalBooks: response.data.numFound,
      currentPage: page,
      totalPages: Math.ceil(response.data.numFound / limit),
    }
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || "Failed to fetch books")
  }
})

const booksSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
    searchQuery: "",
    currentPage: 1,
    totalPages: 0,
    totalBooks: 0,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    clearBooks: (state) => {
      state.books = []
      state.totalBooks = 0
      state.totalPages = 0
      state.currentPage = 1
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false
        state.books = action.payload.books
        state.totalBooks = action.payload.totalBooks
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setSearchQuery, clearBooks, setCurrentPage } = booksSlice.actions
export default booksSlice.reducer
