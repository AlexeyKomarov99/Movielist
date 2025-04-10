import React, {useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux';
import {
  getMoviesStatus,
  getMoviesError
} from '../../features/movies/moviesSlice';
import { fetchMovieDescription } from '../../features/movies/moviesSlice';
//===== components =====//
import MovieInfo from '../../components/MovieInfo/MovieInfo';

const MovieDetails = () => {
  
  const {movieId} = useParams();
  const dispatch = useDispatch();
  const [movieDescr, setMovieDescr] = useState(null);
  const movieStatus = useSelector(getMoviesStatus);
  const error = useSelector(getMoviesError);

  let content;
  if (movieStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (movieStatus === 'succeeded' && movieDescr) {
    content = <MovieInfo movie={movieDescr} />;
  } else if (movieStatus === 'failed') {
    content = <p>{error}</p>;
  }

  useEffect(() => {
    if(movieId) {
      dispatch(fetchMovieDescription(movieId)).then((response) => {
        setMovieDescr(response.payload);
      })
    }
  }, [movieId, dispatch]);
  
  return (
    <div>
      {content}
    </div>
  )
}

export default MovieDetails;