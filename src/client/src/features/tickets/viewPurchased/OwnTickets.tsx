import React from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import OrderItem from "./OrderItem/OrderItem";
import * as style from './styled';

function OwnTickets() {
    return (
        <main className="display-container">
            <SectionContainer minHeight={"auto"} margin={"40px 12px"}>
                <style.Title>Zrealizowane zamówienia</style.Title>
                <OrderItem/>
                <OrderItem/>
                <OrderItem/>
            </SectionContainer>
        </main>
    )
}

export default OwnTickets;