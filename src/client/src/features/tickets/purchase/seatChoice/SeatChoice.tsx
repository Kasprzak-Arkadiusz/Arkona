import React from 'react';
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import * as style from './styled';
import Legend from "./Legend/Legend";
import NavigationButtons from "../NavigationButtons/NavigationButtons";

interface Props {
    seanceId: number,
    ticketsCount: number,
    onSeatClick: (seatId: number) => void,
    onPrevClick: () => void,
    onNextClick: () => void,
    userSeatIds: Array<number>
}

function SeatChoice({seanceId, ticketsCount, onSeatClick, onPrevClick, onNextClick, userSeatIds}: Props) {
    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay seanceId={seanceId} ticketsCount={ticketsCount} onSeatClick={onSeatClick}
                             userSeatIds={userSeatIds}/>
            </style.ContentContainer>
            <NavigationButtons onPrevClick={onPrevClick} onNextClick={onNextClick}/>
        </div>)
}

export default SeatChoice;