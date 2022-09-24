import styled from "styled-components";

export const TicketNumberContainer = styled.div`
    width: auto;
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: center;
`

export const ErrorLabel = styled.label`
    margin: 10px;
    
    font-weight: bold;
    color: ${props => props.theme.Palette.warning};
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

export const NextButton = styled.button`
    width: 100px;
    margin: 20px auto;
    border-radius: 10px;
    
    color: ${props => props.theme.Palette.main};
    background-color: ${props => props.theme.Palette.gray};
    
     &:hover {
        -webkit-text-fill-color: ${props => props.theme.Palette.blueBorder};
        -webkit-text-stroke-color: ${props => props.theme.Palette.blueBorder};
        border-color: ${props => props.theme.Palette.blueBorder};
        transition: 500ms; 
    }
`