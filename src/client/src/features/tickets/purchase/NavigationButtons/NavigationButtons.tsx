import React from 'react';
import * as style from './styled';

interface Props{
    prevText?: string,
    nextText?: string
    onPrevClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onNextClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function NavigationButtons({prevText = "Wróć", nextText = "Dalej", onPrevClick, onNextClick}: Props){
    return(
        <style.ContentContainer>
            <style.NavigationButton onClick={onPrevClick}>{prevText}</style.NavigationButton>
            <style.NavigationButton onClick={onNextClick}>{nextText}</style.NavigationButton>
        </style.ContentContainer>
    )
}

export default NavigationButtons;