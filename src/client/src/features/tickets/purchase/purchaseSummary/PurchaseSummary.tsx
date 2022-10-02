import React from 'react';
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {useNavigate} from "react-router-dom";
import * as style from "./styled";
import SeanceSection from "./SeanceSection";
import PromotionSection from "./PromotionSection";
import TicketsSection from "./TicketsSection";
import PriceSection from "./PriceSection";

function PurchaseSummary() {
    const navigate = useNavigate();
    return (
        <style.ContentContainer>
            <style.SummaryContainer>
                <style.SummaryHeader>Podsumowanie</style.SummaryHeader>
                <SeanceSection/>
                <PromotionSection/>
                <TicketsSection/>
                <PriceSection/>
            </style.SummaryContainer>
            <NavigationButtons onPrevClick={() => navigate(-1)}
                               nextText={"Zapłać"} onNextClick={() => navigate("/")}/>
        </style.ContentContainer>
    )
}

export default PurchaseSummary;