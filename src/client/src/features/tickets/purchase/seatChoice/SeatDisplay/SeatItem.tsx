import React from 'react';
import * as style from './styled';

interface Props {
    isFree: boolean;
}

function SeatItem({isFree}: Props) {
    return (
        <style.SeatItemContainer isFree={isFree}>

        </style.SeatItemContainer>
    )
}

export default SeatItem;