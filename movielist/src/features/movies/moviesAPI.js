import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const POSTS_URL = 'https://www.omdbapi.com';
const API_KEY = '5d3dd361';

// Пример запроса к API
// OMDb API: http://www.omdbapi.com/?i=tt3896198&apikey=5d3dd361

// Левая почта
// 60z4ectqmb@osxofulk.com

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

// Получение списка фильмов для главной страницы
export const fetchMainPageMovies = createAsyncThunk('movies/fetchMainPageMovies', async(searchTerm, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${POSTS_URL}/?s=${searchTerm}&type=movie&apikey=${API_KEY}`);
        if(response.data.Response === 'False') {
            return rejectWithValue(response.data.Error);
        }
        return response.data.Search;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// Получение списка сериалов для главной страницы
export const fetchMainPageSerials = createAsyncThunk('fetch/fetchMainPageSerials', async(searchTerm, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${POSTS_URL}/?s=${searchTerm}&type=series&apikey=${API_KEY}`);
        if(response.data.Response === 'False') {
            return rejectWithValue(response.data.Error);
        }
        return response.data.Search;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})