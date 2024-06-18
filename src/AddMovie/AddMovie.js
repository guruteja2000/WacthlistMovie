// src/AddMovie.js
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { addMovie, fetchMovies } from "../redux/movieSlice"
import { useNavigate } from "react-router-dom"
import "./AddMovie.css"

function AddMovie() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [year, setyear] = useState("")
  const [genre, setgenre] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newMovie = { title, description, image, genre, year }
    await dispatch(addMovie(newMovie))

    setTitle("")
    setDescription("")
    setImage("")
    navigate("/")
  }

  return (
    <div className="add-movie">
      <h2>Add a New Movie</h2>
      <form className="add-movie-form" onSubmit={handleSubmit}>
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
        <button type="submit">Add Movie</button>
      </form>
    </div>
  )
}

export default AddMovie
