import React from 'react';
import { Outlet } from 'react-router-dom';
//===== components =====//
import Header from '../Header/Header';
//===== assets =====//
import './Layout.scss';

const Layout = () => {
  return (
    <div className="Layout">
      <div className="Layout__content">
        
        <div className="Layout__container-Header">
          <Header />
        </div>

        <div className="Layout__container-Outlet">
          <Outlet />
        </div>

      </div>
    </div>
  )
}

export default Layout;