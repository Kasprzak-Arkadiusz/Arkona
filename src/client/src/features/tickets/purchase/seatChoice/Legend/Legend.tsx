import React from 'react';
import * as style from './styled';
import {DisabledSeatItemContainer, SeatType} from '../SeatDisplay/styled'

function Legend() {
    return (
        <style.LegendContainer>
            <style.Title>Legenda</style.Title>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer seatType={SeatType.Free}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce wolne</style.Label>
            </style.LegendItemContainer>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer seatType={SeatType.TakenInDatabase}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce zajęte</style.Label>
            </style.LegendItemContainer>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer seatType={SeatType.TakenByUser}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce wybrane przez Ciebie</style.Label>
            </style.LegendItemContainer>
            <style.LegendItemContainer>
                <DisabledSeatItemContainer seatType={SeatType.TakenByOtherUser}/>
                <style.Dash>-</style.Dash>
                <style.Label>Miejsce zajęte przez innego użytkownika</style.Label>
            </style.LegendItemContainer>
        </style.LegendContainer>
    )
}

export default Legend;