import React from 'react';
import * as style from "./styled";

function PromotionSection() {
    return (
        <style.SectionContainer>
            <style.SectionTitle>Promocja:</style.SectionTitle>
            <style.SectionDetailsContainer textAlign={"center"}>
                <style.DetailContainer>
                    <style.DetailsText>Rodzinny tydzień - Dorośli płacą tyle co dzieci!</style.DetailsText>
                </style.DetailContainer>
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default PromotionSection;