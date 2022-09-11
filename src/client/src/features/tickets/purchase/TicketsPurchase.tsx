import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import ProgressBar from "./ProgressBar/ProgressBar";
import * as style from "./styled";
import {useParams} from "react-router";
import AvailableOffers from "features/offers/AvailableOffers/AvailableOffers";
import {useNavigate} from "react-router-dom";

function TicketPurchase() {
    const maxTicketCount = 16;
    const minTicketCount = 0;
    const {seanceId} = useParams();
    const [seanceIdNumber, setSeanceIdNumber] = useState<number>(0);
    const [ticketCount, setTicketCount] = useState<number>(0);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (seanceId === undefined){
            navigate("/");
        }

        setSeanceIdNumber(parseInt(seanceId!));
    }, [seanceId]);
    
    return (
        <main className="display-container">
            <SectionContainer minHeight={"720px"} margin={"40px 12px"}>
                <ProgressBar/>
                <style.TicketNumberContainer>
                    <style.TicketNumberLabel>Wybierz liczbę biletów:</style.TicketNumberLabel>
                    <style.CounterContainer>
                        <style.IncrementButton isVisible={ticketCount !== maxTicketCount} onClick={() => {
                            if (ticketCount < maxTicketCount) {
                                setTicketCount(prevState => prevState + 1);
                            }
                        }}/>
                        <style.CounterNumberSpan>{ticketCount}</style.CounterNumberSpan>
                        <style.DecrementButton isVisible={ticketCount !== minTicketCount} onClick={() => {
                            if (ticketCount > minTicketCount) {
                                setTicketCount(prevState => prevState - 1);
                            }
                        }}/>
                    </style.CounterContainer>
                </style.TicketNumberContainer>
                <AvailableOffers seanceId={seanceIdNumber} numberOfTickets={ticketCount}/>
            </SectionContainer>
        </main>
    )
}

export default TicketPurchase;