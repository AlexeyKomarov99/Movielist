import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
        <Link to='/'>Главная</Link>
        <Link to='/movies/featured-list'>Избранное</Link>
        <Link to='/movies/watch-later'>Посмотреть позже</Link>
        <Link to='/movies/movie-viewing-history' >История просмотров</Link>
    </nav>
  )
}

export default Navbar
