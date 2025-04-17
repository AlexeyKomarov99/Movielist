import React from 'react';
import { NavLink } from 'react-router-dom';
//===== redux =====//
import { useSelector } from 'react-redux';
import { getFavoritesCount } from '../../features/movies/moviesSlice';
//===== assets =====//
import './Navbar.scss';

import { AiOutlineHome as HomeIcon } from "react-icons/ai";
import { CiHeart as HeartIcon } from "react-icons/ci";
import { PiBooks as WatchLaterIcon } from "react-icons/pi";
import { GoHistory as HistoryIcon } from "react-icons/go";

const Navbar = () => {
  
  const countFavoritsMovies = useSelector(getFavoritesCount);
  // const countWatchLaterMovies = useSelector(getWatchLaterCount);
  // const countHistoryMovies = useSelector(getHistoryCount);

  const navbarData = [
    {id: 1, route: '/', title: 'Главная', icon: <HomeIcon className="Navbar__icon" />},
    {id: 2, route: '/movies/featured-list', title: 'Избранное', icon: <HeartIcon className="Navbar__icon" />, countMovies: countFavoritsMovies },
    {id: 3, route: '/movies/watch-later', title: 'Посмотреть позже', icon: <WatchLaterIcon className="Navbar__icon" />, countMovies: 0 },
    {id: 4, route: '/movies/movie-viewing-history', title: 'История просмотров', icon: <HistoryIcon className="Navbar__icon" />, countMovies: 0 },
  ]

  
  const navWithCount = ['Избранное', 'Посмотреть позже', 'История просмотров'];

  return (
    <nav className='Navbar'>
        <ul className="Navbar__container">
          {navbarData.map((link) => (
            <li
              key={link.id} 
              className="Navbar__item"
            >
              <NavLink
                to={link.route}
                className={({isActive}) => `Navbar__link ${isActive ? 'active-link' : ''}`}
              >
                <div className="Navbar__left-part">
                  <span className="Navbar__icon-wrapper">
                    {link.icon}
                  </span>
                  <span className="Navbar__title">{link.title}</span>
                </div>

                {navWithCount.includes(link.title) && link.countMovies > 0 && (
                  <div className="Navbar__right-part">
                    <div className="Navbar__circle-wrapper">
                      <span className="Navbar__circle">{link.countMovies}</span>
                    </div>
                  </div>
                )}

              </NavLink>
            </li>
          ))}

        </ul>
    </nav>
  )
}

export default Navbar;