import React, {useEffect, useState} from 'react';
import * as style from './styled';
import SeatItem from "./SeatItem";
import {SeanceClient} from "generated/seance/seance_pb_service";
import {CinemaHallSection, GetSeatsBySeanceRequest, SeanceSeatSection} from "generated/seance/seance_pb";

interface Props {
    seanceId: number
}

function SeatDisplay({seanceId}: Props) {
    console.log(seanceId)
    const [seanceIdNumber, setSeanceIdNumber] = useState<number>(0);
    const [seanceClient, _] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [seanceSeatSection, setSeanceSeatSection] = useState<Array<SeanceSeatSection>>(new Array<SeanceSeatSection>());
    const [numberOfRows, setNumberOfRows] = useState<number>(0);

    useEffect(() => {
        setSeanceIdNumber(seanceId);
    }, [seanceId]);
    
    useEffect(() => {
        const request = new GetSeatsBySeanceRequest();
        request.setSeanceid(seanceIdNumber);

        seanceClient.getSeatsBySeance(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setNumberOfRows(responseMessage.getNumberofrows());
                setSeanceSeatSection(responseMessage.getSectionsList());
            }
        });
    }, [seanceIdNumber]);

    const getRowLabels = (n: number): Array<JSX.Element> => {
        const array = new Array<JSX.Element>();
        let char = 'A';

        for (let i = 0; i < n; i++) {
            array.push(<style.RowLabel key={char}>{char}</style.RowLabel>)
            char = String.fromCharCode(char.charCodeAt(0) + 1)
        }

        return array;
    }

    return (
        <style.ContentContainer>
            <style.Title>Wybierz miejsca</style.Title>
            <style.Screen>Ekran</style.Screen>
            <style.SeatDisplayContainer>
                <style.RowLabelsContainer>
                    {getRowLabels(numberOfRows)}
                </style.RowLabelsContainer>
                {
                    seanceSeatSection.map(item => {
                            switch (item.getSection()) {
                                case CinemaHallSection.LEFT: {
                                    return (
                                        <style.LeftSection key={CinemaHallSection.LEFT} width={item.getWidth()}>
                                            {item.getSeatsList().map(seat => {
                                                return <SeatItem key={seat.getId()} isFree={seat.getIsfree()}/>
                                            })}
                                        </style.LeftSection>
                                    )
                                }
                                case CinemaHallSection.MIDDLE: {
                                    return (
                                        <style.MiddleSection key={CinemaHallSection.MIDDLE} width={item.getWidth()}>
                                            {item.getSeatsList().map(seat => {
                                                return <SeatItem key={seat.getId()} isFree={seat.getIsfree()}/>
                                            })}
                                        </style.MiddleSection>
                                    )
                                }
                                case CinemaHallSection.RIGHT: {
                                    return (
                                        <style.RightSection key={CinemaHallSection.RIGHT} width={item.getWidth()}>
                                            {item.getSeatsList().map(seat => {
                                                return <SeatItem key={seat.getId()} isFree={seat.getIsfree()}/>
                                            })}
                                        </style.RightSection>
                                    )
                                }
                            }
                        }
                    )
                }
            </style.SeatDisplayContainer>
        </style.ContentContainer>
    )
}

export default SeatDisplay;