import React from 'react';
import {useNavigate} from "react-router-dom";
import AvailableOffers from "./AvailableOffers/AvailableOffers";
import {useEffect, useState} from "react";
import * as style from './styled';
import AvailableDiscounts from "./AvailableDiscounts/AvailableDiscounts";
import NavigationButtons from "../NavigationButtons/NavigationButtons";

interface Props {
    movieId: number;
    seanceId: number;
    onTicketCountChange: (ticketNumber: number) => void;
    ticketsCount: number;
}

function TicketDiscounts({movieId, seanceId, onTicketCountChange, ticketsCount}: Props) {
    const maxTicketCount = 16;
    const minTicketCount = 0;
    const [ticketCount, setTicketCount] = useState<number>(ticketsCount);
    const [movieIdState, setMovieIdState] = useState<number>(0);
    const [offerId, setOfferId] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const errorMessage = "Wybierz przynajmniej jeden bilet";
    const navigate = useNavigate();

    useEffect(() => {
        onTicketCountChange(ticketCount);
    }, [ticketCount]);
    
    useEffect(() => {
        setMovieIdState(movieId);
    },[movieId]);

    const onClickHandler = () => {
        if (ticketCount > 0) {
            navigate(`/movie/${movieIdState}/tickets-purchase/${seanceId}/seatChoice`)
        } else {
            setShowError(true);
        }
    }

    return (
        <div>
            {showError && <style.ErrorLabel>{errorMessage}</style.ErrorLabel>}
            <style.TicketNumberContainer>
                <style.TicketNumberLabel>Wybierz liczbę biletów:</style.TicketNumberLabel>
                <style.CounterContainer>
                    <style.IncrementButton isVisible={ticketCount !== maxTicketCount} onClick={() => {
                        if (ticketCount < maxTicketCount) {
                            setTicketCount(prevState => prevState + 1);
                            setShowError(false);
                        }
                    }}/>
                    <style.CounterNumberSpan>{ticketCount}</style.CounterNumberSpan>
                    <style.DecrementButton isVisible={ticketCount !== minTicketCount} onClick={() => {
                        if (ticketCount > minTicketCount) {
                            setTicketCount(prevState => prevState - 1);
                        }
                        if (ticketCount === minTicketCount + 1) {
                            setShowError(true);
                        }
                    }}/>
                </style.CounterContainer>
            </style.TicketNumberContainer>
            <AvailableOffers seanceId={seanceId} numberOfTickets={ticketCount} 
                             onCheckHandler={(checkedOfferId) => setOfferId(checkedOfferId)
            }/>
            <AvailableDiscounts/>
            <NavigationButtons onPrevClick={(e) => navigate(`/movie/${movieIdState}/`)}
                               onNextClick={onClickHandler}/>

        </div>
    )
}

export default TicketDiscounts;