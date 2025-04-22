import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../features/movies/moviesSlice';
import localStorageMiddleware from '../middleware/localStorageMiddleware';

// Загрузка начального состояния
const preloadedState = {
    movies: {
        favoritesMovies: JSON.parse(localStorage.getItem('featured-movie-list')) || [],
        watchLaterMovies: JSON.parse(localStorage.getItem('watch-later-movie-list')) || [],
        viewHistoryMovies: JSON.parse(localStorage.getItem('view-history-movie-list')) || [],
    }
};

export const store = configureStore({
    reducer: {
        movies: moviesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
    preloadedState
});