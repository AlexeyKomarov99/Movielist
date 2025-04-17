import { createSelector } from "@reduxjs/toolkit";

export const selectFoundMovies = (state) => state.movies.moviesFound;
export const selectMovieDescription = (state) => state.movies.movieDescription;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

//===== Featured Movies =====//
export const selectFavoriteMovies = (state) => state.movies.favoritesMovies;
export const selectFavoriteMoviesCount = createSelector(
    selectFavoriteMovies,
    (allFavorites) => allFavorites.length
);
