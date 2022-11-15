import React, {useEffect, useState} from 'react';
import * as style from "./styled";
import {TicketDetails} from "../models/TicketDetails";
import {OrderClient} from "generated/order/order_pb_service";
import {GetTotalPriceRequest, GetTotalPriceResponse, SelectedTicket} from "generated/order/order_pb";
import {useJwtMetadata} from "hooks/useJwtMetadata";

interface Props {
    promotionId: number,
    discountedTickets: Array<TicketDetails>
}

function PriceSection({promotionId, discountedTickets}: Props) {
    const [orderClient, _] = useState<OrderClient>(new OrderClient(process.env.REACT_APP_SERVER_URL!));
    const [totalPriceResponse, setTotalPriceResponse] = useState<GetTotalPriceResponse>(new GetTotalPriceResponse());
    const metadata = useJwtMetadata();

    useEffect(() => {
        if (promotionId !== 0) {
            const request = new GetTotalPriceRequest();
            request.setOfferid(promotionId);
            request.setSelectedticketsList(discountedTickets.map(item => {
                const selectedTicket = new SelectedTicket();
                selectedTicket.setCount(item.numberOfTickets);
                selectedTicket.setDiscountid(item.id);
                return selectedTicket;
            }));

            if (metadata === null){
                return;
            }

            orderClient.getTotalPrice(request, metadata, (error, responseMessage) => {
                if (responseMessage !== null && responseMessage !== undefined) {
                    setTotalPriceResponse(responseMessage);
                }
            });
        }
    }, [promotionId]);

    return (
        <style.SectionContainer>
            <style.SectionTitle>Cena:</style.SectionTitle>
            <style.SectionDetailsContainer>
                <style.DetailContainer>
                    <style.DetailsText>{totalPriceResponse.getPrice()} zł</style.DetailsText>
                </style.DetailContainer>
            </style.SectionDetailsContainer>
        </style.SectionContainer>
    )
}

export default PriceSection;