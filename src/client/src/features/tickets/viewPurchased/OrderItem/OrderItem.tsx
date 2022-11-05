import React from 'react'
import * as style from './styled';
import OrderDetailsItem from "./OrderDetailsItem";
import TicketItem from "./TicketItem";

function OrderItem() {
    return(
        <style.Container>
            <style.OrderDetailsContainer>
                <OrderDetailsItem label={"Nr. zamówienia:"} value={"123456"}/>
                <OrderDetailsItem label={"Data zakupu:"} value={"05.11.2022"}/>
                <OrderDetailsItem label={"Film:"} value={"Batman"}/>
                <OrderDetailsItem label={"Data seansu:"} value={"2022-11-10 15:00"}/>
                <OrderDetailsItem label={"Cena:"} value={"120 zł"}/>
                <OrderDetailsItem label={"Nr sali:"} value={"1"}/>
            </style.OrderDetailsContainer>
            <TicketItem></TicketItem>
        </style.Container>
    )
}

export default OrderItem;