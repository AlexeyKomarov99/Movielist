import React, {useEffect} from 'react';
//===== redux =====//
import { useSelector, useDispatch } from 'react-redux'
import {
    selectMoviesStatus,
    selectMoviesError,
    selectMainPageSerials
} from '../../features/movies/moviesSelectors';
import {
    fetchMainPageSerials
} from '../../features/movies/moviesAPI';
//===== components =====//
import MovieCard from '../MovieCard/MovieCard';
//===== assets =====//
import './HomePageSerials.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const HomePageSerials = () => {
    const dispatch = useDispatch();
    const serials = useSelector(selectMainPageSerials) || []; // Добавляем fallback на случай undefined
    const serialsStatus = useSelector(selectMoviesStatus);
    const error = useSelector(selectMoviesError);
    
    useEffect(() => {
        dispatch(fetchMainPageSerials('serial'));
    }, [dispatch]);

    // Добавляем проверку на пустой массив
    const isEmpty = !serials || serials.length === 0;

    let content;

    if (serialsStatus === 'loading') {
        content = <p className="loading-message">Loading serials...</p>;
    } else if (serialsStatus === 'failed') {
        content = <p className="error-message">{error || 'Failed to load serials'}</p>;
    } else if (serialsStatus === 'succeeded' && !isEmpty) {
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
                onInit={(swiper) => {
                    swiper.setTranslate(swiper.width * -0.5);
                }}
            >
                {serials.map(serial => (
                    <SwiperSlide key={serial.imdbID} style={{ width: 'auto' }}>
                        <MovieCard movie={serial} />
                    </SwiperSlide>
                ))}
            </Swiper>
        );
    } else {
        content = <p className="empty-message">No serials available</p>;
    }

    return (
        <section className='HomePageSerials'>
            {content}
        </section>
    );
}

export default HomePageSerials;