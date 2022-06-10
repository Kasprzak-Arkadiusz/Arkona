import React from 'react';
import * as holder from './styled'

function OfferHolder(props: { image: string; title: string }) {
    return (
        <holder.Container>
            <holder.Image src={props.image} alt="" />
            <holder.Text>{props.title}</holder.Text>
        </holder.Container>
    );
}

export default OfferHolder;
