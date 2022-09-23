import React, {useEffect, useRef, useState} from 'react';
import * as style from './styled';
import SeatItem from "./SeatItem";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {
    ChooseSeatRequest,
    ChooseSeatResponse,
    CinemaHallSection,
    GetSeatsBySeanceRequest,
    SeanceSeatInfo, SeanceSeatSection
} from "generated/seance/seance_pb";
import DisabledSeatItem from "./SeatItemDisabled";
import {toBoolean} from "utils/dataTypeUtils";

interface Props {
    seanceId: number
}

const getRowLabels = (n: number): Array<JSX.Element> => {
    const array = new Array<JSX.Element>();
    let char = 'A';

    for (let i = 0; i < n; i++) {
        array.push(<style.RowLabel key={char}>{char}</style.RowLabel>)
        char = String.fromCharCode(char.charCodeAt(0) + 1)
    }

    return array;
}

function SeatDisplay({seanceId}: Props) {
    const [seanceClient, _] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [sections, _setSections] = useState<SeanceSeatSection[]>(new Array<SeanceSeatSection>());
    const sectionsRef = useRef(sections);
    const [numberOfRows, setNumberOfRows] = useState<number>(0);
    const [stream, setStream] = useState<BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse>>();
    
    useEffect(() => {
        let streamTemp = seanceClient.chooseSeat();
        setStream(streamTemp);
    }, []);

    useEffect(() => {
        if (seanceId !== 0) {
            const request = new GetSeatsBySeanceRequest();
            request.setSeanceid(seanceId);

            seanceClient.getSeatsBySeance(request, (error, responseMessage) => {
                if (responseMessage !== null && responseMessage !== undefined) {
                    setSections(responseMessage.getSectionsList());
                    setNumberOfRows(responseMessage.getNumberofrows());
                }
            });
        }
    }, [seanceId]);

    function setSections(sectionsUpdated: Array<SeanceSeatSection>) {
        sectionsRef.current = sectionsUpdated;
        _setSections(sectionsUpdated);
    }

    useEffect(() => {
        stream?.on("data", handleDataStream);
        const request = new ChooseSeatRequest();
        request.setSeanceid(seanceId);
        request.setUserid(1);
        
        stream?.write(request);
    }, [stream]);

    const handleDataStream = (message?: ChooseSeatResponse) => {
        console.log("data");
        console.log(message);

        if (message === undefined) {
            return;
        }

        const seats = sectionsRef.current.reduce((acc, value) =>
            acc.concat(value.getSeatsList()), new Array<SeanceSeatInfo>());

        const changedSeat = seats.find(item => message.getSeatid() === item.getId());
        if (changedSeat !== undefined) {
            changedSeat.setIsfree(toBoolean(message.getIsfree()));
            const ChangedSeatState = changedSeat.getIsfree();
        }
    }

    const handleSeatClick = (seatId: number, userId: string, seatState: boolean) => {
        if (stream !== undefined) {
            const request = new ChooseSeatRequest();
            request.setSeanceid(seanceId);
            request.setUserid(1);
            request.setSeatid(seatId);

            request.setIschosen(seatState);
            stream.write(request);
        }
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
                    sections.map(item => {
                            switch (item.getSection()) {
                                case CinemaHallSection.LEFT: {
                                    return (
                                        <style.LeftSection key={CinemaHallSection.LEFT} width={item.getWidth()}>
                                            {item.getSeatsList().map(seat => {
                                                return seat.getIsfree() ?
                                                    <SeatItem key={seat.getId()} seatId={seat.getId()}
                                                              occupiedByUserId={"1"}
                                                              onClickHandler={handleSeatClick}/> :
                                                    <DisabledSeatItem key={seat.getId()}/>
                                            })
                                            }
                                        </style.LeftSection>
                                    )
                                }
                                case CinemaHallSection.MIDDLE: {
                                    return (
                                        <style.MiddleSection key={CinemaHallSection.MIDDLE} width={item.getWidth()}>
                                            {item.getSeatsList().map(seat => {
                                                return seat.getIsfree() ?
                                                    <SeatItem key={seat.getId()} seatId={seat.getId()}
                                                              occupiedByUserId={"1"}
                                                              onClickHandler={handleSeatClick}/> :
                                                    <DisabledSeatItem key={seat.getId()}/>
                                            })
                                            }
                                        </style.MiddleSection>
                                    )
                                }
                                case CinemaHallSection.RIGHT: {
                                    return (
                                        <style.RightSection key={CinemaHallSection.RIGHT} width={item.getWidth()}>
                                            {item.getSeatsList().map(seat => {
                                                return seat.getIsfree() ?
                                                    <SeatItem key={seat.getId()} seatId={seat.getId()}
                                                              occupiedByUserId={"1"}
                                                              onClickHandler={handleSeatClick}/> :
                                                    <DisabledSeatItem key={seat.getId()}/>
                                            })
                                            }
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