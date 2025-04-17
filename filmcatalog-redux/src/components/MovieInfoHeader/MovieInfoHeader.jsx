import React from 'react';
//===== redux =====//
import { useDispatch, useSelector } from 'react-redux';
import {
    addMovieFavorites,
    deleteMovieFavorites
} from '../../features/movies/moviesSlice';
import { selectFavoriteMovies } from '../../features/movies/moviesSelectors';
//===== assets =====//
import './MovieInfoHeader.scss';
// import { CiStar as StarIcon } from "react-icons/ci";
import { FaStar as StarIcon } from "react-icons/fa";
import { IoMdHeartEmpty as HeartEmptyIcon } from "react-icons/io";
import { IoHeart as HeartIcon } from "react-icons/io5";

const MovieInfoHeader = ({movie}) => {
    const dispatch = useDispatch();

    const favoritesMovies = useSelector(selectFavoriteMovies);

    const isFavorite = favoritesMovies.some(film =>
        film.imdbID === movie.imdbID
    )

    const handleFavoriteClick = () => {
        if(!isFavorite) {
            dispatch(addMovieFavorites(movie.imdbID, movie.Title, movie.Year, movie.Poster, movie.Type));
        } else {
            dispatch(deleteMovieFavorites(movie.imdbID))
            console.log('Фильм удален из избранного!')
        }
    }

    return (
    <div className='MovieInfoHeader__position'>
        <div className="MovieInfoHeader__container">
            <div className="MovieInfoHeader__content-star">
                <span 
                    className="MovieInfoHeader__star-wrapper"
                >
                    <StarIcon className='MovieInfoHeader__star-icon' />
                </span>
                <span className='MovieInfoHeader__star-rating'>
                    {movie.imdbRating}
                </span>
            </div>

            <div 
                className="MovieInfoHeader__heart-wrapper"
                onClick={() => handleFavoriteClick()}
            >
                {isFavorite ?  
                    <HeartIcon className={`MovieInfoHeader__heart-icon ${isFavorite ? 'active-heart' : ''}`} /> : 
                    <HeartEmptyIcon className='MovieInfoHeader__heart-icon' 
                />}
            </div>
        </div>
    </div>
  )
}

export default MovieInfoHeader