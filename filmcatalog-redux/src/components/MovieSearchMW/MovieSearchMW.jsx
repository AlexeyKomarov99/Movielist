import React, {useState, useEffect, useRef} from 'react';
//===== redux =====//
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../../features/movies/moviesSlice';
//===== assets =====//
import './MovieSearchMW.scss';
import Modal from 'react-modal';
import Select from 'react-select';

Modal.setAppElement('#root');

const genreOptions = [
    { value: 'action', label: 'Экшен' },
    { value: 'comedy', label: 'Комедия' },
    { value: 'drama', label: 'Драма' },
    { value: 'horror', label: 'Ужасы' },
    { value: 'romance', label: 'Романтика' },
  ];

const MovieSearchMW = ({openWindow, openWindowClick}) => {
    const [searchExpression, setSearchExpression] = useState({
        movieTitle: '',
        genre: '',
        startYear: '',
        endYear: '',
    });
    const dispatch = useDispatch();
    const [isAnimating, setIsAnimating] = useState(false);
    const [error, setError] = useState(null);
    const currentYear = new Date().getFullYear();

    const handleSearchExpressionChange = (e) => {
        const {name, value} = e.target;
        setSearchExpression((prevState) => ({
            ...prevState,
            [name]: value
        }))
        setError((prevState) => ({
            ...prevState,
            [name]: ''
        }))
    }
    const handleGenreChange = (selectedOption) => {
        setSearchExpression((prevState) => ({
            ...prevState,
            genre: selectedOption
        }))
    }

    const searchMovie = (e) => {
        e.preventDefault();
        if(!validate()) {
            alert('Заполните обязательные поля!');
            return;
        } else {
            // Запрос на получение списка фильмов
            dispatch(fetchMovies(searchExpression));

            setSearchExpression({
                movieTitle: '',
                genre: '',
                startYear: '',
                endYear: '',
            });
            openWindowClick();
        }
    }

    const validate = () => {
        const newError = {};
        if(!searchExpression.movieTitle.trim()) {
            newError.movieTitle = 'Введите название фильма'
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }
    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => {
          openWindowClick();
        }, 400); // Время задержки должно совпадать с длительностью анимации
    }
    useEffect(() => {
        if(openWindow) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 400);
            return () => clearTimeout(timer);
        }
    }, [openWindow])

    return (
        <Modal
            className={`MovieSearchMW ${isAnimating && openWindow ? 'MovieSearchMW__display' : 'MovieSearchMW__hide'}`}
            overlayClassName='MovieSearchMW__overlay'
            isOpen={openWindow}
            onRequestClose={openWindowClick}
        >
            <form 
                onSubmit={searchMovie}
                className='MovieSearchMW__form'
            >
                <div className="MovieSearchMW__form-container">

                    <fieldset className="MovieSearchMW__form-group">
                        <label 
                            htmlFor="movieTitle"
                            className='MovieSearchMW__label'
                        >
                            Название фильма
                        </label>
                        <input
                            id='movieTitle'
                            className='MovieSearchMW__input'
                            type="text"
                            name='movieTitle'
                            value={searchExpression.movieTitle}
                            onChange={handleSearchExpressionChange}
                            placeholder='Название фильма'
                        />
                        {error?.movieTitle && <span className="MovieSearchMW__error">{error?.movieTitle}</span> }
                    </fieldset>

                    <div className="MovieSearchMW__form-container-inner">
                        <fieldset className="MovieSearchMW__form-group">
                            <label 
                                htmlFor="genre"
                                className='MovieSearchMW__label'
                            >
                                Жанр
                            </label>
                            <Select 
                                id='genre'
                                name='genre'
                                className='MovieSearchMW__select'
                                value={searchExpression.genre}
                                onChange={handleGenreChange}
                                options={genreOptions}
                                placeholder='Выберите жанр'
                            />
                        </fieldset>

                        <div className="MovieSearchMW__form-group-date">
                            <fieldset className='MovieSearchMW__form-group'>
                                <label 
                                    htmlFor="startYear"
                                    className='MovieSearchMW__label'
                                >
                                    Год (с)
                                </label>
                                <input
                                    id='startYear'
                                    type="number"
                                    name='startYear'
                                    min='1900'
                                    max={currentYear}
                                    value={searchExpression.startYear}
                                    onChange={handleSearchExpressionChange}
                                    placeholder='Начало'
                                />
                            </fieldset>

                            <fieldset className='MovieSearchMW__form-group'>
                                <label 
                                    htmlFor="endYear"
                                    className='MovieSearchMW__label'
                                >
                                    Год (по)
                                </label>
                                <input
                                    id='endYear'
                                    type="number"
                                    name='endYear'
                                    min='1900'
                                    max={currentYear}
                                    value={searchExpression.endYear}
                                    onChange={handleSearchExpressionChange}
                                    placeholder='Конец'
                                />
                            </fieldset>
                        </div>

                    </div>

                    <div className="MovieSearchMW__btn-group">
                        <div 
                            className="MovieSearchMW__btn-close"
                            onClick={handleClose}
                        >
                            Закрыть окно
                        </div>
                        <button 
                            className="MovieSearchMW__btn"
                            type='submit'
                        >
                            Поиск
                        </button>
                    </div>

                </div>
            </form>
        </Modal>
    )
}

export default MovieSearchMW