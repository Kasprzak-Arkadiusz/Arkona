import React from 'react'
import * as style from "./styled";
import ProgressBarItem from "./ProgressBarItem";

function ProgressBar() {
    return (
        <style.ContentContainer>
            <ProgressBarItem text={"1. Wybór ofert"} isActive={true}/>
            <ProgressBarItem text={"2. Wybór miejsc"}/>
            <ProgressBarItem text={"3. Płatność"}/>
        </style.ContentContainer>
    )
}

export default ProgressBar;