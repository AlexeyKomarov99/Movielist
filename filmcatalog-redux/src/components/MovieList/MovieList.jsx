import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectAllMovies,
  getMoviesStatus,
  getMoviesError,
} from '../../features/movies/moviesSlice';
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
    console.log(movies.Search);
    content = movies.Search.map(movie => (
      <MovieCard key={movie.imdbID} movie={movie} />
    ))
  } else if(moviesStatus === 'failed') {
    content = <p>{error}</p>
  }

  return (
    <section>
      {content}
    </section>
  )
}

export default MovieList;