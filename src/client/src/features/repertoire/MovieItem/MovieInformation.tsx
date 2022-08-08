import React from 'react';
import * as style from "./styled";

interface IProps {
    children?: React.ReactNode;
    title: string,
    genre: string,
    ageRestriction: number,
    duration: number,
    releaseDate: string
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
            <style.Property>
                <style.PropertyLabel id={"ReleaseDate"}>Data premiery: </style.PropertyLabel>
                <style.PropertyText>{releaseDate}</style.PropertyText>
            </style.Property>
            {children}
        </style.InformationContainer>
    )
}

export default MovieInformation;