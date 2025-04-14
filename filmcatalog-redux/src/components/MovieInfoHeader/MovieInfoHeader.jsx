import React, {useState} from 'react';
//===== redux =====//
import { useDispatch } from 'react-redux';
import { addMovieFavorites } from '../../features/movies/moviesSlice';

//===== assets =====//
import './MovieInfoHeader.scss';
// import { CiStar as StarIcon } from "react-icons/ci";
import { FaStar as StarIcon } from "react-icons/fa";
import { IoMdHeartEmpty as HeartEmptyIcon } from "react-icons/io";
import { IoHeart as HeartIcon } from "react-icons/io5";

const MovieInfoHeader = ({movie}) => {
    
    // Здесь создаётся состояние addFavorites, которое отслеживает, добавлен ли фильм в избранное
    const [addFavorites, setAddFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('featured-movie-list');
        return savedFavorites ? JSON.parse(savedFavorites).some(f => f.imdbID === movie.imdbID) : false;
    });
    const dispatch = useDispatch();

    const addMovieFavoritesClick = () => {

        const newFavoriteMovie = {
            imdbID: movie.imdbID,
            Title: movie.Title, 
            Year: movie.Year,
            Poster: movie.Poster,
            Type: movie.Type
        };

        // Получаем текущий список избранных фильмов из localStorage
        const storedFavorites = localStorage.getItem('featured-movie-list');
        const favoritesList = storedFavorites ? JSON.parse(storedFavorites) : [];

        setAddFavorites(prevState => {
            const isCurrentlyFavorite = prevState;

            // Проверка, добавлен ли фильм в избранное
            if (!isCurrentlyFavorite) {
                // Проверяем на наличие дубликатов
                const isDuplicate = favoritesList.some(f => f.imdbID === newFavoriteMovie.imdbID);
                if(!isDuplicate) {
                    favoritesList.push(newFavoriteMovie); // Добавляем фильм, если он не в избранном
                }
            } else {
                // Удаляем фильм, если он был в избранном
                const updatedFavorites = favoritesList.filter(f => f.imdbID !== movie.imdbID);
                localStorage.setItem('featured-movie-list', JSON.stringify(updatedFavorites));
                return false; // Устанавливаем состояние обратно в false
            }

            // Сохраняем обновленный список в localStorage
            localStorage.setItem('featured-movie-list', JSON.stringify(favoritesList));
            return true; // Устанавливаем состояние в true
        });

        dispatch(addMovieFavorites(newFavoriteMovie));

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
                onClick={() => addMovieFavoritesClick()}
            >
                {addFavorites ?  
                    <HeartIcon className={`MovieInfoHeader__heart-icon ${addFavorites ? 'active-heart' : ''}`} /> : 
                    <HeartEmptyIcon className='MovieInfoHeader__heart-icon' 
                />}
            </div>
        </div>
    </div>
  )
}

export default MovieInfoHeader