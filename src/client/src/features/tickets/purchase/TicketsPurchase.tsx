import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import ProgressBar from "./ProgressBar/ProgressBar";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import TicketDiscounts from "./discounts/TicketDiscounts";
import SeatChoice from "./seatChoice/SeatChoice";
import PurchaseSummary from "./purchaseSummary/PurchaseSummary";

function TicketPurchase() {
    const {id, seanceId, action} = useParams();
    const [seanceIdNumber, setSeanceIdNumber] = useState<number>(0);
    const [movieIdNumber, setMovieIdNumber] = useState<number>(0);
    const [ticketsCount, setTicketsCount] = useState<number>(0);
    const [userSeatIds, setUserSeatIds] = useState<Array<number>>(new Array<number>());
    const [stage, setStage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (seanceId === undefined || id === undefined) {
            navigate("/");
        }

        setMovieIdNumber(parseInt(id!));
        setSeanceIdNumber(parseInt(seanceId!));

    }, [seanceId]);

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
                                   onNextClick={onNextButtonClick} userSeatIds={userSeatIds}/>
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