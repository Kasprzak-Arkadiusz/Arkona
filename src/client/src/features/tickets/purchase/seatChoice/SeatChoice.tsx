import React, {useEffect, useState} from 'react';
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import * as style from './styled';
import Legend from "./Legend/Legend";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {useNavigate} from "react-router-dom";

interface Props {
    seanceId: number,
    movieId: number,
    ticketsCount: number
}

function SeatChoice({seanceId, movieId, ticketsCount}: Props) {
    const [movieIdState, setMovieIdState] = useState<number>(0);
    const [closeStreamIndicator, closeStream] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        setMovieIdState(movieId);
    }, [movieId]);

    useEffect(()=> {
        console.log(closeStreamIndicator);
    }, [closeStreamIndicator]);
    
    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay seanceId={seanceId} ticketsCount={ticketsCount} closeStreamIndicator={closeStreamIndicator}/>
            </style.ContentContainer>
            <NavigationButtons onPrevClick={() => {
                                    console.log("Prev -> Requested to update closeStreamIndicator");
                                    closeStream(prevState => prevState + 1);
                                    navigate(`/movie/${movieIdState}/tickets-purchase/${seanceId}/discounts`);
                                }}
                               onNextClick={() => {
                                   console.log("Next -> Requested to update closeStreamIndicator");
                                   closeStream(prevState => prevState + 1);
                                   navigate(`/movie/${movieIdState}/tickets-purchase/${seanceId}/purchaseSummary`);
                               }}/>
        </div>)
}

export default SeatChoice;