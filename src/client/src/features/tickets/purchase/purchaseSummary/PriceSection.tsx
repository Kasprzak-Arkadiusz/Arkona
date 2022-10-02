import React from 'react';
import * as style from "./styled";

function PriceSection() {
    return (
        <style.SectionContainer>
            <style.SectionTitle>Cena:</style.SectionTitle>
            <style.SectionDetailsContainer>
                <style.DetailContainer>
                    <style.DetailsText>20zł</style.DetailsText>
                </style.DetailContainer>
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default PriceSection;