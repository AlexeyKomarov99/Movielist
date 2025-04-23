import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//===== assets =====//
import './index.css';
//===== components =====//
import App from './App';
//===== redux =====//
import { Provider } from 'react-redux';
import { store } from './app/store';
import {
  fetchMainPageMovies,
  fetchMainPageSerials,
} from './features/movies/moviesAPI';

// store.dispatch(fetchMainPageMovies('movies'));
// store.dispatch(fetchMainPageSerials('serial'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store} >
      <Router>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>  
      </Router>
    </Provider>
  // </React.StrictMode>
);