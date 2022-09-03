import React from 'react';
import {DetailedMovieInfo} from "generated/movie/movie_pb";
import SectionContainer from "components/SectionContainer/SectionContainer";
import * as style from "./styled";
import FilmHolder from "features/home/FilmHolder/FilmHolder";
import MovieDetailedInformation from "./MovieDetailedInformation";

interface Props {
    movieInfo: DetailedMovieInfo;
}

function MovieDetailsItem({movieInfo}: Props) {
    return (
        <SectionContainer minHeight={"480px"} margin={"40px 12px"}>
            <style.ContentContainer>
                <FilmHolder id={movieInfo.getId()}
                            image={movieInfo.getImage_asB64()}
                            title={movieInfo.getTitle()}
                            displayTitle={false}
                            height={"480px"}
                            width={"320px"}/>
                <MovieDetailedInformation title={movieInfo.getTitle()}
                                          genre={movieInfo.getGenresList().join(", ")}
                                          ageRestriction={movieInfo.getAgerestriction()}
                                          duration={movieInfo.getDuration()}
                                          releaseDate={movieInfo.getReleasedate()}
                                          description={movieInfo.getDescription()}/>
            </style.ContentContainer>
        </SectionContainer>
    )
}

export default MovieDetailsItem;