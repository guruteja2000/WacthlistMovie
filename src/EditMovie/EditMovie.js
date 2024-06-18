import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchMovies, updateMovie, selectAllMovies } from "../redux/movieSlice"
import "./EditMovie.css"

function EditMovie() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const movies = useSelector(selectAllMovies)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [rating, setRating] = useState("")
  const [reviews, setReviews] = useState({})
  const [watched, setWatched] = useState(false)
  const [year, setyear] = useState("")
  const [genre, setgenre] = useState("")

  // Fetch movies if not already fetched
  useEffect(() => {
    if (!movies.length) {
      dispatch(fetchMovies())
    }
  }, [dispatch, movies.length])

  // Update state with movie data when movies are fetched or when movie ID changes
  useEffect(() => {
    console.log(movies)
    const movie = movies.find((movie) => movie.id === id)
    console.log(movie)
    if (movie) {
      setTitle(movie.title || "")
      setDescription(movie.description || "")
      setImage(movie.image || "")
      setRating(movie.rating || "")
      setReviews(movie.review || "")
      setWatched(movie.watched || false)
      setgenre(movie.genre || "")
      setyear(movie.year || "")
    }
  }, [movies, id])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updatedMovie = {
      id,
      title,
      description,
      image,
      rating,
      review: reviews,
      watched,
      year,
      genre,
    }

    await dispatch(updateMovie(updatedMovie))
    navigate("/")
  }

  return (
    <div className="edit-movie">
      <h2>Edit Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Release Year:</label>
          <input
            type="text"
            id="year"
            value={year}
            onChange={(e) => setyear(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            id="genre"
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Movie</button>
      </form>
    </div>
  )
}

export default EditMovie
