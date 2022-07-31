import React from 'react';
import * as holder from './styled'

interface IProps {
    image: string,
    name: string,
    id: number,
}

function OfferHolder({image, name, id}: IProps) {
    return (
        <holder.Container href={`offer/${id}`}>
            <holder.Image src={`data:image/jpeg;base64,${image}`} alt={`Offer: ${name}`} />
            <holder.Text>{name}</holder.Text>
        </holder.Container>
    );
}

export default OfferHolder;
