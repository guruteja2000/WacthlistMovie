import { configureStore } from "@reduxjs/toolkit"
import moviesReducer from "./movieSlice"

export default configureStore({
  reducer: {
    movies: moviesReducer,
  },
})
