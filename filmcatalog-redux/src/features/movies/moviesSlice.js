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
    moviesFound: [],
    movieDescription: {},
    favoritesMovies: [], // Синхронизицация с localStorage на запуске приложения!
    watchLaterMovies: [],
    viewHistoryMovies: [],

    

    
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}



// Инициализация данных о фильмах из localStorage
const getStoredFavoritesMovies = () => {
    const stored = localStorage.getItem('featured-movie-list');
    return stored ? JSON.parse(stored) : [];
}
initialState.favoritesMovies = getStoredFavoritesMovies();

const getStoredWatchLaterMovies = () => {
    const stored = localStorage.getItem('watch-later-movie-list');
    return stored ? JSON.parse(stored) : [];
}
initialState.watchLaterMovies = getStoredWatchLaterMovies();

const getStoredViewHistoryMovies = () => {
    const stored = localStorage.getItem('view-history-movie-list');
    return stored ? JSON.parse(stored) : [];
}
initialState.viewHistoryMovies = getStoredViewHistoryMovies();


// Получение списка фильмов
export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (requestObject, { rejectWithValue }) => {
    try {
        const params = [];
        if (requestObject.movieTitle)
            params.push(`s=${encodeURIComponent(requestObject.movieTitle)}`);
        if (requestObject.genre)
            params.push(`type=${encodeURIComponent(requestObject.genre.value)}`);
        if (requestObject.startYear)
            params.push(`y=${encodeURIComponent(requestObject.startYear)}`);

        const url = `${POSTS_URL}/?${params.join('&')}&apikey=${API_KEY}`;

        const response = await axios.get(url);
        
        if (response.data.Response === "False") {
            return rejectWithValue(response.data.Error);
        }
        return response.data.Search;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

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
        //=== favorites movies ===//
        addMovieFavorites: {
            reducer(state, action) {
                const existMovie = state.favoritesMovies.some(movie => 
                    movie.imdbID === action.payload.imdbID
                )
                if(!existMovie) {
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
        //=== watch later movies ===//
        addMovieWatchLater: {
            reducer(state, action) {
                const existMovie = state.watchLaterMovies.some(movie =>
                    movie.imdbID === action.payload.imdbID
                );
                if(!existMovie) {
                    state.watchLaterMovies.push(action.payload);
                    localStorage.setItem('watch-later-movie-list', JSON.stringify(state.watchLaterMovies));
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
                localStorage.setItem('watch-later-movie-list', JSON.stringify(state.watchLaterMovies));
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
                    localStorage.setItem('view-history-movie-list', JSON.stringify(state.viewHistoryMovies));
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
                localStorage.setItem('view-history-movie-list', JSON.stringify(state.viewHistoryMovies));
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