import React from 'react';
//===== assets =====//
import './MovieInfoNavigation.scss';

const navbarData = [
    {id: 1, title: 'Аннотация', section: 'about'},
    {id: 2, title: 'Актеры', section: 'actors'},
    {id: 3, title: 'Факты', section: 'facts'},
]

const MovieInfoNavigation = ({
    movie,
    activeSection,
    switchActiveSection
}) => {
  
    const factsData = [
        {id: 1, title: 'Награды', fact: movie.Awards},
        {id: 2, title: 'Бюджет', fact: movie.BoxOffice},
    ]
  
    return (
    <main className='MovieInfoNavigation'>
        <nav className='MovieInfoNavigation__nav'>
            <ul className="MovieInfoNavigation__ul">
                {navbarData.map(item => (
                    <li
                        key={item.id}
                        className={`MovieInfoNavigation__li ${activeSection === `${item.section}` ? 'active-section' : ''}`}
                        onClick={() => switchActiveSection(item.section)}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
        </nav>

        {activeSection === 'about' && 
            <section className="MovieInfoNavigation__about">
                {movie.Plot}
            </section> 
        }
        {activeSection === 'actors' && 
            <section className="MovieInfoNavigation__actors">
                {movie.Actors}
            </section> 
        }
        {activeSection === 'facts' && 
            <section className="MovieInfoNavigation__facts">
                {factsData.map(fact => (
                    <article
                        key={fact.id}
                        className='MovieInfoNavigation__article'
                    >
                        <span className='MovieInfoNavigation__title'>{fact.title}: </span>
                        <span className='MovieInfoNavigation__award'>{fact.fact}</span>
                    </article>
                ))}    
            </section> 
        }

    </main>
  )
}

export default MovieInfoNavigation;