import React from 'react';
import * as style from './styled';

interface Props{
    onPrevClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onNextClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

function NavigationButtons({onPrevClick, onNextClick}: Props){
    return(
        <style.ContentContainer>
            <style.NavigationButton onClick={onPrevClick}>Wróć</style.NavigationButton>
            <style.NavigationButton onClick={onNextClick}>Dalej</style.NavigationButton>
        </style.ContentContainer>
    )
}

export default NavigationButtons;