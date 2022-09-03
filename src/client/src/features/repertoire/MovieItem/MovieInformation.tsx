import React from 'react';
import * as style from "./styled";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";
import {toDateString} from "../../../utils/dateUtils";

interface IProps {
    children?: React.ReactNode;
    title: string,
    genre: string,
    ageRestriction: string,
    duration: number,
    releaseDate: Timestamp | undefined
}

function MovieInformation({children, title, genre, ageRestriction, duration, releaseDate} : IProps) {
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
            {children}
        </style.InformationContainer>
    )
}

export default MovieInformation;