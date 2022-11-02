import React, {useEffect, useState} from 'react';
import {
    EmptyRequest,
    TicketDiscountsDetails
} from "generated/ticketDiscount/ticketDiscount_pb";
import {TicketDiscountClient} from 'generated/ticketDiscount/ticketDiscount_pb_service'
import * as mainStyle from '../styled';
import AvailableDiscountItem from "./AvailableDiscountItem";
import {TicketDetails} from "../../models/TicketDetails";

interface Props {
    onChange: (discount: TicketDiscountsDetails, ticketsCount: number) => void;
    initialTickets: Array<TicketDetails>;
}

function AvailableDiscounts({onChange, initialTickets}: Props) {
    const [ticketDiscountClient, _] = useState<TicketDiscountClient>(new TicketDiscountClient(process.env.REACT_APP_SERVER_URL!));
    const [ticketDiscounts, setTicketDiscounts] = useState<TicketDiscountsDetails[]>(new Array<TicketDiscountsDetails>());

    useEffect(() => {
        const request = new EmptyRequest();
        ticketDiscountClient.getTicketDiscounts(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setTicketDiscounts(responseMessage.getTicketdiscountList());
            }
        });
    }, []);

    const ChangeHandler = (discountId: number, ticketsCount: number) => {
        const discount = ticketDiscounts.find(item => item.getId() === discountId);
        if (discount !== undefined) {
            onChange(discount, ticketsCount);
        }
    }

    return (
        <mainStyle.ContentContainer>
            <mainStyle.SectionTitle>Dostępne zniżki</mainStyle.SectionTitle>
            {ticketDiscounts.map((item) => {
                {
                    let initialNumberOfTickets = 0;
                    
                    const initialTicket = initialTickets.find(t => t.id === item.getId());
                    if (initialTicket !== undefined) {
                        initialNumberOfTickets = initialTicket.numberOfTickets;
                    }

                    return (<AvailableDiscountItem key={item.getId()} details={item} onChangeHandler={ChangeHandler}
                                                   initialNumberOfTickets={initialNumberOfTickets}/>)
                }
            })}
        </mainStyle.ContentContainer>
    )
}

export default AvailableDiscounts;