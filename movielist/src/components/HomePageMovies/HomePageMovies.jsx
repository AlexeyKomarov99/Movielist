import React, {useEffect} from 'react'
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux'
import {
    selectMoviesStatus,
    selectMoviesError,
    selectMainPageMovies
} from '../../features/movies/moviesSelectors';
import {
    fetchMainPageMovies
} from '../../features/movies/moviesAPI';
//===== components =====//
import MovieCard from '../MovieCard/MovieCard';
//===== assets =====//
import './HomePageMovies.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const HomePageMovies = () => {
    const dispatch = useDispatch();
    const movies = useSelector(selectMainPageMovies);
    const movieStatus = useSelector(selectMoviesStatus);
    const error = useSelector(selectMoviesError);

    useEffect(() => {
        dispatch(fetchMainPageMovies('war'));
    }, [dispatch]);

    // Добавляем проверку на пустой массив
    const isEmpty = !movies || movies.length === 0;

    let content;

    if(movieStatus === 'loading') {
        content = <p>Loading...</p>
    } else if (movieStatus === 'succeeded' && !isEmpty) {
        content = (
            <Swiper
                modules={[Autoplay, FreeMode]}
                freeMode={true}
                spaceBetween={20}
                slidesPerView={'auto'}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false,
                }}
                speed={3000}
                loop={true}
                loopAdditionalSlides={10}
                resistance={false}
            >
                {movies.map(movie => (
                    <SwiperSlide key={movie.imdbID} style={{ width: 'auto' }}>
                        <MovieCard movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiper>
        )
    } else if (movieStatus === 'failed') {
        content = <p>{error}</p>
    }

    return (
    <section className='HomePageMovies'>
        {content}
    </section>
  )
}

export default HomePageMovies