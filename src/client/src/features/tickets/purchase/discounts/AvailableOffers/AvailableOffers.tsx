import React, {useEffect, useState} from 'react';
import * as mainStyle from '../styled';
import AvailableOfferItem from "./AvailableOfferItem";
import {OfferClient} from "generated/offer/offer_pb_service";
import {AvailableOfferInfo, GetAvailableOffersRequest} from "generated/offer/offer_pb";

interface Props {
    seanceId: number;
    numberOfTickets: number;
    onCheckHandler: (offerId: number) => void;
    selectedOfferId: number;
}

function AvailableOffers({seanceId, numberOfTickets, onCheckHandler, selectedOfferId}: Props) {
    const [offerClient, _] = useState<OfferClient>(new OfferClient(process.env.REACT_APP_SERVER_URL!));
    const [offers, setOffers] = useState<AvailableOfferInfo[]>(new Array<AvailableOfferInfo>());
    const [checkedOfferId, setCheckedOfferId] = useState<number>(selectedOfferId);

    useEffect(() => {
        if (seanceId != 0) {
            const request = new GetAvailableOffersRequest();
            request.setSeanceid(seanceId);

            offerClient.getAvailableOffers(request, (error, responseMessage) => {
                if (responseMessage !== null) {
                    setOffers(responseMessage.getOffersList());
                }
            });
        }
    }, [seanceId]);

    useEffect(() => {
        const selectedOffer = offers.find(o => o.getId() === checkedOfferId);
        if (selectedOffer !== undefined && numberOfTickets < selectedOffer.getMintickets()) {
            setCheckedOfferId(0);
        }
    }, [numberOfTickets]);

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const offerId = parseInt(e.target.value);
            setCheckedOfferId(offerId);
            onCheckHandler(offerId);
        }
    }

    const ClickHandler = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        setCheckedOfferId(0);
        onCheckHandler(0);
    }

    return (
        <mainStyle.ContentContainer>
            <mainStyle.SectionTitle>Dostępne oferty</mainStyle.SectionTitle>
            {offers.map((item) => {
                {
                    return (<AvailableOfferItem key={item.getId()} value={item.getId()} text={item.getName()}
                                                description={item.getDescription()}
                                                isChecked={checkedOfferId === item.getId() && numberOfTickets >= item.getMintickets()}
                                                isTransparent={numberOfTickets < item.getMintickets()}
                                                changeHandler={ChangeHandler}
                                                clickHandler={ClickHandler}/>)
                }
            })}
        </mainStyle.ContentContainer>
    )
}

export default AvailableOffers;