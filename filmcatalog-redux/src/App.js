import React from 'react';
import {Routes, Route} from 'react-router-dom';
//===== pages =====//
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import MovieFeatured from './pages/MoviesFeatured/MoviesFeatured';
import MoviesWatchLater from './pages/MoviesWatchLater/MoviesWatchLater';
import MovieViewingHistory from './pages/MovieViewingHistory/MovieViewingHistory';
//===== components =====//
import Layout from './components/Layout/Layout';
//===== assets =====//
import './App.css';

const App = () => {
  return (
    <div className='App' >
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path='/movies'>
            <Route path=':movieId' element={<MovieDetails />} />
            <Route path='featured-list' element={<MovieFeatured />} />
            <Route path='watch-later' element={<MoviesWatchLater />} />
            <Route path='movie-viewing-history' element={<MovieViewingHistory /> } />
          </Route>
          <Route path='*' element={<PageNotFound /> } />
        </Route>
      </Routes>
    </div>
  )
}

export default App;