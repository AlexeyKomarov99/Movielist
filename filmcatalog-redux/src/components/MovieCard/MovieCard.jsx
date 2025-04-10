import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({movie}) => {
  return (
    <Link to={`/movies/${movie.imdbID}`} >
      <article>
        <h2>{movie.Title}</h2>
        <img src={movie.Poster} alt="Poster" />
      </article>
    </Link>
  )
}

export default MovieCard;