import React, {useEffect, useRef, useState} from 'react';
import * as style from './styled';
import SeatItem from "./SeatItem";
import {
    ChooseSeatRequest,
    ChooseSeatResponse,
    CinemaHallSection,
    GetSeatsBySeanceRequest,
    SeanceSeatSection
} from "generated/seance/seance_pb";
import DisabledSeatItem from "./SeatItemDisabled";
import {deepCopy, Dictionary, toDictionary} from "utils/dictionaryUtils";
import {SeatInfo} from "utils/CustomTypes/SeatInfo";
import {BidirectionalStream, SeanceClient} from 'generated/seance/seance_pb_service';
import {useUserId} from "hooks/useUserId";
import {useJwtMetadata} from "hooks/useJwtMetadata";

interface Props {
    seanceId: number,
    ticketsCount: number,
    onSeatClick: (seatId: number) => void,
    seanceClient: SeanceClient,
    selectedSeats: Array<number>,
    stream: BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse> | undefined,
    errorMessage: string | undefined,
    onHandledSet: () => boolean
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

function SeatDisplay({
                         seanceId,
                         ticketsCount,
                         onSeatClick,
                         seanceClient,
                         selectedSeats,
                         stream,
                         errorMessage,
                         onHandledSet
                     }: Props) {
    const [sections, _setSections] = useState<SeanceSeatSection[]>(new Array<SeanceSeatSection>());
    const sectionsRef = useRef(sections);
    const [userId,] = useState<string>(useUserId());

    const [leftSeatsState, _setLeftSeatsState] = useState<Dictionary<SeatInfo>>(new Dictionary<SeatInfo>());
    const [middleSeatsState, _setMiddleSeatsState] = useState<Dictionary<SeatInfo>>(new Dictionary<SeatInfo>());
    const [rightSeatsState, _setRightSeatsState] = useState<Dictionary<SeatInfo>>(new Dictionary<SeatInfo>());
    const [sectionWidthState, setSectionWidthState] = useState<Dictionary<number>>(new Dictionary<number>());

    const leftSeatsRef = useRef(leftSeatsState);
    const middleSeatsRef = useRef(middleSeatsState);
    const rightSeatsRef = useRef(rightSeatsState);

    const [numberOfSelectedSeats, setNumberOfSelectedSeats] = useState<number>(selectedSeats.length);
    const [maxNumberOfSeats,] = useState<number>(ticketsCount);
    const [numberOfRows, setNumberOfRows] = useState<number>(0);
    const [streamRegistered, setStreamRegistered] = useState<boolean>(false);
    const [databaseStateLoaded, setDatabaseStateLoaded] = useState<boolean>(false);
    const metadata = useJwtMetadata();

    useEffect(() => {
        return () => {
            setStreamRegistered(false);
        }
    }, []);

    useEffect(() => {
        if (seanceId !== 0) {
            const request = new GetSeatsBySeanceRequest();
            request.setSeanceid(seanceId);

            console.log("Getting seat state from database");

            seanceClient.getSeatsBySeance(request, metadata, (error, responseMessage) => {
                if (responseMessage !== null && responseMessage !== undefined) {
                    console.log("Received seat state from database")
                    setSections(responseMessage.getSectionsList());
                    setNumberOfRows(responseMessage.getNumberofrows());
                }
            });
        }
    }, [seanceId]);

    useEffect(() => {
        if (stream !== undefined && databaseStateLoaded) {
            console.log("Stream on data registered")
            if (!onHandledSet()) {
                stream.on("data", handleDataStream)
            }
            setStreamRegistered(true);
        }
    }, [stream, databaseStateLoaded]);

    useEffect(() => {
        if (sections.length !== 0) {
            console.log("Database state loaded");
            setDatabaseStateLoaded(true);
        }
    }, [sections])

    useEffect(() => {
        if (streamRegistered) {
            console.log("Requesting to make up changes")
            const request = new ChooseSeatRequest();
            request.setSeanceid(seanceId);
            request.setUserid(userId);
            request.setMakeupchanges(true);
            stream!.write(request);
        }
    }, [streamRegistered]);

    function setSections(sectionsUpdated: Array<SeanceSeatSection>) {
        sectionsRef.current = sectionsUpdated;
        const sectionWidthDictionary = new Dictionary<number>();

        sectionsUpdated.forEach(section => {
            switch (section.getSection()) {
                case CinemaHallSection.LEFT: {
                    setLeftSeatsState(toDictionary<SeatInfo>(section.getSeatsList().map(item => {
                        return {
                            key: item.getId(),
                            value: new SeatInfo(item.getNumber(), item.getIsfree(), !item.getIsfree())
                        };
                    })));
                    sectionWidthDictionary.values[CinemaHallSection.LEFT] = section.getWidth();
                    break;
                }
                case CinemaHallSection.MIDDLE: {
                    setMiddleSeatsState(toDictionary<SeatInfo>(section.getSeatsList().map(item => {
                        return {
                            key: item.getId(),
                            value: new SeatInfo(item.getNumber(), item.getIsfree(), !item.getIsfree())
                        };
                    })));
                    sectionWidthDictionary.values[CinemaHallSection.MIDDLE] = section.getWidth();
                    break;
                }
                case CinemaHallSection.RIGHT: {
                    setRightSeatsState(toDictionary<SeatInfo>(section.getSeatsList().map(item => {
                        return {
                            key: item.getId(),
                            value: new SeatInfo(item.getNumber(), item.getIsfree(), !item.getIsfree())
                        };
                    })));
                    sectionWidthDictionary.values[CinemaHallSection.RIGHT] = section.getWidth();
                    break;
                }
            }
        })
        setSectionWidthState(sectionWidthDictionary);
        _setSections(sectionsUpdated);
    }

    function setLeftSeatsState(leftSeatsStateUpdated: Dictionary<SeatInfo>) {
        leftSeatsRef.current = leftSeatsStateUpdated;
        _setLeftSeatsState(leftSeatsStateUpdated);
    }

    function setMiddleSeatsState(middleSeatsStateUpdated: Dictionary<SeatInfo>) {
        middleSeatsRef.current = middleSeatsStateUpdated;
        _setMiddleSeatsState(middleSeatsStateUpdated);
    }

    function setRightSeatsState(rightSeatsStateUpdated: Dictionary<SeatInfo>) {
        rightSeatsRef.current = rightSeatsStateUpdated;
        _setRightSeatsState(rightSeatsStateUpdated);
    }

    const handleDataStream = (message?: ChooseSeatResponse) => {
        console.log("Handling data stream: ", message);
        if (message === undefined) {
            return;
        }

        const seatId = message.getSeatid();

        let seat = leftSeatsRef.current.values[seatId];
        if (seat !== undefined) {

            seat.isFree = message.getIsfree();
            seat.setUserId(message.getUserid());
            const newDictionary = deepCopy<SeatInfo>(leftSeatsRef.current);
            setLeftSeatsState(newDictionary);
            return;
        }

        seat = middleSeatsRef.current.values[seatId]
        if (seat !== undefined) {
            seat.isFree = message.getIsfree();
            seat.setUserId(message.getUserid());
            const newDictionary = deepCopy<SeatInfo>(middleSeatsRef.current);
            setMiddleSeatsState(newDictionary);
            return;
        }

        seat = rightSeatsRef.current.values[seatId]
        if (seat !== undefined) {
            seat.isFree = message.getIsfree();
            seat.setUserId(message.getUserid());
            const newDictionary = deepCopy<SeatInfo>(rightSeatsRef.current);
            setRightSeatsState(newDictionary);
            return;
        }
    }

    const handleSeatClick = (seatId: number, userId: string, seatState: boolean): boolean => {
        let currentNumberOfSelectedSeats = numberOfSelectedSeats;
        if (seatState) {
            currentNumberOfSelectedSeats++;
        } else {
            currentNumberOfSelectedSeats--;
        }

        if (currentNumberOfSelectedSeats > maxNumberOfSeats) {
            return false;
        }

        if (stream !== undefined) {
            const request = new ChooseSeatRequest();
            request.setSeanceid(seanceId);
            request.setUserid(userId);
            request.setSeatid(seatId);
            request.setIschosen(seatState);
            request.setMakeupchanges(false);
            console.log("Sending request for choosing seat: ", request.toObject());

            stream.write(request);

            onSeatClick(seatId);
            setNumberOfSelectedSeats(currentNumberOfSelectedSeats);

            return true;
        }

        return false;
    }

    const renderSeatSections = (section: 0 | 1 | 2): Array<JSX.Element> => {
        const array = new Array<JSX.Element>();
        switch (section) {
            case CinemaHallSection.LEFT: {
                for (let key in leftSeatsRef.current.values) {
                    const seatId = parseInt(key);
                    const seat = leftSeatsRef.current.values[key];
                    array.push(seat.isTakenInDatabase ?
                        <DisabledSeatItem key={seatId}/> :
                        <SeatItem key={seatId} seatId={seatId} isFree={seat.isFree}
                                  occupiedByUserId={seat.userId}
                                  onClickHandler={handleSeatClick}/>
                    )
                }
                break;
            }
            case CinemaHallSection.MIDDLE: {
                for (let key in middleSeatsRef.current.values) {
                    const seatId = parseInt(key);
                    const seat = middleSeatsRef.current.values[key];
                    array.push(seat.isTakenInDatabase ?
                        <DisabledSeatItem key={seatId}/> :
                        <SeatItem key={seatId} seatId={seatId} isFree={seat.isFree}
                                  occupiedByUserId={seat.userId}
                                  onClickHandler={handleSeatClick}/>
                    )
                }
                break;
            }
            case CinemaHallSection.RIGHT: {
                for (let key in rightSeatsRef.current.values) {
                    const seatId = parseInt(key);
                    const seat = rightSeatsRef.current.values[key];
                    array.push(seat.isTakenInDatabase ?
                        <DisabledSeatItem key={seatId}/> :
                        <SeatItem key={seatId} seatId={seatId} isFree={seat.isFree}
                                  occupiedByUserId={seat.userId}
                                  onClickHandler={handleSeatClick}/>
                    )
                }
                break;
            }
        }
        console.log("Seat section re-rendered");
        return array
    }

    return (
        <style.ContentContainer>
            <style.Title>Wybierz miejsca: {ticketsCount}</style.Title>
            {errorMessage && <style.ErrorMessage>{errorMessage}</style.ErrorMessage>}
            <style.Screen>Ekran</style.Screen>
            <style.SeatDisplayContainer>
                <style.RowLabelsContainer>
                    {getRowLabels(numberOfRows)}
                </style.RowLabelsContainer>
                <style.LeftSection key={CinemaHallSection.LEFT}
                                   width={sectionWidthState.values[CinemaHallSection.LEFT]}>
                    {renderSeatSections(CinemaHallSection.LEFT)}
                </style.LeftSection>
                <style.MiddleSection key={CinemaHallSection.MIDDLE}
                                     width={sectionWidthState.values[CinemaHallSection.MIDDLE]}>
                    {renderSeatSections(CinemaHallSection.MIDDLE)}
                </style.MiddleSection>
                <style.RightSection key={CinemaHallSection.RIGHT}
                                    width={sectionWidthState.values[CinemaHallSection.RIGHT]}>
                    {renderSeatSections(CinemaHallSection.RIGHT)}
                </style.RightSection>
            </style.SeatDisplayContainer>
        </style.ContentContainer>
    )
}

export default SeatDisplay;