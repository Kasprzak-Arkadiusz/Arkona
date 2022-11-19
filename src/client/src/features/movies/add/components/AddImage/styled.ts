import styled from "styled-components";

interface ContainerProps {
    width: string;
    height: string;
}

export const Container = styled.div<ContainerProps>`
    display:flex;
    
    min-height:  ${props => props.height};
    max-height: ${props => props.height};
    width: ${props => props.width};
    height: fit-content;
    line-height: 20px;
    margin: 20px auto;
    text-decoration: none;
    justify-content: center;
    
    background: ${props => props.theme.Palette.textMain};
    cursor: pointer;
`

export const Image = styled.img`
    width: inherit;
`

export const ImageInput = styled.input`
    display: none;
`