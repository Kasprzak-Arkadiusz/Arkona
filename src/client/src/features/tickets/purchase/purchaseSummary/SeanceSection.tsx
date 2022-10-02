import React from 'react';
import * as style from "./styled";

function SeanceSection() {
    return (
        <style.SectionContainer>
            <style.SectionTitle>Seans:</style.SectionTitle>
            <style.SectionDetailsContainer textAlign={"center"}>
                <style.DetailContainer>
                    <style.DetailsLabel>Tytuł:</style.DetailsLabel>
                    <style.DetailsText>Nasze magiczne Encanto</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Data:</style.DetailsLabel>
                    <style.DetailsText>12/10/2022</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Godzina:</style.DetailsLabel>
                    <style.DetailsText>12:00</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                <style.DetailsLabel>Numer sali:</style.DetailsLabel>
                <style.DetailsText>4</style.DetailsText>
            </style.DetailContainer>
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default SeanceSection;