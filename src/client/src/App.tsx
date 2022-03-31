import React from 'react';
import './css/App.css';
import './css/index.css';
import { ProjectorIcon } from './icons/Projector';
import { OfferIcon } from './icons/Offer';
import { Logo } from './icons/Logo';

function App() {
    return (
        <main className="display-container">
            <header className="header">
                <div className="logo-container">
                    <Logo className="logo-container__logo" />
                    <span className="logo-container__title">Arkona</span>
                </div>
                <div className="navbar-container">
                    <span className="navbar-container__link">Repertuar</span>
                    <span className="navbar-container__link">Promocje</span>
                    <span className="navbar-container__link">Bilety</span>
                </div>
                <div className="account-container align-right">
                    <span className="account-container__link">Zaloguj</span>
                    <span className="account-container__link">Zarejestruj</span>
                </div>
            </header>

            <section className="films-container">
                <div className="on-screen-container">
                    <span className="on-screen-container__text">
                        Na ekranie
                    </span>
                    <ProjectorIcon className="on-screen-container__icon" />
                </div>
                <div className="film-list-container">
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Lorem ipsum dolor sit amet, consectetur cras amet.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Vivamus nec eleifend ligula, vitae consectetur.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Maecenas porta tortor diam, quis blandit nulla.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Nunc et ante porttitor urna tempor finibus.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Suspendisse erat lacus.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Pellentesque sed egestas eu.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Fusce suscipit laoreet neque.
                        </span>
                    </div>
                    <div className="film-holder">
                        <img className="film-holder__image" alt="" />
                        <span className="film-holder__title">
                            Suspendisse pretium lacus sed eleifend.
                        </span>
                    </div>
                </div>
                <div className="see-more-container">
                    <a className="see-more-container__action">Zobacz więcej</a>
                </div>
            </section>

            <section className="offers-container">
                <div className="offers-header-container">
                    <span className="offers-header-container__text">
                        Oferty specjalne
                    </span>
                    <OfferIcon
                        className="offers-header-container__icon"
                        height="20"
                    />
                </div>
                <div className="offer-list-container">
                    <div className="offer-holder">
                        <span className="offer-holder__text">
                            Rodzinny tydzień - Dorośli płacą tyle co dzieci
                        </span>
                    </div>
                    <div className="offer-holder">
                        <span className="offer-holder__text">
                            Weekend z filmami SF
                        </span>
                    </div>
                    <div className="offer-holder">
                        <span className="offer-holder__text">
                            4 bilety w cenie 3
                        </span>
                    </div>
                </div>
                <div className="see-more-container">
                    <a className="see-more-container__action">Zobacz więcej</a>
                </div>
            </section>
        </main>
    );
}

export default App;
