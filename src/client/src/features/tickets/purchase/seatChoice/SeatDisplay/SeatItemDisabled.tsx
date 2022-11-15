import React from 'react';
import * as style from './styled';
import {SeatType} from './styled';

function DisabledSeatItem() {
        return (
        <style.DisabledSeatItemContainer seatType={SeatType.TakenInDatabase}/>
    )
}

export default DisabledSeatItem;