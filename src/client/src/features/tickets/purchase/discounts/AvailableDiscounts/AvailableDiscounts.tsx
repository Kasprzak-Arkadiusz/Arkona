import React, {useEffect, useState} from 'react';
import {
    EmptyRequest,
    GetTicketDiscountsResponse,
    TicketDiscountsDetails
} from "generated/ticketDiscount/ticketDiscount_pb";
import {TicketDiscountClient, TicketDiscount} from 'generated/ticketDiscount/ticketDiscount_pb_service'
import * as style from "../AvailableOffers/styled";
import AvailableOfferItem from "../AvailableOffers/AvailableOfferItem";

function AvailableDiscounts() {
    const [ticketDiscountClient, _] = useState<TicketDiscountClient>(new TicketDiscountClient(process.env.REACT_APP_SERVER_URL!));
    const [ticketDiscounts, setTicketDiscounts] = useState<TicketDiscountsDetails[]>(new Array<TicketDiscountsDetails>());
    const [checkedDiscountId, setCheckedDiscountId] = useState<number>();

    useEffect(() => {
        const request = new EmptyRequest();

        ticketDiscountClient.getTicketDiscounts(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setTicketDiscounts(responseMessage.getTicketdiscountList());
            }
        });
    }, []);

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setCheckedDiscountId(parseInt(e.target.value));
        }
    }

    const ClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setCheckedDiscountId(0);
    }

    return (
        <style.ContentContainer>
            <style.SectionTitle>Dostępne zniżki</style.SectionTitle>
            {ticketDiscounts.map((item) => {
                {
                    return (<AvailableOfferItem key={item.getId()} value={item.getId()} text={item.getName() + " " + item.getDiscountvalue()}
                                                description={item.getDescription()}
                                                isChecked={checkedDiscountId === item.getId()}
                                                changeHandler={ChangeHandler}
                                                clickHandler={ClickHandler}/>)
                }
            })}
        </style.ContentContainer>
    )
}

export default AvailableDiscounts;