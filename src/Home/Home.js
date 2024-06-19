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

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteMovie(id)).then(() => {
      dispatch(fetchMovies())
    })
  }

  const handleEdit = (id) => {
    navigate(`/edit-movie/${id}`)
  }

  const handleRatingChange = (id, newRating) => {
    const movie = movies.find((movie) => movie.id === id)
    dispatch(updateMovie({ ...movie, rating: newRating })).then(() => {
      dispatch(fetchMovies())
    })
  }

  const handleWatchedToggle = (id) => {
    const movie = movies.find((movie) => movie.id === id)
    dispatch(updateMovie({ ...movie, watched: !movie.watched })).then(() => {
      dispatch(fetchMovies())
    })
  }

  const handleReviewChange = (e) => {
    setReviewText(e.target.value)
  }

  const handleReviewSubmit = (id) => {
    const movie = movies.find((movie) => movie.id === id)
    dispatch(updateMovie({ ...movie, review: reviewText })).then(() => {
      dispatch(fetchMovies())
    })
    setEditingReview(null)
    setReviewText("")
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
          {movies.length === 0 ? (
            <div className="loading-container">
              <div className="loader"></div>
              <p>Loading...</p>
            </div>
          ) : (
            movies.map((movie) => (
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
            ))
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
