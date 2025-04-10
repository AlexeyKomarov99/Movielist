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
    favorites: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (searchTerm) => {
    try {
        const response = await axios.get(`${POSTS_URL}/?s=${searchTerm}&apikey=${API_KEY}`);
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
                    movieId,
                    title,
                    content,
                    yearReleased
                }
            }
        }
    },
    extraReducers(builder) {
        builder
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
    }
})

export const selectAllMovies = (state) => state.movies.movies;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;

export const { addMovieFavorites } = moviesSlice.actions;
export default moviesSlice.reducer;