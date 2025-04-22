import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { 
  selectWatchLaterMovies 
} from '../../features/movies/moviesSelectors';
//===== assets =====//
import './MoviesWatchLater.scss';
//===== components =====//
import MovieCard from '../../components/MovieCard/MovieCard';

const MoviesWatchLater = () => {
  const watchLaterMovies = useSelector(selectWatchLaterMovies);
  const content = watchLaterMovies.map(movie => (
    <MovieCard key={movie.imdbID} movie={movie} />
  ));

  return (
    <section className='MoviesWatchLater'>
      {content}
    </section>
  )
}

export default MoviesWatchLater;