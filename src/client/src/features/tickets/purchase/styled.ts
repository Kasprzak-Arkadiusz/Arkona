﻿import styled from "styled-components";

export const TicketNumberContainer = styled.div`
    width: auto;
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: center;
`

export const TicketNumberLabel = styled.label`
    margin: 10px;
    
    font-weight: bold;
    color: ${props => props.theme.Palette.textMain};
`

export const CounterContainer = styled.div`
    display: flex;
    display: flex;
    width: fit-content;
    flex-direction: column;
`

export const CounterNumberSpan = styled.span`
    color: ${props => props.theme.Palette.textMain};
`

interface CounterProps {
    isVisible: boolean;
}

export const IncrementButton = styled.div<CounterProps>`
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 10px solid ${props => props.theme.Palette.textMain};
    margin: auto;
    
    visibility: ${props => props.isVisible ? "visible" : "hidden"};
    cursor: pointer;
`

export const DecrementButton = styled.div<CounterProps>`
    width: 0; 
    height: 0; 
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-top: 10px solid ${props => props.theme.Palette.textMain};
    margin: auto;
    
    visibility: ${props => props.isVisible ? "visible" : "hidden"};
    cursor: pointer;
`