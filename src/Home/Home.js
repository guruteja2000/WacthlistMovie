import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchMovies,
  selectAllMovies,
  deleteMovie,
  updateMovie,
} from "../redux/movieSlice"
import { useNavigate } from "react-router-dom"
import StarRating from "../starrating/StarRating"
import "./Home.css"

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const movies = useSelector(selectAllMovies)

  const [editingReview, setEditingReview] = useState(null)
  const [reviewText, setReviewText] = useState("")
  const [localMovies, setLocalMovies] = useState([])

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  useEffect(() => {
    setLocalMovies(movies)
  }, [movies])

  const handleDelete = async (id) => {
    setLocalMovies(localMovies.filter((movie) => movie.id !== id))

    await dispatch(deleteMovie(id))
  }

  const handleEdit = (id) => {
    navigate(`/edit-movie/${id}`)
  }

  const handleRatingChange = async (id, newRating) => {
    const updatedMovies = localMovies.map((movie) =>
      movie.id === id ? { ...movie, rating: newRating } : movie
    )
    setLocalMovies(updatedMovies)

    await dispatch(updateMovie({ id, rating: newRating }))
  }

  const handleWatchedToggle = async (id) => {
    const updatedMovies = localMovies.map((movie) =>
      movie.id === id ? { ...movie, watched: !movie.watched } : movie
    )
    setLocalMovies(updatedMovies)

    await dispatch(
      updateMovie({
        id,
        watched: !localMovies.find((movie) => movie.id === id).watched,
      })
    )
  }

  const handleReviewChange = (e) => {
    setReviewText(e.target.value)
  }

  const handleReviewSubmit = async (id) => {
    const updatedMovies = localMovies.map((movie) =>
      movie.id === id ? { ...movie, review: reviewText } : movie
    )
    setLocalMovies(updatedMovies)

    await dispatch(updateMovie({ id, review: reviewText }))
    setEditingReview(null)
    setReviewText("")
    dispatch(fetchMovies())
  }

  const handleEditReview = (id, existingReview) => {
    setEditingReview(id)
    setReviewText(existingReview)
  }

  const handleAddMovie = () => {
    navigate("/add-movie")
  }

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <div className="logo">
            <span className="logo-text">Movie App</span>
          </div>
        </div>
        <button className="btn-add-movie" onClick={handleAddMovie}>
          Add Movie
        </button>
      </header>
      <section className="content">
        <h2 className="section-title">Watchlisted Movies</h2>
        <div className="movie-list">
          {localMovies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="image-container">
                <img src={movie.image} alt={movie.title} />
              </div>
              <div className="movie-details">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <div className="rating-container">
                  <p className="rating-label">
                    <strong>Rating:</strong>
                  </p>
                  <StarRating
                    rating={movie.rating}
                    onRatingChange={(newRating) =>
                      handleRatingChange(movie.id, newRating)
                    }
                  />
                </div>
                <h4>Review:</h4>
                {editingReview === movie.id ? (
                  <div className="review-edit">
                    <textarea
                      className="review-textarea"
                      value={reviewText}
                      onChange={handleReviewChange}
                    ></textarea>
                    <button
                      className="btn-submit"
                      onClick={() => handleReviewSubmit(movie.id)}
                    >
                      Submit Review
                    </button>
                  </div>
                ) : (
                  <div className="review-view">
                    <p className="review-content">{movie.review}</p>
                    <button
                      className="btn-edit"
                      onClick={() => handleEditReview(movie.id, movie.review)}
                    >
                      Edit Review
                    </button>
                  </div>
                )}
                <div className="watched-toggle">
                  <label>
                    <strong>Watched:</strong>
                    <input
                      type="checkbox"
                      checked={movie.watched}
                      onChange={() => handleWatchedToggle(movie.id)}
                    />
                  </label>
                </div>
                <div className="additional-details">
                  <p>
                    <strong>Year:</strong> {movie.year}
                  </p>
                  <p>
                    <strong>Genre:</strong> {movie.genre}
                  </p>
                </div>
                <button
                  className="btn-edit-movie"
                  onClick={() => handleEdit(movie.id)}
                >
                  Edit Movie
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(movie.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
