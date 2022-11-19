import React, {useEffect, useState} from 'react'
import SectionContainer from "components/SectionContainer/SectionContainer";
import OrderItem from "./OrderItem/OrderItem";
import * as style from './styled';
import {GetUserOrdersRequest, UserOrderDetails} from "generated/order/order_pb";
import {OrderClient} from "generated/order/order_pb_service";
import {useJwtMetadata} from "hooks/useJwtMetadata";

function OwnTickets() {
    const [orderClient,] = useState<OrderClient>(new OrderClient(process.env.REACT_APP_SERVER_URL!));
    const [orders, setOrders] = useState<Array<UserOrderDetails>>(new Array<UserOrderDetails>());
    const metadata = useJwtMetadata();
    
    useEffect(() => {
        const request = new GetUserOrdersRequest();
        if (metadata === null){
            return;
        }
        
        orderClient.getUserOrders(request, metadata, (error, responseMessage) => {
            if (responseMessage !== null && responseMessage !== undefined) {
                setOrders(responseMessage.getOrdersList());
            }
        });
    }, [])

    return (
        <main className="display-container">
            <SectionContainer minHeight={"auto"} margin={"40px 12px"}>
                <style.Title>Zrealizowane zamówienia</style.Title>
                {orders.map(order => {
                    order.getTicketsList()

                    return <OrderItem key={order.getOrdernumber()}
                                      orderNumber={order.getOrdernumber()}
                                      dateOfPurchase={order.getDateofpurchase()}
                                      movieTitle={order.getMovietitle()}
                                      dateOfSeance={order.getDateofseance()}
                                      totalPrice={order.getTotalprice()}
                                      hallNumber={order.getHallnumber()}
                                      tickets={order.getTicketsList()}/>
                })}
            </SectionContainer>
        </main>
    )
}

export default OwnTickets;