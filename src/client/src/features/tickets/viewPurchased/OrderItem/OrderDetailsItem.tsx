import React from 'react'
import * as style from './styled';

interface Props {
    label: string,
    value: string
}

function OrderDetailsItem({label, value}: Props) {
    return(
        <style.OrderDetailsItemContainer>
            <style.DetailsItemLabel>{label}</style.DetailsItemLabel>
            <style.DetailsItemValue>{value}</style.DetailsItemValue>
        </style.OrderDetailsItemContainer>
    )
}

export default OrderDetailsItem;