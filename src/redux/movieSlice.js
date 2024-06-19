// src/features/movie/movieSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Async thunk to fetch movies
export const fetchMovies = createAsyncThunk("movie/fetchMovies", async () => {
  const response = await fetch("https://wacthlist-movie-api.vercel.app/movies")
  const data = await response.json()
  return data
})

// Async thunk to add a movie
export const addMovie = createAsyncThunk("movie/addMovie", async (movie) => {
  const response = await fetch(
    "https://wacthlist-movie-api.vercel.app/movies",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    }
  )
  const data = await response.json()
  return data
})

// Async thunk to update a movie
export const updateMovie = createAsyncThunk(
  "movie/updateMovie",
  async (movie) => {
    const response = await fetch(
      `https://wacthlist-movie-api.vercel.app/movies/${movie.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      }
    )
    const data = await response.json()
    return data
  }
)

// Async thunk to delete a movie
export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id) => {
  await fetch(`https://wacthlist-movie-api.vercel.app/movies/${id}`, {
    method: "DELETE",
  })
  return id
})

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    movies: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.movies.push(action.payload)
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        const index = state.movies.findIndex(
          (movie) => movie.id === action.payload.id
        )
        state.movies[index] = action.payload
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.movies = state.movies.filter(
          (movie) => movie.id !== action.payload
        )
      })
  },
})

export const selectAllMovies = (state) => state.movies.movies

export default movieSlice.reducer
