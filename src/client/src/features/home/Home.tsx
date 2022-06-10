import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectorIcon } from 'assets/icons/Projector/Projector';
import { OfferIcon } from 'assets/icons/Offer/Offer';
import FilmHolder from './components/FilmHolder';
import OfferHolder from './components/OfferHolder';
import SectionTitle from 'components/SectionTitle/SectionTitle'
import './home.css';

function Home() {
    return (
        <main className="display-container">
            <section className="films-container">
                <SectionTitle Component={ProjectorIcon} title={"Na ekranie"}/>
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
                <SectionTitle Component={OfferIcon} title={"Oferty specjalne"}/>
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
