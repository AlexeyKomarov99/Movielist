import React from 'react';
//===== components =====//
import MovieSearch from '../../components/MovieSearch/MovieSearch';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  return (
    <main>
      <MovieSearch />
      <MovieList />
    </main>
  )
}

export default HomePage