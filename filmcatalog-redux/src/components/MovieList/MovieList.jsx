import React from 'react';
import { useSelector } from 'react-redux';
import { 
  selectAllMovies,
  getMoviesStatus,
  getMoviesError,
} from '../../features/movies/moviesSlice';

const MovieList = () => {
  
  const movies = useSelector(selectAllMovies);
  const moviesStatus = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);
  
  let content;
  if(moviesStatus === 'loading') {
    content = <p>Loading...</p>
  } else if(moviesStatus === 'succeeded') {
    movies = [...content.Search]
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