import React, {useEffect, useState} from 'react';
import {ProjectorIcon} from 'assets/icons/Projector/Projector';
import {OfferIcon} from 'assets/icons/Offer/Offer';
import FilmHolder from './FilmHolder/FilmHolder';
import OfferHolder from './OfferHolder/OfferHolder';
import IconTitle from 'components/IconTitle/IconTitle'
import * as home from './styled'
import {MovieClient, ServiceError} from "generated/movie/movie_pb_service";
import {GeneralMovieInfo, GetMoviesRequest, GetMoviesResponse} from "generated/movie/movie_pb";

function Home() {
    const [movies, setMovies] = useState(Array<GeneralMovieInfo>());
    
    useEffect(() => {
        const movieClient = new MovieClient(process.env.REACT_APP_SERVER_URL!);

        const movieRequest = new GetMoviesRequest()
        movieRequest.setPagenumber(1);
        movieRequest.setPagesize(8);

        movieClient.getMovies(movieRequest, (error: ServiceError | null, responseMessage: GetMoviesResponse | null) => {
            if (responseMessage !== null){
                setMovies(responseMessage.getItemsList());
            }
        });
    }, [])

    return (
        <main className="display-container">
            <home.filmsContainer>
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
            </home.filmsContainer>
            <home.offersContainer>
                <IconTitle Component={OfferIcon} title={"Oferty specjalne"}/>
                <home.offerListContainer>
                    <OfferHolder image="" title="Rodzinny tydzień - Dorośli płacą tyle co dzieci"/>
                    <OfferHolder image="" title="Weekend z filmami SF"/>
                    <OfferHolder image="" title="4 bilety w cenie 3"/>
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
