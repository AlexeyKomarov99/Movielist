import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { 
  selectAllMovies,
  getMoviesStatus,
  getMoviesError,
} from '../../features/movies/moviesSlice';
//===== assets =====//
import './MovieList.scss';
//===== components =====//
import MovieCard from '../MovieCard/MovieCard';

const MovieList = () => {
  
  const movies = useSelector(selectAllMovies);
  const moviesStatus = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);

  let content;
  if(moviesStatus === 'loading') {
    content = <p>Loading...</p>
  } else if(moviesStatus === 'succeeded') {
    console.log(movies);
    content = movies.map(movie => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))
  } else if(moviesStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section className='MovieList'>
      {content}
    </section>
  )
}

export default MovieList;