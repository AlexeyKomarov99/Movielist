import { createSlice } from "@reduxjs/toolkit";
import {
    fetchMovies,
    fetchMovieDescription,
    fetchMainPageMovies,
    fetchMainPageSerials
} from './moviesAPI';

const initialState = {
    moviesFound: [],
    movieDescription: {},
    favoritesMovies: [], // Синхронизицация с localStorage на запуске приложения!
    watchLaterMovies: [],
    viewHistoryMovies: [],
    mainPageMovies: [],
    mainPageSerials: [],
    mainPageEpisodes: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        //=== favorites movies ===//
        addMovieFavorites: {
            reducer(state, action) {
                const existMovie = state.favoritesMovies.some(movie => 
                    movie.imdbID === action.payload.imdbID
                )
                if(!existMovie) {
                    state.favoritesMovies.push(action.payload);
                }
            },
            prepare(imdbID, Title, Year, Poster, Type) {
                return {
                    payload: {
                        imdbID,
                        Title, 
                        Year, 
                        Poster, 
                        Type
                    }
                }
            }
        },
        deleteMovieFavorites: {
            reducer(state, action) {
                state.favoritesMovies = state.favoritesMovies.filter(movie => 
                    movie.imdbID !== action.payload
                )
            }
        },
        //=== watch later movies ===//
        addMovieWatchLater: {
            reducer(state, action) {
                const existMovie = state.watchLaterMovies.some(movie =>
                    movie.imdbID === action.payload.imdbID
                );
                if(!existMovie) {
                    state.watchLaterMovies.push(action.payload);
                }
            },
            prepare(imdbID, Title, Year, Poster, Type) {
                return {
                    payload: {
                        imdbID, 
                        Title, 
                        Year, 
                        Poster, 
                        Type
                    }
                }
            }
        },
        deleteMovieWatchLater: {
            reducer(state, action) {
                state.watchLaterMovies = state.watchLaterMovies.filter(movie =>
                    movie.imdbID !== action.payload
                );
            }
        },
        //=== view history movies ===//
        addMovieViewHistory: {
            reducer(state, action) {
                const existMovie = state.viewHistoryMovies.some(movie => 
                    movie.imdbID === action.payload
                );
                if(!existMovie) {
                    state.viewHistoryMovies.push(action.payload);
                }
            },
            prepare(imdbID, Title, Year, Poster, Type) {
                return {
                    payload: {
                        imdbID, 
                        Title, 
                        Year, 
                        Poster, 
                        Type
                    }
                }
            }
        },
        deleteMovieViewHistory: {
            reducer(state, action) {
                state.viewHistoryMovies = state.viewHistoryMovies.filter(movie =>
                    movie.imdbID !== action.payload
                );
            }
        }
    },
    extraReducers(builder) {
        builder
            //=== Функции для получения сведений о списке найденных фильмов ===//
            .addCase(fetchMovies.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.moviesFound = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.moviesFound = [];
            })
            //=== Функции для подробного описания фильма ===//
            .addCase(fetchMovieDescription.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMovieDescription.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movieDescription = action.payload;
            })
            .addCase(fetchMovieDescription.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.movieDescription = {};
            })
            //=== Функции для получения списка фильмов на главную страницу ===//
            .addCase(fetchMainPageMovies.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMainPageMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mainPageMovies = action.payload;
            })
            .addCase(fetchMainPageMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.mainPageMovies = [];
            })
            //=== Функции для получения списка сериалов на главную страницу ===//
            .addCase(fetchMainPageSerials.pending, (state, action) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMainPageSerials.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.mainPageSerials = action.payload;
            })
            .addCase(fetchMainPageSerials.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
                state.mainPageSerials = [];
            })
    }
})

export const { 
    addMovieFavorites, 
    addMovieWatchLater,
    addMovieViewHistory,
    deleteMovieFavorites,
    deleteMovieWatchLater,
    deleteMovieViewHistory,
} = moviesSlice.actions;
export default moviesSlice.reducer;