import React, {useEffect, useState} from 'react';
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
    const [movieIdState, setMovieIdState] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        setMovieIdState(movieId);
    }, [movieId]);
    
    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay seanceId={seanceId}/>
            </style.ContentContainer>
            <NavigationButtons onPrevClick={() => navigate(`/movie/${movieIdState}/tickets-purchase/${seanceId}/discounts`)}
                               onNextClick={() => navigate(`/movie/${movieIdState}/tickets-purchase/${seanceId}/purchaseSummary`)}/>
        </div>)
}

export default SeatChoice;