import styled from "styled-components";

export const ContentContainer = styled.div`
    margin: auto;
    width: fit-content;
    padding: 10px;
`

export const NavigationButton = styled.button`
    width: 100px;
    margin: 10px;
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