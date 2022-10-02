import React from 'react';
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import * as style from './styled';
import Legend from "./Legend/Legend";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {ChooseSeatRequest, ChooseSeatResponse} from "generated/seance/seance_pb";

interface Props {
    seanceId: number,
    ticketsCount: number,
    onSeatClick: (seatId: number) => void,
    onPrevClick: () => void,
    onNextClick: () => void,
    selectedSeats: number,
    seanceClient: SeanceClient,
    stream: BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse> | undefined
}

function SeatChoice({seanceId, ticketsCount, onSeatClick, onPrevClick, onNextClick, selectedSeats, stream, seanceClient}: Props) {
    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay seanceId={seanceId} ticketsCount={ticketsCount} onSeatClick={onSeatClick}
                             selectedSeats={selectedSeats} seanceClient={seanceClient} stream={stream}/>
            </style.ContentContainer>
            <NavigationButtons onPrevClick={onPrevClick} onNextClick={onNextClick}/>
        </div>)
}

export default SeatChoice;