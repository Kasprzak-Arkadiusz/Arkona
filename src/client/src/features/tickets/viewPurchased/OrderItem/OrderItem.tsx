import React from 'react'
import * as style from './styled';
import OrderDetailsItem from "./OrderDetailsItem";
import TicketItem from "./TicketItem";
import {TicketDetails} from "generated/order/order_pb";

interface Props {
    orderNumber: string,
    dateOfPurchase: string,
    movieTitle: string,
    dateOfSeance: string,
    totalPrice: string,
    hallNumber: number
    tickets: Array<TicketDetails>
}

function OrderItem({orderNumber, dateOfPurchase, movieTitle, dateOfSeance, totalPrice, hallNumber, tickets}: Props) {
    return (
        <style.Container>
            <style.OrderDetailsContainer>
                <OrderDetailsItem label={"Nr. zamówienia:"} value={orderNumber}/>
                <OrderDetailsItem label={"Data zakupu:"} value={dateOfPurchase}/>
                <OrderDetailsItem label={"Film:"} value={movieTitle}/>
                <OrderDetailsItem label={"Data seansu:"} value={dateOfSeance}/>
                <OrderDetailsItem label={"Cena:"} value={totalPrice}/>
                <OrderDetailsItem label={"Nr sali:"} value={hallNumber}/>
            </style.OrderDetailsContainer>
            <TicketItem tickets={tickets}/>
        </style.Container>
    )
}

export default OrderItem;