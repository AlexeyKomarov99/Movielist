import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
//===== redux =====//
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../features/movies/moviesSlice';

const MovieSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const searchMoviesClick = (e) => {
        e.preventDefault();
        try {
            dispatch(fetchMovies(searchTerm));
        } catch (error) {
            
        }
    }

    return (
    <div>
        <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder='input name movie'
        />
        <button
            onClick={searchMoviesClick}
        >
            Поиск
        </button>
    </div>
  )
}

export default MovieSearch;