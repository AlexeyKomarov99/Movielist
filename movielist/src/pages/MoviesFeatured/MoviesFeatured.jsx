import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectFavoriteMovies } from '../../features/movies/moviesSelectors';
//===== components =====//
import MovieCard from '../../components/MovieCard/MovieCard';
//===== assets =====//
import './MoviesFeatured.scss';

const MoviesFeatured = () => {
  
  const moviesFavorites = useSelector(selectFavoriteMovies);
  let content;
  content = moviesFavorites.map((movie) => (
    <MovieCard key={movie.imdbID} movie={movie} />
  ));

  return (
    <section className='MoviesFeatured'>
      {content}
    </section>
  )
}

export default MoviesFeatured;