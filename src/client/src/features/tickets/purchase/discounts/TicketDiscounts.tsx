import React from 'react';
import {useNavigate} from "react-router-dom";
import AvailableOffers from "./AvailableOffers/AvailableOffers";
import {useEffect, useState} from "react";
import * as style from './styled';
import AvailableDiscounts from "./AvailableDiscounts/AvailableDiscounts";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {TicketDiscountsDetails} from "generated/ticketDiscount/ticketDiscount_pb";
import {TicketDetails} from "../models/TicketDetails";

interface Props {
    movieId: number;
    seanceId: number
    onOfferIdChange: (offerId: number) => void;
    onDiscountChange: (discountId: TicketDiscountsDetails, ticketsCount: number) => void;
    initialTickets: Array<TicketDetails>;
    selectedOfferId: number;
}

function TicketDiscounts({
                             movieId,
                             seanceId,
                             onOfferIdChange,
                             onDiscountChange,
                             initialTickets,
                             selectedOfferId
                         }: Props) {
    const [numberOfTickets, setNumberOfTickets] = useState<number>(0);
    const [movieIdState, setMovieIdState] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const errorMessage = "Wybierz przynajmniej jeden bilet";
    const navigate = useNavigate();

    useEffect(() => {
        setNumberOfTickets(initialTickets.reduce((prev, curr) => prev + curr.numberOfTickets, 0))
    }, []);

    useEffect(() => {
        setMovieIdState(movieId);
    }, [movieId]);
    
    useEffect(() => {
        if (initialTickets.length !== 0) {
            setNumberOfTickets(initialTickets.reduce((prev, curr) => prev + curr.numberOfTickets, 0))
        }
    }, [initialTickets]);    
    
    const onNextClickHandler = () => {
        if (numberOfTickets > 0) {
            navigate(`/movie/${movieIdState}/tickets-purchase/${seanceId}/seatChoice`)
        } else {
            setShowError(true);
        }
    }
    
    return (
        <div>
            {showError && <style.ErrorLabel>{errorMessage}</style.ErrorLabel>}
            <AvailableOffers seanceId={seanceId} numberOfTickets={numberOfTickets} selectedOfferId={selectedOfferId}
                             onCheckHandler={(checkedOfferId) => {
                                 onOfferIdChange(checkedOfferId);
                             }}/>
            <AvailableDiscounts onChange={onDiscountChange} initialTickets={initialTickets}/>
            <NavigationButtons onPrevClick={() => navigate(`/movie/${movieIdState}/`)}
                               onNextClick={onNextClickHandler}/>

        </div>
    )
}

export default TicketDiscounts;