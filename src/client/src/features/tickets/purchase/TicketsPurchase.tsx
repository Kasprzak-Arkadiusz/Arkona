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
    const [ticketCount, setTicketCount] = useState<number>(0);
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

    const render = () => {
        switch (action) {
            case "discounts":
                return <TicketDiscounts movieId={movieIdNumber} seanceId={seanceIdNumber}
                                        onTicketCountChange={(ticketNumber) => {
                                            setTicketCount(ticketNumber)
                                        }}/>
            case "seatChoice":
                return <SeatChoice seanceId={seanceIdNumber} movieId={movieIdNumber}/>
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