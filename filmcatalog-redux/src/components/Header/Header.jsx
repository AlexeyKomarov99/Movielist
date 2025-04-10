import React from 'react';
import {Link} from 'react-router-dom';
//===== assets =====//
import './Header.scss';

const Header = () => {
  return (
    <div className='Header'>
      <span>Home page</span>
      <span>Кол-во избранных фильмов</span>
    </div>
  )
}

export default Header