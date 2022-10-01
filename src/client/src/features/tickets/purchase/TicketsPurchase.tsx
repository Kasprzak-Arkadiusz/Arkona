import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import ProgressBar from "./ProgressBar/ProgressBar";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import TicketDiscounts from "./discounts/TicketDiscounts";
import SeatChoice from "./seatChoice/SeatChoice";
import PurchaseSummary from "./purchaseSummary/PurchaseSummary";
import {BidirectionalStream, SeanceClient} from "generated/seance/seance_pb_service";
import {ChooseSeatRequest, ChooseSeatResponse} from "generated/seance/seance_pb";
import {clearUserId, useUserId} from "hooks/useUserId";

function TicketPurchase() {
    const {id, seanceId, action} = useParams();
    const [seanceIdNumber, setSeanceIdNumber] = useState<number>(0);
    const [movieIdNumber, setMovieIdNumber] = useState<number>(0);
    
    const [ticketsCount, setTicketsCount] = useState<number>(0);
    const [userSeatIds, setUserSeatIds] = useState<Array<number>>(new Array<number>());

    const [stage, setStage] = useState<number>(0);
    const [seanceClient,] = useState<SeanceClient>(new SeanceClient(process.env.REACT_APP_SERVER_URL!));
    const [stream, setStream] = useState<BidirectionalStream<ChooseSeatRequest, ChooseSeatResponse>>();
    const navigate = useNavigate();

    useEffect(() => {
        if (seanceId === undefined || id === undefined) {
            navigate("/");
        }

        setMovieIdNumber(parseInt(id!));
        setSeanceIdNumber(parseInt(seanceId!));

        let streamTemp = seanceClient.chooseSeat();
        setStream(streamTemp);
    }, [seanceId]);

    useEffect(() => {
        if (stream !== undefined) {
            return () => {
                stream?.cancel();
                setStream(undefined);
                clearUserId();
            }
        }
    }, [stream])

    useEffect(() => {
        if (action === "discounts") {
            setStage(0);
        } else if (action === "seatChoice") {
            setStage(1);
        } else if (action === "purchaseSummary") {
            setStage(2);
        }
    }, [action]);

    const handleSeatClick = (seatId: number) => {
        const userSeatIdIndex = userSeatIds.findIndex(item => {
            return item === seatId;
        });

        if (userSeatIdIndex === -1) {
            setUserSeatIds([...userSeatIds, seatId]);
        } else {
            userSeatIds.splice(userSeatIdIndex, 1);
            setUserSeatIds(userSeatIds);
        }
    }

    const onPrevButtonClick = () => {
        setUserSeatIds(new Array<number>());
        navigate(`/movie/${movieIdNumber}/tickets-purchase/${seanceId}/discounts`)
    }

    const onNextButtonClick = () => {
        navigate(`/movie/${movieIdNumber}/tickets-purchase/${seanceId}/purchaseSummary`);
    }

    const render = () => {
        switch (action) {
            case "discounts":
                return <TicketDiscounts movieId={movieIdNumber} seanceId={seanceIdNumber} ticketsCount={ticketsCount}
                                        onTicketCountChange={(ticketNumber) => {
                                            setTicketsCount(ticketNumber)
                                        }}/>
            case "seatChoice":
                return <SeatChoice seanceId={seanceIdNumber} ticketsCount={ticketsCount}
                                   onSeatClick={handleSeatClick} onPrevClick={onPrevButtonClick}
                                   onNextClick={onNextButtonClick} userSeatIds={userSeatIds} seanceClient={seanceClient}
                                   stream={stream}/>
            case "purchaseSummary":
                return <PurchaseSummary/>
            default:
                navigate("/")
        }
    }

    return (
        <main className="display-container">
            <SectionContainer minHeight={"auto"} margin={"40px 12px"}>
                <ProgressBar stage={stage}/>
                {render()}
            </SectionContainer>
        </main>
    )
}

export default TicketPurchase;