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

//===== Watch Later Movies =====//
export const selectWatchLaterMovies = (state) => state.movies.watchLaterMovies;
export const selectWatchLaterMoviesCount = createSelector(
    selectWatchLaterMovies,
    (allWatchLater) => allWatchLater.length
);

//===== View History Movies =====//
export const selectViewHistoryMovies = (state) => state.movies.viewHistoryMovies;
export const selectViewHistoryMoviesCount = createSelector(
    selectViewHistoryMovies,
    (allViewHistory) => allViewHistory.length
);