import React from 'react';
import * as style from "./styled";

function TicketsSection() {
    return (
        <style.SectionContainer>
            <style.SectionTitle>Bilety:</style.SectionTitle>
            <style.SectionDetailsContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Normalne - 20zł: </style.DetailsLabel>
                    <style.DetailsText>2</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Ulgowe - 10zł: </style.DetailsLabel>
                    <style.DetailsText>2</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Studenckie - 15zł: </style.DetailsLabel>
                    <style.DetailsText>1</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Kombatanckie - 8zł: </style.DetailsLabel>
                    <style.DetailsText>2</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Seniorskie - 16zł: </style.DetailsLabel>
                    <style.DetailsText>2</style.DetailsText>
                </style.DetailContainer>
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default TicketsSection;