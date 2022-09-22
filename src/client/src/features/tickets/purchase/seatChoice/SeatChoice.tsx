import React, {useEffect, useState} from 'react';
import SeatDisplay from "./SeatDisplay/SeatDisplay";
import * as style from './styled';
import Legend from "./Legend/Legend";
import NavigationButtons from "../NavigationButtons/NavigationButtons";
import {useNavigate} from "react-router-dom";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {ChooseSeatRequest, ChooseSeatResponse} from "generated/seance/seance_pb";

interface Props {
    seanceId: number,
    movieId: number,
}

function SeatChoice({seanceId, movieId}: Props) {
    const navigate = useNavigate();
    const [seanceClient, _] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [stream, setStream] = useState<BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse>>();
    
    useEffect(() => {
        let streamTemp = seanceClient.chooseSeat();
        setStream(streamTemp);        
    }, []);
    
    useEffect(() => {
        const request = new ChooseSeatRequest();
        request.setSeanceid(seanceId);
        request.setUserid(1);
        request.setSeatid(8);
        request.setIschosen(true);

        if (stream !== undefined){
            stream?.on("data", (message) => {
                console.log("data");
                console.log(message);
            });
            
            stream.write(request);
        }
        
    }, [stream]);
    
    return (
        <div>
            <style.ContentContainer>
                <Legend/>
                <SeatDisplay seanceId={seanceId}/>
            </style.ContentContainer>
            <NavigationButtons onPrevClick={() => navigate(`/movie/${movieId}/tickets-purchase/${seanceId}/discounts`)}
                               onNextClick={() => navigate(`/movie/${movieId}/tickets-purchase/${seanceId}/purchaseSummary`)}/>
        </div>)
}

export default SeatChoice;