import React from 'react';
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import * as style from './styled';
import Legend from "./Legend/Legend";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {useNavigate} from "react-router-dom";

interface Props {
    seanceId: number,
    movieId: number,
}

function SeatChoice({seanceId, movieId}: Props) {
    const navigate = useNavigate();
    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay/>
            </style.ContentContainer>
            <NavigationButtons onPrevClick={(e) => navigate(`/movie/${movieId}/tickets-purchase/${seanceId}/discounts`)}
                               onNextClick={(e) => navigate(`/movie/${movieId}/tickets-purchase/${seanceId}/purchaseSummary`)}/>
        </div>)
}

export default SeatChoice;