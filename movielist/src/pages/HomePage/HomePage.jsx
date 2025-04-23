import React from 'react';
//===== components =====//
import HomePageMovies from '../../components/HomePageMovies/HomePageMovies';
import HomePageSerials from '../../components/HomePageSerials/HomePageSerials';
//===== assets =====//
import './HomePage.scss';

const HomePage = () => {

  return (
    <main className='HomePage'>
      
      <section className="HomePage__movies">
        <h1 className="HomePage__title">Фантастика</h1>
        <HomePageMovies />
      </section>

      <section className="HomePage__serials">
        <h1 className="HomePage__title">Сериалы</h1>
        <HomePageSerials />
      </section>

    </main>
  )
}

export default HomePage;