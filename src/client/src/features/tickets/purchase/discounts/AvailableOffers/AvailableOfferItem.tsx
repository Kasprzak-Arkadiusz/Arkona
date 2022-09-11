import React from 'react';
import * as style from './styled'

interface Props {
    value: number;
    isChecked: boolean;
    text: string;
    description: string;
    isTransparent: boolean;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    clickHandler: React.MouseEventHandler<HTMLInputElement>;
}

function AvailableOfferItem({value, isChecked, text, description, isTransparent, changeHandler, clickHandler}: Props) {
    return (
        <style.AvailableOfferItemContainer isTransparent={isTransparent}>
            <style.CheckMark>
                <style.SubCheckMark isChecked={isChecked}/>
            </style.CheckMark>
            <style.RadioInput value={value} type={"radio"} checked={isChecked} disabled={isTransparent}
                              onChange={changeHandler} onClick={clickHandler}/>
            <style.InformationContainer>
                <style.Title>{text}</style.Title>
                <style.Description>{description}</style.Description>
            </style.InformationContainer>
        </style.AvailableOfferItemContainer>
    )
}

export default AvailableOfferItem;