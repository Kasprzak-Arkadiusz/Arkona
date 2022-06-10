import React from 'react';
import { ProjectorIcon } from 'assets/icons/Projector/Projector';
import { OfferIcon } from 'assets/icons/Offer/Offer';
import FilmHolder from './FilmHolder/FilmHolder';
import OfferHolder from './OfferHolder/OfferHolder';
import IconTitle from 'components/IconTitle/IconTitle'
import * as home from './styled'

function Home() {
    return (
        <main className="display-container">
            <home.filmsContainer>
                <IconTitle Component={ProjectorIcon} title="Na ekranie"/>
                <home.filmListContainer>
                    <FilmHolder image="" title="Lorem ipsum dolor sit amet, consectetur cras amet." />
                    <FilmHolder image="" title="Vivamus nec eleifend ligula, vitae consectetur." />
                    <FilmHolder image="" title="Maecenas porta tortor diam, quis blandit nulla." />
                    <FilmHolder image="" title="Nunc et ante porttitor urna tempor finibus." />
                    <FilmHolder image="" title="Suspendisse erat lacus." />
                    <FilmHolder image="" title="Pellentesque sed egestas eu." />
                    <FilmHolder image="" title="Fusce suscipit laoreet neque." />
                    <FilmHolder image="" title="Suspendisse pretium lacus sed eleifend." />
                </home.filmListContainer>
                <home.seeMoreContainer>
                    <home.seeMoreLink to="/repertoire">
                        Zobacz więcej
                    </home.seeMoreLink>
                </home.seeMoreContainer>
            </home.filmsContainer>
            <home.offersContainer>
                <IconTitle Component={OfferIcon} title={"Oferty specjalne"}/>
                <home.offerListContainer>
                    <OfferHolder image="" title="Rodzinny tydzień - Dorośli płacą tyle co dzieci" />
                    <OfferHolder image="" title="Weekend z filmami SF" />
                    <OfferHolder image="" title="4 bilety w cenie 3" />
                </home.offerListContainer>
                <home.seeMoreContainer>
                    <home.seeMoreLink to="/offers">
                        Zobacz więcej
                    </home.seeMoreLink>
                </home.seeMoreContainer>
            </home.offersContainer>
        </main>
    );
}

export default Home;
