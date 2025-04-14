import React, {useState} from 'react';
//===== assets =====//
import './MovieInfo.scss';
//===== components =====//
import MovieInfoNavigation from '../MovieInfoNavigation/MovieInfoNavigation';
import MovieInfoHeader from '../MovieInfoHeader/MovieInfoHeader';

const MovieInfo = ({movie}) => {
    const [activeSection, setActiveSection] = useState('about');
    const switchActiveSection = (selectedSection) => {
        if(['about', 'actors', 'facts'].includes(selectedSection)) {
          setActiveSection(selectedSection)
        } else {
          setActiveSection('about');
        }
    }
    
    console.log(movie);

    const movieDetails = [
      { label: 'Название', value: movie.Title },
      { label: 'Год выхода', value: movie.Year },
      { label: 'Страна', value: movie.Country },
      { label: 'Режиссер', value: movie.Director },
      { label: 'Жанр', value: movie.Genre },
      { label: 'Дата выхода', value: movie.Released },
      { label: 'Продолжительность', value: movie.Runtime },
      { label: 'Язык', value: movie.Language },

      // { label: 'DVD', value: movie.DVD },
      // { label: 'Метаскор', value: movie.Metascore },
      // { label: 'Рейтинг', value: movie.Rated },
      // { label: 'Тип', value: movie.Type },
      // { label: 'Сайт', value: movie.Website },
      // { label: 'Автор', value: movie.Writer },
      // { label: 'imdbID', value: movie.imdbID },
      // { label: 'Рейтинг IMDb', value: movie.imdbRating },
      // { label: 'Голоса IMDb', value: movie.imdbVotes },
  ];
  
    return (
    <section className='MovieInfo' >
      <div className="MovieInfo__header-content">
        <div className="MovieInfo__header-content-left">
          <div className="MovieInfo__img-wrapper">
            <img 
              src={movie.Poster} 
              alt="Poster" 
              className="MovieInfo__img" 
            />
            <MovieInfoHeader
              movie={movie} 
            />
          </div>
        </div>

        <div className="MovieInfo__header-content-right">
          <h1 className='MovieInfo__main-title'>{movie.Title}</h1>
          {movieDetails.map((detail, index) => (
            <div key={index} className="MovieInfo__content-right-item">
              <span className="MovieInfo__title"><i><strong>{detail.label}:</strong></i></span>
              <span className="MovieInfo__movie-value"> {detail.value}</span>
            </div>  
          ))}
        </div>

      </div>

      <div className="MovieInfo__main-content">
        {/* Внутренняя панель навигации с контентом */}
        <MovieInfoNavigation 
          movie={movie}
          activeSection={activeSection}
          switchActiveSection={switchActiveSection}
        />
      </div>

    </section>
  )
}

export default MovieInfo
