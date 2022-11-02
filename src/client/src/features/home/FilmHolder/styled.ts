import styled from "styled-components";

interface ContainerProps {
    width: string;
    height: string;
}

export const Container = styled.a<ContainerProps>`
    display:inline-block;

    height:  ${props => props.height};
    width: ${props => props.width};
    max-width: ${props => props.width};
    height: fit-content;
    line-height: 20px;
    margin: 20px auto;
    text-decoration: none;
    
    cursor: pointer;
`

export const Image = styled.img`
    width: inherit;
`

export const Title = styled.span`
    height: auto;
    max-width: inherit;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    word-wrap: break-word;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.2);
`

export const TitleContainer = styled.div`
    width: inherit;
    height: auto;
    margin: 5px 0 5px 0;
    max-width: inherit;

    display: flex;
    text-align: center;
    justify-content: center;
`