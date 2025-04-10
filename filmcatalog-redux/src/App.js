import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
//===== components =====//
// import HomePage from './pages/HomePage/HomePage';
import MovieList from './components/MovieList/MovieList';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import MovieFeatured from './pages/MoviesFeatured/MoviesFeatured';
import MovieSearch from './pages/MovieSearch/MovieSearch';
import Layout from './components/Layout/Layout/Layout';

// Вопрос по импортам !!!

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        
        <Route index element={<MovieList />} />

        <Route path='movies'>
          <Route index element={<MovieSearch />}  />
          <Route path=':movieId' element={<MovieDetails />} />
          <Route path='featured' element={<MovieFeatured />} />
        </Route>

        <Route path='*' element={<Navigate to='/' replace />} />

      </Route>
    </Routes>
  )
}

export default App