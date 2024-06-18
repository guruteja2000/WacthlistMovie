import React from "react"
import "./StarRating.css"

const StarRating = ({ rating, onRatingChange }) => {
  const handleRating = (newRating) => {
    onRatingChange(newRating)
  }

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? "filled" : ""}`}
          onClick={() => handleRating(star)}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
