import React, {useState} from 'react';
//===== assets =====//
import './MovieSearch.scss';
import { IoSearchOutline as SearchIcon } from "react-icons/io5";
//===== components =====//
import MovieSearchMW from '../MovieSearchMW/MovieSearchMW';

//===== redux =====//
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../features/movies/moviesSlice';

const MovieSearch = () => {
    const [openWindow, setOpenWindow] = useState(false);
    const openWindowClick = () => setOpenWindow(prevState => !prevState);

    return (
    <div className='MovieSearch'>
        <button
            className='MovieSearch__btn'
            onClick={openWindowClick}
        >
            <span className="MovieSearch__btn-icon-wrapper">
                <SearchIcon className='MovieSearch__btn-icon' />
            </span>
            <span className="MovieSearch__btn-name">
                Поиск
            </span>
        </button>
        <MovieSearchMW 
            openWindow={openWindow}
            openWindowClick={openWindowClick}
        />
    </div>
  )
}

export default MovieSearch;