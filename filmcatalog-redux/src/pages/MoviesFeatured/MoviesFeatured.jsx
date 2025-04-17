import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
<<<<<<< HEAD
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
  ))

  return (
    <section className='MoviesFeatured'>
      {content}
=======
import { getAllFavoriteMovies } from '../../features/movies/moviesSlice';
//===== assets =====//
import './MoviesFeatured.scss';
//===== components =====//
import MovieCard from '../../components/MovieCard/MovieCard';

const MoviesFeatured = () => {
  
  const favoritesMovies = useSelector(getAllFavoriteMovies);
  
  return (
    <section className='MoviesFeatured'>
      {favoritesMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
>>>>>>> f5c343b (Внесение правок (дом версия))
    </section>
  )
}

export default MoviesFeatured;