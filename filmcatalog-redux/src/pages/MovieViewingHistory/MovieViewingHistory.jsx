import React from 'react';
//===== assets =====//
import './MovieViewingHistory.scss';
//===== redux =====//
import { useSelector } from 'react-redux';
import {
  selectViewHistoryMovies
} from '../../features/movies/moviesSelectors';
//===== components =====//
import MovieCard from '../../components/MovieCard/MovieCard';

const MovieViewingHistory = () => {
  const viewingHistoryMovie = useSelector(selectViewHistoryMovies);
  const content = viewingHistoryMovie.map(movie => (
    <MovieCard key={movie.imdbID} movie={movie} />
  ));

  return (
    <section className='MovieViewingHistory'>
      {content}
    </section>
  )
}

export default MovieViewingHistory;