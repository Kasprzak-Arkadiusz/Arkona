import React from 'react';
import * as style from './styled'
import * as mainStyle from '../styled';
import Counter from "components/Counter/Counter";
import {TicketDiscountsDetails} from "generated/ticketDiscount/ticketDiscount_pb";

interface Props {
    details: TicketDiscountsDetails
    isTransparent?: boolean;
    onChangeHandler: (discountId: number, ticketsCount: number) => void;
    initialNumberOfTickets: number;
}

function AvailableDiscountItem({details, isTransparent = false, onChangeHandler, initialNumberOfTickets}: Props) {
    const onCounterChange = (ticketsCount: number) => {
        onChangeHandler(details.getId(), ticketsCount);
    }

    return (
        <style.AvailableDiscountItemContainer isTransparent={isTransparent}>
            <Counter onChange={onCounterChange} margin={"0px 19px 0px 0px"} initialTicketCount={initialNumberOfTickets}/>
            <mainStyle.InformationContainer>
                <mainStyle.Title>{details.getName() + " " + details.getDiscountvalue()}</mainStyle.Title>
                <mainStyle.Description>{details.getDescription()}</mainStyle.Description>
            </mainStyle.InformationContainer>
        </style.AvailableDiscountItemContainer>
    )
}

export default AvailableDiscountItem;