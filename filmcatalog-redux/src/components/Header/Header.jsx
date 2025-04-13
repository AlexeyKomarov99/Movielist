import React from 'react';
import {Link} from 'react-router-dom';
//===== assets =====//
import './Header.scss';
import {ReactComponent as MainLogo} from '../../assets/icons/main-logo/MainLogo.svg';
//===== components =====//
import Navbar from '../Navbar/Navbar';
import MovieSearch from '../MovieSearch/MovieSearch';

const Header = () => {
  return (
    <header className='Header'>
      <div className="Header__wrapper">
        <div className="Header__container">
          <div className="Header__content">
            <MainLogo className='MainLogo' />
            <MovieSearch />
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header