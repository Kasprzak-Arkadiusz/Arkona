import React, {useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import ProgressBar from "./ProgressBar/ProgressBar";
import * as style from "./styled";
import {useParams} from "react-router";

function TicketPurchase() {
    const {seanceId} = useParams();
    console.log(seanceId);
    const maxTicketCount = 16;
    const minTicketCount = 0;
    const [ticketCount, setTicketCount] = useState<number>(0);

    return (
        <main className="display-container">
            <SectionContainer minHeight={"720px"} margin={"40px 12px"}>
                <ProgressBar/>
                <style.TicketNumberContainer>
                    <style.TicketNumberLabel>Wybierz liczbę biletów:</style.TicketNumberLabel>
                    <style.CounterContainer>
                        <style.IncrementButton isVisible={ticketCount !== maxTicketCount} onClick={() => {
                            if (ticketCount < maxTicketCount) {
                                setTicketCount(prevState => prevState + 1);
                            }
                        }}/>
                        <style.CounterNumberSpan>{ticketCount}</style.CounterNumberSpan>
                        <style.DecrementButton isVisible={ticketCount !== minTicketCount} onClick={() => {
                            if (ticketCount > minTicketCount) {
                                setTicketCount(prevState => prevState - 1);
                            }
                        }}/>
                    </style.CounterContainer>

                </style.TicketNumberContainer>
            </SectionContainer>
        </main>
    )
}

export default TicketPurchase;