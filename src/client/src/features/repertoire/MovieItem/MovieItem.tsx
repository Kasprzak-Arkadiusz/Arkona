import React from 'react';
import SectionContainer from "components/SectionContainer/SectionContainer";
import FilmHolder from "features/home/FilmHolder/FilmHolder";
import MovieInformation from "./MovieInformation"
import * as style from "./styled";

interface IProps {
    image: string,
    title: string,
    id: number,
    genre: string,
    ageRestriction: number,
    duration: number,
    releaseDate: string
}

function MovieItem({image, title, id, genre, ageRestriction, duration, releaseDate}: IProps) {
    return (
        <SectionContainer minHeight={"360px"} margin={"40px 12px"}>
            <style.ContentContainer>
                <FilmHolder image={image} id={id} title={title} displayTitle={false}/>
                <MovieInformation title={title} genre={genre} ageRestriction={ageRestriction} 
                                  duration={duration} releaseDate={releaseDate}>
                    <style.ViewDetailsLink to={`movie/${id}`}>
                        Zobacz szczegóły
                    </style.ViewDetailsLink>
                </MovieInformation>
            </style.ContentContainer>
        </SectionContainer>
    )
}

export default MovieItem;