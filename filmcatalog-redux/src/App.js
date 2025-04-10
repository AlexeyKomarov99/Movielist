import React from 'react';
import {Routes, Route} from 'react-router-dom';
//===== pages =====//
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import MovieFeatured from './pages/MoviesFeatured/MoviesFeatured';

//===== components =====//
import Layout from './components/Layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index element={<HomePage />} />
        <Route path='/movies'>
          <Route path=':movieId' element={<MovieDetails />} />
          <Route path='featured-list' element={<MovieFeatured />} />
        </Route>
        <Route path='*' element={<PageNotFound /> } />
      </Route>
    </Routes>
  )
}

export default App;