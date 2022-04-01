import React from 'react';

function OfferHolder(props: { image: string; title: string }) {
    return (
        <div className="offer-holder">
            <img src={props.image} alt="" />
            <span className="offer-holder__text">{props.title}</span>
        </div>
    );
}

export default OfferHolder;
