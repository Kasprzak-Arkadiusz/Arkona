import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import IconTitle from "components/IconTitle/IconTitle";
import {ProjectorIcon} from "assets/icons/Projector/Projector"
import DayOfWeekItem from "./DayOfWeekItem";
import * as style from "./styled";
import {SeanceClient} from "generated/seance/seance_pb_service";
import {GetClosestSeancesRequest, GetClosestSeancesResponse} from "generated/seance/seance_pb";

interface Props {
    movieId: number
}

function ClosestSeances({movieId}: Props) {
    const [seanceClient, _] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [seances, setSeances] = useState<GetClosestSeancesResponse>(new GetClosestSeancesResponse());

    useEffect(() => {
        const request = new GetClosestSeancesRequest();
        request.setMovieid(movieId);

        seanceClient.getClosestSeances(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setSeances(responseMessage);
            }
        });
    }, []);

    return (
        <SectionContainer minHeight={"auto"} margin={"40px 12px"}>
            <IconTitle title={"Najblizsze seanse"} Component={ProjectorIcon} height={"24px"} width={"24px"}/>
            {seances.getValuesList().length !== 0 ? <style.ContentContainer>
                    {seances.getValuesList().map((item) => {
                        return <DayOfWeekItem dayOfWeek={item.getKey()} seanceDetails={item.getSeancesList()}/>
                    })}
                </style.ContentContainer> :
                <style.NoSeancesAvailableSpan>Brak seansów dla tego filmu</style.NoSeancesAvailableSpan>}

        </SectionContainer>
    )
}

export default ClosestSeances;