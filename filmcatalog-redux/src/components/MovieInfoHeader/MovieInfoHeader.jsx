import React from 'react';
//===== redux =====//
import { useDispatch, useSelector } from 'react-redux';
import {
    addMovieFavorites,
    deleteMovieFavorites,
    addMovieWatchLater,
    deleteMovieWatchLater,
} from '../../features/movies/moviesSlice';
import { 
    selectFavoriteMovies,
    selectWatchLaterMovies
} from '../../features/movies/moviesSelectors';
//===== assets =====//
import './MovieInfoHeader.scss';
import { IoMdHeartEmpty as HeartEmptyIcon } from "react-icons/io";
import { IoHeart as HeartIcon } from "react-icons/io5";
import { FaBookmark as BookmarkIcon } from "react-icons/fa6";
import { FaRegBookmark as BookmarkEmptyIcon } from "react-icons/fa6";
//===== components =====//
import IconInfoMW from '../IconInfoMW/IconInfoMW';
//===== utils =====//
import RatingWithStars from '../RatingWithStars/RatingWithStars';

const MovieInfoHeader = ({movie}) => {
    const dispatch = useDispatch();

    // favorites movies
    const favoritesMovies = useSelector(selectFavoriteMovies);
    const isFavorite = favoritesMovies.some(film =>
        film.imdbID === movie.imdbID
    )

    // watch later movies
    const watchLaterMovies = useSelector(selectWatchLaterMovies);
    const isWatchLater = watchLaterMovies.some(film => 
        film.imdbID === movie.imdbID
    )

    const handleFavoriteClick = () => {
        if(!isFavorite) {
            dispatch(addMovieFavorites(movie.imdbID, movie.Title, movie.Year, movie.Poster, movie.Type));
        } else {
            dispatch(deleteMovieFavorites(movie.imdbID));
        }
    }

    const handleWatchLaterMovies = () => {
        if(!isWatchLater) {
            dispatch(addMovieWatchLater(movie.imdbID, movie.Title, movie.Year, movie.Poster, movie.Type));
        } else {
            dispatch(deleteMovieWatchLater(movie.imdbID));
        }
    }

    return (
    <div className='MovieInfoHeader__position'>
        <div className="MovieInfoHeader__container">
            
            <div className="MovieInfoHeader__content-left">
                <div className="MovieInfoHeader__content-star">
                    <RatingWithStars 
                        movie={movie}
                    />
                </div>
            </div>

            <div className="MovieInfoHeader__content-right">
                
                <div 
                    className="MovieInfoHeader__bookmark-wrapper"
                    onClick={handleWatchLaterMovies}
                >
                    <IconInfoMW
                        icon={
                            isWatchLater 
                            ? <BookmarkIcon className={`MovieInfoHeader__bookmark-icon ${isWatchLater ? 'active-bookmark' : ''}`} />
                            : <BookmarkEmptyIcon className="MovieInfoHeader__bookmark-icon" />
                        }
                        modalContent={isWatchLater ? "Удалить из посмотреть позже" : "Добавить в посмотреть позже"}
                    />
                </div>

                <div 
                    className="MovieInfoHeader__heart-wrapper"
                    onClick={() => handleFavoriteClick()}
                >
                    <IconInfoMW 
                        icon={
                            isFavorite
                            ? <HeartIcon className={`MovieInfoHeader__heart-icon ${isFavorite ? 'active-heart' : ''}`} />
                            : <HeartEmptyIcon className="MovieInfoHeader__heart-icon" />
                        }
                        modalContent={isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
                    />
                </div>

            </div>

        </div>
    </div>
  )
}

export default MovieInfoHeader