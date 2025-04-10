import React from 'react'

const MovieInfo = ({movie}) => {
  
    console.log(movie);
  
    return (
    <section>
        <h2>{movie.Title}</h2>
        <img src={movie.Poster} alt="Poster" />
        <p>{movie.Year}</p>
        <span>Тип {movie.Type}</span>
    </section>
  )
}

export default MovieInfo
