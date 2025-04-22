const localStorageMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    const state = store.getState().movies;
    
    const actionsToWatch = [
        'movies/addMovieFavorites',
        'movies/deleteMovieFavorites',
        'movies/addMovieWatchLater',
    ];

    if (actionsToWatch.includes(action.type)) {
        localStorage.setItem('featured-movie-list', JSON.stringify(state.favoritesMovies));
        localStorage.setItem('watch-later-movie-list', JSON.stringify(state.watchLaterMovies));
        localStorage.setItem('view-history-movie-list', JSON.stringify(state.viewHistoryMovies));
    }

    return result;
};

export default localStorageMiddleware;