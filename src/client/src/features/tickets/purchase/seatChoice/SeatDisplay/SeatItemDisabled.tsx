import React from 'react';
import * as style from './styled';

function DisabledSeatItem() {
        return (
        <style.DisabledSeatItemContainer isFree={false} isCurrentUser={false}/>
    )
}

export default DisabledSeatItem;