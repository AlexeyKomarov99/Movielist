import React from 'react';
import { Link } from 'react-router-dom';
//===== assets =====//
import './MovieCard.scss';
import { RiMovie2AiLine as GenreIcon } from "react-icons/ri";

const MovieCard = ({movie}) => {
  return (
    <Link 
      className='MovieCard__link'
      to={`/movies/${movie.imdbID}`} 
    >
      <article className='MovieCard__card'>
        <div className="MovieCard__img-wrapper">
          <img
            className='MovieCard__img'
            src={movie.Poster}
            alt="Poster" 
          />
        </div>
        <h3 className='MovieCard__title'>
          <span className="MovieCard__movie-name">{movie.Title} </span>
          <span className="MovieCard__movie-year">({movie.Year})</span>
        </h3>

        <div className="MovieCard__type">
          <span className="MovieCard__icon-wrapper">
            <GenreIcon className='MovieCard__icon' />
          </span>
          <span className="MovieCard__type-name">
            {movie.Type}
          </span>
        </div>

      </article>
    </Link>
  )
}

export default MovieCard;