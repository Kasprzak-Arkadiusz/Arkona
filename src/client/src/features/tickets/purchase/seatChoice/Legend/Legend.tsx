import React from 'react';
import * as style from './styled';
import {SeatItemContainer} from '../SeatDisplay/styled'

function Legend() {
    return (
        <style.LegendContainer>
            <style.Title>Legenda</style.Title>
            <style.LegendItemContainer>
                <SeatItemContainer isFree={true}/>
                <style.Label> - Miejsce wolne</style.Label>
            </style.LegendItemContainer>
            <style.LegendItemContainer>
                <SeatItemContainer isFree={false}/>
                <style.Label> - Miejsce zajęte</style.Label>
            </style.LegendItemContainer>
        </style.LegendContainer>
    )
}

export default Legend;