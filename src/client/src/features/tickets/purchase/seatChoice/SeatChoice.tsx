import React, {useState} from 'react';
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import * as style from './styled';
import Legend from "./Legend/Legend";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {ChooseSeatRequest, ChooseSeatResponse} from "generated/seance/seance_pb";
import {useNavigate} from "react-router-dom";

interface Props {
    seanceId: number,
    movieId: number,
    ticketsCount: number,
    onSeatClick: (seatId: number) => void,
    selectedSeats:  Array<number>,
    seanceClient: SeanceClient,
    stream: BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse> | undefined
}

function SeatChoice({seanceId, movieId, ticketsCount, onSeatClick, selectedSeats, stream, seanceClient}: Props) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
    const errMessage = "Liczba wybranych miejsc jest różna od liczby wybranych biletów!";
    const navigate = useNavigate();

    const onNextButtonClick = () => {
        if (selectedSeats.length !== ticketsCount) {
            setErrorMessage(errMessage);
            return;
        }
        navigate(`/movie/${movieId}/tickets-purchase/${seanceId}/purchaseSummary`);
    };

    const onPrevButtonClick = () => {
        navigate(`/movie/${movieId}/tickets-purchase/${seanceId}/discounts`);
    }
    
    const onSeatChoice = (seatId: number) => {
        setErrorMessage(undefined);
        onSeatClick(seatId);
    }

    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay seanceId={seanceId} ticketsCount={ticketsCount} onSeatClick={onSeatChoice}
                             selectedSeats={selectedSeats} seanceClient={seanceClient} stream={stream}
                             errorMessage={errorMessage} />
            </style.ContentContainer>
            <NavigationButtons onPrevClick={onPrevButtonClick} onNextClick={onNextButtonClick}/>
        </div>)
}

export default SeatChoice;