import React, {useEffect, useState} from 'react';
import * as style from "./styled";
import {SeanceClient} from "generated/seance/seance_pb_service";
import {GetSeanceDetailsRequest, GetSeanceDetailsResponse} from "generated/seance/seance_pb";

interface Props {
    seanceId: number;
}

function SeanceSection({seanceId}: Props) {
    const [seanceClient, _] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [seanceDetails, setSeanceDetails] = useState<GetSeanceDetailsResponse>(new GetSeanceDetailsResponse());

    useEffect(() => {
        if (seanceId !== 0) {
            const request = new GetSeanceDetailsRequest();
            request.setSeanceid(seanceId);

            seanceClient.getSeanceDetails(request, (error, responseMessage) => {
                if (responseMessage !== null && responseMessage !== undefined) {
                    setSeanceDetails(responseMessage);
                }
            });
        }
    }, [seanceId]);

    return (
        <style.SectionContainer>
            <style.SectionTitle>Seans:</style.SectionTitle>
            <style.SectionDetailsContainer textAlign={"center"}>
                <style.DetailContainer>
                    <style.DetailsLabel>Tytuł:</style.DetailsLabel>
                    <style.DetailsText>{seanceDetails.getMovietitle()}</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Data:</style.DetailsLabel>
                    <style.DetailsText>{seanceDetails.getSeancedate()}</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Godzina:</style.DetailsLabel>
                    <style.DetailsText>{seanceDetails.getSeancetime()}</style.DetailsText>
                </style.DetailContainer>
                <style.DetailContainer>
                    <style.DetailsLabel>Numer sali:</style.DetailsLabel>
                    <style.DetailsText>{seanceDetails.getHallnumber()}</style.DetailsText>
                </style.DetailContainer>
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default SeanceSection;