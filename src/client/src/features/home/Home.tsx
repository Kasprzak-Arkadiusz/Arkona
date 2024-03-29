﻿import React, {useEffect, useState} from 'react';
import {ProjectorIcon} from 'assets/icons/Projector/Projector';
import {OfferIcon} from 'assets/icons/Offer/Offer';
import FilmHolder from './FilmHolder/FilmHolder';
import OfferHolder from './OfferHolder/OfferHolder';
import IconTitle from 'components/IconTitle/IconTitle'
import SectionContainer from 'components/SectionContainer/SectionContainer'
import * as home from './styled'
import {MovieClient} from "generated/movie/movie_pb_service";
import {GeneralMovieInfo, GetLatestMoviesRequest} from "generated/movie/movie_pb";
import {GeneralOfferInfo, GetLatestOffersRequest} from "generated/offer/offer_pb";
import {OfferClient} from "generated/offer/offer_pb_service";

function Home() {
    const [movies, setMovies] = useState(Array<GeneralMovieInfo>());
    const [offers, setOffers] = useState(Array<GeneralOfferInfo>());

    useEffect(() => {
        const movieClient = new MovieClient(process.env.REACT_APP_SERVER_URL!);
        const movieRequest = new GetLatestMoviesRequest();
        movieRequest.setCount(8);

        movieClient.getLatestMovies(movieRequest, (error, responseMessage) => {
            if (responseMessage !== null) {
                setMovies(responseMessage.getItemsList());
            }
        });

        const offerClient = new OfferClient(process.env.REACT_APP_SERVER_URL!);
        const offerRequest = new GetLatestOffersRequest();
        offerRequest.setCount(3);

        offerClient.getLatestOffers(offerRequest, (error, responseMessage) => {
            if (responseMessage !== null) {
                setOffers(responseMessage.getOffersList());
            }
        })
    }, [])

    return (
        <main className="display-container">
            <SectionContainer>
                <IconTitle Component={ProjectorIcon} title="Na ekranie"/>
                <home.filmListContainer>
                    {movies.map((item) => {
                        return <FilmHolder image={item.getImage_asB64()}
                                           title={item.getTitle()}
                                           id={item.getId()}
                                           key={item.getId()}/>
                    })}
                </home.filmListContainer>
                <home.seeMoreContainer>
                    <home.seeMoreLink to="/repertoire">
                        Zobacz więcej
                    </home.seeMoreLink>
                </home.seeMoreContainer>
            </SectionContainer>
            <SectionContainer margin={"40px 12px 40px 12px"}>
                <IconTitle Component={OfferIcon} title={"Oferty specjalne"}/>
                <home.offerListContainer>
                    {offers.map((item) => {
                        return <OfferHolder image={item.getImage_asB64()}
                                           name={item.getName()}
                                           id={item.getId()}
                                           key={item.getId()}/>
                    })}
                </home.offerListContainer>
                <home.seeMoreContainer>
                    <home.seeMoreLink to="/offers">
                        Zobacz więcej
                    </home.seeMoreLink>
                </home.seeMoreContainer>
            </SectionContainer>
        </main>
    );
}

export default Home;
