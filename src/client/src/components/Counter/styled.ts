import styled from "styled-components";

interface CounterContainerProps {
    margin?: string;
}

export const CounterContainer = styled.div<CounterContainerProps>`
    display: flex;
    ${props => props.margin === undefined ? "" : `margin: ${props.margin}` };
    width: fit-content;
    flex-direction: column;
    user-select: none;
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
    user-select: none;
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
    user-select: none;
`