import React, {useEffect, useRef, useState} from 'react';
import * as style from './styled';
import SeatItem from "./SeatItem";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {
    ChooseSeatRequest,
    ChooseSeatResponse,
    CinemaHallSection,
    GetSeatsBySeanceRequest,
    SeanceSeatSection
} from "generated/seance/seance_pb";
import DisabledSeatItem from "./SeatItemDisabled";
import {useUserId} from "hooks/useUserId";
import {deepCopy, Dictionary, toDictionary} from "utils/dictionaryUtils";
import {SeatInfo} from "utils/CustomTypes/SeatInfo";

interface Props {
    seanceId: number
    ticketsCount: number
    closeStreamIndicator: number
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

function SeatDisplay({seanceId, ticketsCount, closeStreamIndicator}: Props) {
    const [seanceClient,] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [sections, _setSections] = useState<SeanceSeatSection[]>(new Array<SeanceSeatSection>());
    const sectionsRef = useRef(sections);

    const [leftSeatsState, _setLeftSeatsState] = useState<Dictionary<SeatInfo>>(new Dictionary<SeatInfo>());
    const [middleSeatsState, _setMiddleSeatsState] = useState<Dictionary<SeatInfo>>(new Dictionary<SeatInfo>());
    const [rightSeatsState, _setRightSeatsState] = useState<Dictionary<SeatInfo>>(new Dictionary<SeatInfo>());
    const [sectionWidthState, setSectionWidthState] = useState<Dictionary<number>>(new Dictionary<number>());

    const leftSeatsRef = useRef(leftSeatsState);
    const middleSeatsRef = useRef(middleSeatsState);
    const rightSeatsRef = useRef(rightSeatsState);

    const [userId,] = useState<string>(useUserId());
    const [numberOfSelectedSeats, setNumberOfSelectedSeats] = useState<number>(0);
    const [maxNumberOfSeats, ] = useState<number>(ticketsCount);
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
    
    useEffect(() => {
        if (stream !== undefined){
            stream.on("data", handleDataStream);
            const request = new ChooseSeatRequest();
            request.setSeanceid(seanceId);
            request.setUserid(userId);

            stream.write(request);
        }
        
        if (stream !== undefined) {
            return () => {
                stream?.cancel();
                setStream(undefined);
            }
        }
    }, [stream]);
    
    function setSections(sectionsUpdated: Array<SeanceSeatSection>) {
        sectionsRef.current = sectionsUpdated;
        const defaultUserId = "0";
        const sectionWidthDictionary = new Dictionary<number>();

        sectionsUpdated.forEach(section => {
            switch (section.getSection()) {
                case CinemaHallSection.LEFT: {
                    setLeftSeatsState(toDictionary<SeatInfo>(section.getSeatsList().map(item => {
                        return {
                            key: item.getId(),
                            value: new SeatInfo(item.getNumber(), item.getIsfree(), defaultUserId)
                        };
                    })));
                    sectionWidthDictionary.values[CinemaHallSection.LEFT] = section.getWidth();
                    break;
                }
                case CinemaHallSection.MIDDLE: {
                    setMiddleSeatsState(toDictionary<SeatInfo>(section.getSeatsList().map(item => {
                        return {
                            key: item.getId(),
                            value: new SeatInfo(item.getNumber(), item.getIsfree(), defaultUserId)
                        };
                    })));
                    sectionWidthDictionary.values[CinemaHallSection.MIDDLE] = section.getWidth();
                    break;
                }
                case CinemaHallSection.RIGHT: {
                    setRightSeatsState(toDictionary<SeatInfo>(section.getSeatsList().map(item => {
                        return {
                            key: item.getId(),
                            value: new SeatInfo(item.getNumber(), item.getIsfree(), defaultUserId)
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
        if (message === undefined) {
            return;
        }

        const seatId = message.getSeatid();

        let seat = leftSeatsRef.current.values[seatId];
        if (seat !== undefined) {
            seat.isFree = message.getIsfree();
            const newDictionary = deepCopy<SeatInfo>(leftSeatsRef.current);
            setLeftSeatsState(newDictionary);
            return;
        }

        seat = middleSeatsRef.current.values[seatId]
        if (seat !== undefined) {
            seat.isFree = message.getIsfree();
            const newDictionary = deepCopy<SeatInfo>(middleSeatsRef.current);
            setMiddleSeatsState(newDictionary);
            return;
        }

        seat = rightSeatsRef.current.values[seatId]
        if (seat !== undefined) {
            seat.isFree = message.getIsfree();
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
            stream.write(request);

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
                    array.push(seat.isFree ?
                        <SeatItem key={seatId} seatId={seatId}
                                  occupiedByUserId={seat.userId}
                                  onClickHandler={handleSeatClick}/> :
                        <DisabledSeatItem key={seatId}/>)
                }
                break;
            }
            case CinemaHallSection.MIDDLE: {
                for (let key in middleSeatsRef.current.values) {
                    const seatId = parseInt(key);
                    const seat = middleSeatsRef.current.values[key];
                    array.push(seat.isFree ?
                        <SeatItem key={seatId} seatId={seatId}
                                  occupiedByUserId={seat.userId}
                                  onClickHandler={handleSeatClick}/> :
                        <DisabledSeatItem key={seatId}/>)
                }
                break;
            }
            case CinemaHallSection.RIGHT: {
                for (let key in rightSeatsRef.current.values) {
                    const seatId = parseInt(key);
                    const seat = rightSeatsRef.current.values[key];
                    array.push(seat.isFree ?
                        <SeatItem key={seatId} seatId={seatId}
                                  occupiedByUserId={seat.userId}
                                  onClickHandler={handleSeatClick}/> :
                        <DisabledSeatItem key={seatId}/>)
                }
                break;
            }
        }
        return array
    }

    return (
        <style.ContentContainer>
            <style.Title>Wybierz miejsca: {ticketsCount}</style.Title>
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