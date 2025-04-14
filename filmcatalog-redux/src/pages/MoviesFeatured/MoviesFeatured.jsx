import React from 'react';
//===== redux =====//
import { useSelector } from 'react-redux';
import { selectAllFavoriteMovies } from '../../features/movies/moviesSlice';
//===== components =====//


const MoviesFeatured = () => {
  
  // const content = selectAllFavoriteMovies();
  selectAllFavoriteMovies()

  return (
    <section className='MoviesFeatured'>
      {/* {content} */}
      Избранные фильмы
    </section>
  )
}

export default MoviesFeatured;