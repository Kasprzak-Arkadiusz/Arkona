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
    onPayClick: () => string | undefined ;
}

function PurchaseSummary({seanceId, promotionId, discountedTickets, onPayClick}: Props) {
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    
    const innerOnPayClick = () => {
        const result = onPayClick();
        if (result !== undefined){
            setError(result)
            return;
        }

        navigate("/")
    }
    
    return (
        <style.ContentContainer>
            {error && <style.ErrorMessage>{error}</style.ErrorMessage>} 
            <style.SummaryContainer>
                <style.SummaryHeader>Podsumowanie</style.SummaryHeader>
                <SeanceSection seanceId={seanceId}/>
                <PromotionSection promotionId={promotionId}/>
                <TicketsSection discountedTickets={discountedTickets}/>
                <PriceSection promotionId={promotionId} discountedTickets={discountedTickets}/>
            </style.SummaryContainer>
            <NavigationButtons onPrevClick={() => navigate(-1)}
                               nextText={"Zapłać"} onNextClick={innerOnPayClick}/>
        </style.ContentContainer>
    )
}

export default PurchaseSummary;