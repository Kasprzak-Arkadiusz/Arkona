import React from 'react';
import * as style from './styled'
import {AgeRestrictions} from 'utils/CustomTypes/AgeRestrictions'

function AgeRestrictionDropdown() {
    return (
        <style.SelectContainer>
            <style.SelectLabel>Ograniczenie wiekowe: </style.SelectLabel>
            <style.Select defaultValue={"default"}>
                <option value={"default"}></option>
                {Array.from(AgeRestrictions).map(([key, value]) => {
                    return <option value={value} label={key} key={key}></option>
                })}
            </style.Select>
        </style.SelectContainer>
    );
}

export default AgeRestrictionDropdown;
