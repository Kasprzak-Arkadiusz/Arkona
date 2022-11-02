import React from 'react';
import * as style from "./styled";
import {TicketDetails} from "../models/TicketDetails";

interface Props {
    discountedTickets: Array<TicketDetails>
}

function TicketsSection({discountedTickets}: Props) {
    return (
        <style.SectionContainer>
            <style.SectionTitle>Bilety:</style.SectionTitle>
            <style.SectionDetailsContainer>
                {
                    discountedTickets.map((item) => {
                        return (
                            <style.DetailContainer key={item.id}>
                                <style.DetailsLabel>{item.name} {item.discount} :</style.DetailsLabel>
                                <style.DetailsText>{item.numberOfTickets}</style.DetailsText>
                            </style.DetailContainer>
                        )
                    })
                }
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default TicketsSection;