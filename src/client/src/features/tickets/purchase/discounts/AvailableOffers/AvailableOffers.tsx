import React, {useEffect, useState} from 'react';
import * as style from './styled'
import AvailableOfferItem from "./AvailableOfferItem";
import {OfferClient} from "generated/offer/offer_pb_service";
import {AvailableOfferInfo, GetAvailableOffersRequest} from "generated/offer/offer_pb";

interface Props {
    seanceId: number;
    numberOfTickets: number;
    onCheckHandler: (offerId :number) => void;
}

function AvailableOffers({seanceId, numberOfTickets, onCheckHandler}: Props) {
    const [offerClient, _] = useState<OfferClient>(new OfferClient(process.env.REACT_APP_SERVER_URL!));
    const [offers, setOffers] = useState<AvailableOfferInfo[]>(new Array<AvailableOfferInfo>());
    const [checkedOfferId, setCheckedOfferId] = useState<number>();

    useEffect(() => {
        const request = new GetAvailableOffersRequest();
        request.setSeanceid(seanceId);

        offerClient.getAvailableOffers(request, (error, responseMessage) => {
            if (responseMessage !== null) {
                setOffers(responseMessage.getOffersList());
            }
        });
    }, [seanceId]);

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const offerId = parseInt(e.target.value);
            setCheckedOfferId(offerId);
            setCheckedOfferId(offerId);
        }
    }

    const ClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setCheckedOfferId(0);
        onCheckHandler(0);
    }

    return (
        <style.ContentContainer>
            <style.SectionTitle>Dostępne oferty</style.SectionTitle>
            {offers.map((item) => {
                {
                    return (<AvailableOfferItem key={item.getId()} value={item.getId()} text={item.getName()}
                                                description={item.getDescription()}
                                                isChecked={checkedOfferId === item.getId()}
                                                isTransparent={numberOfTickets < item.getMintickets()}
                                                changeHandler={ChangeHandler}
                                                clickHandler={ClickHandler}/>)
                }
            })}
        </style.ContentContainer>
    )
}

export default AvailableOffers;