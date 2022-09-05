import React, {ReactChild} from 'react';
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import * as style from "./styled";
import {toDateString} from "utils/dateUtils";

interface Props {
    title: string,
    genre: string,
    ageRestriction: string,
    duration: number,
    releaseDate: Timestamp | undefined,
    description: string
}

function MovieDetailedInformation({title, genre, ageRestriction, duration, releaseDate, description}: Props) {
    return (
        <style.InformationContainer>
            <style.TitleContainer>
                <style.Title>{title}</style.Title>
            </style.TitleContainer>
            <style.Property>
                <style.PropertyLabel id={"Genre"}>Gatunek: </style.PropertyLabel>
                <style.PropertyText>{genre}</style.PropertyText>
            </style.Property>
            <style.Property>
                <style.PropertyLabel id={"AgeRestriction"}>Ograniczenie wiekowe: </style.PropertyLabel>
                <style.PropertyText>{ageRestriction}</style.PropertyText>
            </style.Property>
            <style.Property>
                <style.PropertyLabel id={"Duration"}>Czas trwania: </style.PropertyLabel>
                <style.PropertyText>{duration} min</style.PropertyText>
            </style.Property>
            {releaseDate && <style.Property>
                <style.PropertyLabel id={"ReleaseDate"}>Data premiery: </style.PropertyLabel>
                <style.PropertyText>{toDateString(releaseDate)}</style.PropertyText>
            </style.Property>}
            <style.Property>
                <style.PropertyLabel id={"Description"}>Opis: </style.PropertyLabel>
                <style.PropertyText>{description}</style.PropertyText>
            </style.Property>
        </style.InformationContainer>
    )
}

export default MovieDetailedInformation;
