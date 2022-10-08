import React, {useState} from 'react'
import * as style from './styled';

interface Props{
    initialTicketCount?: number;
    minTicketCount?: number;
    maxTicketCount?: number;
    onChange: (newTicketCount: number) => void;
    margin?: string;
}

function Counter({initialTicketCount = 0, minTicketCount = 0, maxTicketCount = 8, onChange, margin}: Props){
    const [ticketCount, setTicketCount] = useState<number>(initialTicketCount);
    return (
        <style.CounterContainer margin={margin}>
            <style.IncrementButton isVisible={ticketCount !== maxTicketCount} onClick={() => {
                if (ticketCount < maxTicketCount) {
                    onChange(ticketCount + 1);
                    setTicketCount(prevState => prevState + 1);
                }
            }}/>
            <style.CounterNumberSpan>{ticketCount}</style.CounterNumberSpan>
            <style.DecrementButton isVisible={ticketCount !== minTicketCount} onClick={() => {
                if (ticketCount > minTicketCount) {
                    onChange(ticketCount - 1);
                    setTicketCount(prevState => prevState - 1);
                }
            }}/>
        </style.CounterContainer>
    )
}

export default Counter;
