import React from 'react';
import { FaStar as StarIcon } from 'react-icons/fa';
import './RatingWithStars.scss';

const RatingWithStars = ({ movie }) => {
    // IMDb рейтинг от 0 до 10, преобразуем в 0-5
    const rating = parseFloat(movie.imdbRating) / 2;
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 >= 0.25; // Показываем частичную звезду только если остаток >= 0.25
    const partialStarPercentage = (rating % 1) * 100;

    return (
        <div className="RatingWithStars">
            <div className="RatingWithStars__stars" style={{ display: 'flex' }}>
                {[...Array(5)].map((_, index) => {
                    if (index < fullStars) {
                        // Полностью закрашенная звезда
                        return <StarIcon key={index} color="orange" size={24} />;
                    } else if (index === fullStars && hasPartialStar) {
                        // Частично закрашенная звезда
                        return (
                            <div key={index} style={{ position: 'relative', display: 'inline-block' }}>
                                <StarIcon color="lightgray" size={24} />
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: `${partialStarPercentage}%`,
                                    height: '100%',
                                    overflow: 'hidden'
                                }}>
                                    <StarIcon color="orange" size={24} />
                                </div>
                            </div>
                        );
                    } else {
                        // Пустая звезда
                        return <StarIcon key={index} color="lightgray" size={30} />;
                    }
                })}
            </div>
            <div className="RatingWithStars__rating">
                Рейтинг: {movie.imdbRating}
            </div>
        </div>
    );
}

export default RatingWithStars;