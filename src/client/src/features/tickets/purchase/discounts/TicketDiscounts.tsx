import React from 'react';
import AvailableOffers from "./AvailableOffers/AvailableOffers";
import {useEffect, useState} from "react";
import * as style from './styled';

interface Props{
    seanceId: number;
    onTicketCountChange: (ticketNumber: number) => void;
}

function TicketDiscounts({seanceId, onTicketCountChange}: Props) {
    const maxTicketCount = 16;
    const minTicketCount = 0;
    const [ticketCount, setTicketCount] = useState<number>(0);
    
    useEffect(() => {
        onTicketCountChange(ticketCount);
    }, [ticketCount]);
    
    return (
        <div>
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
            <AvailableOffers seanceId={seanceId} numberOfTickets={ticketCount}/>
        </div>
    )
}

export default TicketDiscounts;