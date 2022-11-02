import React from 'react';
import * as style from './styled';
import {DisabledSeatItemContainer} from '../SeatDisplay/styled'

function Legend() {
    return (
        <style.LegendContainer>
            <style.Title>Legenda</style.Title>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer isFree={true} isCurrentUser={false}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce wolne</style.Label>
            </style.LegendItemContainer>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer isFree={false} isCurrentUser={false}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce zajęte</style.Label>
            </style.LegendItemContainer>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer isFree={false} isCurrentUser={true}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce wybrane przez Ciebie</style.Label>
            </style.LegendItemContainer>
        </style.LegendContainer>
    )
}

export default Legend;