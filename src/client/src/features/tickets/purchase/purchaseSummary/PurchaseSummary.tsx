import React, {useState} from 'react';
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {useNavigate} from "react-router-dom";
import * as style from "./styled";
import SeanceSection from "./SeanceSection";
import PromotionSection from "./PromotionSection";
import TicketsSection from "./TicketsSection";
import PriceSection from "./PriceSection";
import {TicketDetails} from "../models/TicketDetails";

interface Props {
    seanceId: number,
    promotionId: number,
    discountedTickets: Array<TicketDetails>
    onPayClick: () => void;
    errorMessage: string | undefined;
}

function PurchaseSummary({seanceId, promotionId, discountedTickets, onPayClick, errorMessage}: Props) {
    const navigate = useNavigate();
    
    return (
        <style.ContentContainer>
            {errorMessage && <style.ErrorMessage>{errorMessage}</style.ErrorMessage>} 
            <style.SummaryContainer>
                <style.SummaryHeader>Podsumowanie</style.SummaryHeader>
                <SeanceSection seanceId={seanceId}/>
                <PromotionSection promotionId={promotionId}/>
                <TicketsSection discountedTickets={discountedTickets}/>
                <PriceSection promotionId={promotionId} discountedTickets={discountedTickets}/>
            </style.SummaryContainer>
            <NavigationButtons onPrevClick={() => navigate(-1)}
                               nextText={"Zapłać"} onNextClick={onPayClick}/>
        </style.ContentContainer>
    )
}

export default PurchaseSummary;