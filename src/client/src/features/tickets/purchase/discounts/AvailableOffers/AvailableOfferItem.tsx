import React from 'react';
import * as style from './styled';
import * as mainStyle from '../styled';

interface Props {
    value: number;
    isChecked: boolean;
    text: string;
    description: string;
    isTransparent?: boolean;
    changeHandler: React.ChangeEventHandler<HTMLInputElement>;
    clickHandler: React.MouseEventHandler<HTMLInputElement>;
}

function AvailableOfferItem({value, isChecked, text, description, isTransparent = false, changeHandler, clickHandler}: Props) {
    return (
        <style.AvailableOfferItemContainer isTransparent={isTransparent}>
            <style.CheckMark>
                <style.SubCheckMark isChecked={isChecked}/>
            </style.CheckMark>
            <style.RadioInput value={value} type={"radio"} checked={isChecked} disabled={isTransparent}
                              onChange={changeHandler} onClick={clickHandler}/>
            <mainStyle.InformationContainer>
                <mainStyle.Title>{text}</mainStyle.Title>
                <mainStyle.Description>{description}</mainStyle.Description>
            </mainStyle.InformationContainer>
        </style.AvailableOfferItemContainer>
    )
}

export default AvailableOfferItem;