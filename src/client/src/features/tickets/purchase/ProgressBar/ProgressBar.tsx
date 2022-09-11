import React from 'react'
import * as style from "./styled";
import ProgressBarItem from "./ProgressBarItem";

interface Props{
    stage: number;
}

function ProgressBar({stage}: Props) {
    return (
        <style.ContentContainer>
            <ProgressBarItem text={"1. Wybór ofert"} isActive={stage >= 0}/>
            <ProgressBarItem text={"2. Wybór miejsc"} isActive={stage >= 1}/>
            <ProgressBarItem text={"3. Płatność"} isActive={stage >= 2}/>
        </style.ContentContainer>
    )
}

export default ProgressBar;