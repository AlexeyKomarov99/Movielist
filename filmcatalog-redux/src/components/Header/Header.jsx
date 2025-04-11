import React from 'react';
import {Link} from 'react-router-dom';
//===== assets =====//
import './Header.scss';
//===== components =====//
import Navbar from '../Navbar/Navbar';

const Header = () => {
  return (
    <header className='Header'>
      <Navbar />
    </header>
  )
}

export default Header