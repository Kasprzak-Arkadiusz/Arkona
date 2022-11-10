import React, {useEffect, useState} from 'react';
import * as style from "./styled";
import {OfferClient} from "generated/offer/offer_pb_service"
import {GetOfferByIdRequest, GetOfferByIdResponse} from "generated/offer/offer_pb";

interface Props {
    promotionId: number;
}

function PromotionSection({promotionId}: Props) {
    const [offerClient, _] = useState<OfferClient>(new OfferClient(process.env.REACT_APP_SERVER_URL!));
    const [offer, setOffer] = useState<GetOfferByIdResponse>(new GetOfferByIdResponse());

    useEffect(() => {
        if (promotionId !== 0) {
            const request = new GetOfferByIdRequest();
            request.setOfferid(promotionId);

            offerClient.getOfferById(request, (error, responseMessage) => {
                if (responseMessage !== null && responseMessage !== undefined) {
                    setOffer(responseMessage);
                }
            });
        }
    }, [promotionId]);

    return (
        <style.SectionContainer>
            <style.SectionTitle>Promocja:</style.SectionTitle>
            {offer.getName() !== "" && <style.SectionDetailsContainer textAlign={"center"}>
                <style.DetailContainer>
                    <style.DetailsText>{offer.getName()}</style.DetailsText>
                </style.DetailContainer>
            </style.SectionDetailsContainer>}
        </style.SectionContainer>
    )
}

export default PromotionSection;