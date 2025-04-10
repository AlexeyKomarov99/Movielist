import { 
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from 'axios';

const POSTS_URL = 'https://www.omdbapi.com';
const API_KEY = '5d3dd361';

// Пример запроса к API
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=5d3dd361

// Левая почта
// 60z4ectqmb@osxofulk.com

const initialState = {
    movies: [],
    movieDescription: [],
    favoritesMovies: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// Получение списка фильмов по запрашиваемому названию фильма в поле ввода
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm) => {
    console.log(searchTerm)
    try {
        const response = await axios.get(`${POSTS_URL}/?s=${searchTerm}&apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
})

// Подробное описание фильма
export const fetchMovieDescription = createAsyncThunk('movies/fetchMovieDescription', async (imdbID) => {
    try {
        const response = await axios.get(`${POSTS_URL}/?i=${imdbID}&apikey=${API_KEY}`);
        return response.data;
    } catch (error) {
        return error.message;
    }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovieFavorites: {
            reducer(state, action) {
                state.favorites.push(action.payload);
            },
            prepare(movieId, title, content, yearReleased) {
                return {
                    payload: {
                        movieId,
                        title,
                        content,
                        yearReleased
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            //=== Функции для получения сведений о списке фильмов ===//
            .addCase(fetchMovies.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movies = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            //=== Функции для подробного описания фильма ===//
            .addCase(fetchMovieDescription.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchMovieDescription.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.movieDescription = action.payload;
            })
            .addCase(fetchMovieDescription.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllMovies = (state) => state.movies.movies;
export const getDescriptionMovie = (state) => state.movies.movieDescription;
export const selectAllFavoriteMovies = (state) => state.movies.favoritesMovies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;

export const { addMovieFavorites } = moviesSlice.actions;
export default moviesSlice.reducer;