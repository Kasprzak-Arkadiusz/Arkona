import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectorIcon } from 'assets/icons/Projector';
import { OfferIcon } from 'assets/icons/Offer';
import FilmHolder from './components/FilmHolder';
import OfferHolder from './components/OfferHolder';
import Title from 'components/layouts/Header/Title'
import 'assets/Home.css';

function Home() {
    return (
        <main className="display-container">
            <section className="films-container">
                <Title Component={ProjectorIcon} title={"Na ekranie"}/>
                <div className="film-list-container">
                    <FilmHolder image="" title="Lorem ipsum dolor sit amet, consectetur cras amet." />
                    <FilmHolder image="" title="Vivamus nec eleifend ligula, vitae consectetur." />
                    <FilmHolder image="" title="Maecenas porta tortor diam, quis blandit nulla." />
                    <FilmHolder image="" title="Nunc et ante porttitor urna tempor finibus." />
                    <FilmHolder image="" title="Suspendisse erat lacus." />
                    <FilmHolder image="" title="Pellentesque sed egestas eu." />
                    <FilmHolder image="" title="Fusce suscipit laoreet neque." />
                    <FilmHolder image="" title="Suspendisse pretium lacus sed eleifend." />
                </div>
                <div className="see-more-container">
                    <Link to="/repertoire" className="see-more-container__action">
                        Zobacz więcej
                    </Link>
                </div>
            </section>
            <section className="offers-container">
                <Title Component={OfferIcon} title={"Oferty specjalne"}/>
                {/*<div className="offers-header-container">*/}
                {/*    <span className="offers-header-container__text">Oferty specjalne</span>*/}
                {/*    <OfferIcon className="offers-header-container__icon" height="20" />*/}
                {/*</div>*/}
                <div className="offer-list-container">
                    <OfferHolder image="" title="Rodzinny tydzień - Dorośli płacą tyle co dzieci" />
                    <OfferHolder image="" title="Weekend z filmami SF" />
                    <OfferHolder image="" title="4 bilety w cenie 3" />
                </div>
                <div className="see-more-container">
                    <Link to="/offers" className="see-more-container__action">
                        Zobacz więcej
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default Home;
