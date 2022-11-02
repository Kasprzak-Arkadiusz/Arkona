import React from 'react'
import * as style from "./styled";

interface Props {
    text: string;
    isActive?: boolean;
}

function ProgressBarItem({text, isActive = false}: Props) {
    return (
        <style.ItemContainer isActive={isActive}>
            <style.ItemText>{text}</style.ItemText>
        </style.ItemContainer>
    )
}

export default ProgressBarItem;