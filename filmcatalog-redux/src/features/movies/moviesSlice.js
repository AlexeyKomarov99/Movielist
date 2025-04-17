import { 
    createSlice,
    createSelector,
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
    moviesFound: [],
    movieDescription: {},
    favoritesMovies: [], // Синхронизицация с localStorage на запуске приложения!
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

// Инициализация favoritesMovies из localStorage
const getStoredFavorites = () => {
    const stored = localStorage.getItem('featured-movie-list');
    return stored ? JSON.parse(stored) : [];
}
initialState.favoritesMovies = getStoredFavorites();

// Получение списка фильмов
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (requestObject, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${POSTS_URL}/?s=${requestObject.movieTitle}&apikey=${API_KEY}`);
        if (response.data.Response === "False") {
            return rejectWithValue(response.data.Error);
        }
        return response.data.Search;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

// Получение описания фильма
export const fetchMovieDescription = createAsyncThunk('movies/fetchMovieDescription', async (imdbID, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${POSTS_URL}/?i=${imdbID}&apikey=${API_KEY}`);
        if (response.data.Response === "False") {
            return rejectWithValue(response.data.Error);
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovieFavorites: {
            reducer(state, action) {
                const exist = state.favoritesMovies.some(movie => 
                    movie.imdbID === action.payload.imdbID
                )
                if(!exist) {
                    state.favoritesMovies.push(action.payload);
                    localStorage.setItem('featured-movie-list', JSON.stringify(state.favoritesMovies));
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
                localStorage.setItem('featured-movie-list', JSON.stringify(state.favoritesMovies));
            }
        },
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
    }
})

<<<<<<< HEAD
export const { addMovieFavorites, deleteMovieFavorites } = moviesSlice.actions;
=======
export const selectAllMovies = (state) => state.movies.movies;
export const getDescriptionMovie = (state) => state.movies.movieDescription;
export const getMoviesStatus = (state) => state.movies.status;
export const getMoviesError = (state) => state.movies.error;

export const getAllFavoriteMovies = createSelector(
    (state) => state.movies.favoritesMovies,
    (favoritesMovies) => {
        const storedFeatured = localStorage.getItem('featured-movie-list');
        const moviesFeatured = storedFeatured ? JSON.parse(storedFeatured) : [];
        return [...favoritesMovies, ...moviesFeatured]; // Объединение избранных фильмов из состояния Redux и localStorage
    }
)
export const getFavoritesCount = createSelector(
    getAllFavoriteMovies,
    (allFavorites) => allFavorites.length
  )
  
export const { addMovieFavorites } = moviesSlice.actions;
>>>>>>> f5c343b (Внесение правок (дом версия))
export default moviesSlice.reducer;