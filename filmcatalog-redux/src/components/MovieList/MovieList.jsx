import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { 
  selectFoundMovies,
  selectMoviesStatus,
  selectMoviesError,
} from '../../features/movies/moviesSelectors';
//===== assets =====//
import './MovieList.scss';
//===== components =====//
import MovieCard from '../MovieCard/MovieCard';

const MovieList = () => {
  
  const movies = useSelector(selectFoundMovies);
  const moviesStatus = useSelector(selectMoviesStatus);
  const error = useSelector(selectMoviesError);

  let content;
  if(moviesStatus === 'loading') {
    content = <p>Loading...</p>
  } else if(moviesStatus === 'succeeded') {
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