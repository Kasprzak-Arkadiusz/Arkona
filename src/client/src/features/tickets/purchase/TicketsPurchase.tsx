import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import ProgressBar from "./ProgressBar/ProgressBar";
import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import TicketDiscounts from "./discounts/TicketDiscounts";
import SeatChoice from "./seatChoice/SeatChoice";

function TicketPurchase() {
    const {seanceId, action} = useParams();
    const [seanceIdNumber, setSeanceIdNumber] = useState<number>(0);
    const [ticketCount, setTicketCount] = useState<number>(0);
    const [stage, setStage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (seanceId === undefined) {
            navigate("/");
        }

        setSeanceIdNumber(parseInt(seanceId!));
    }, [seanceId]);

    useEffect(() => {
        if (action === "discounts")
        {
            setStage(0);
        } else if (action === "seatChoice")
        {
            setStage(1);
        }
    }, [action]);
    
    const render = () => {
        switch (action) {
            case "discounts":
                return <TicketDiscounts seanceId={seanceIdNumber} onTicketCountChange={(ticketNumber) => {
                    setTicketCount(ticketNumber)
                }}/>
            case "seatChoice":
                return <SeatChoice/>
            default:
                navigate("/")
        }
    }

    return (
        <main className="display-container">
            <SectionContainer minHeight={"720px"} margin={"40px 12px"}>
                <ProgressBar stage={stage}/>
                {render()}
            </SectionContainer>
        </main>
    )
}

export default TicketPurchase;