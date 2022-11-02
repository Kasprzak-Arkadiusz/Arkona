import styled from "styled-components";

export const ContentContainer = styled.div`
    width: auto;
    margin: 0px 20px 40px 20px;
    display: flex;
`

interface ItemContainerProps {
    isActive: boolean
}

export const ItemContainer = styled.div<ItemContainerProps>`
    width: calc(100% / 3);
    height: inherit;
    margin: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    border-width: 2px;
    border-color: ${props => props.theme.Palette.blueBorder};
    border-style: solid;
    border-radius: 25px;
    background-color: ${props => props.isActive ? props.theme.Palette.bluish : props.theme.Palette.lighter};
`

export const ItemText = styled.span`
    font-size: 16px;
    margin: 10px;
`