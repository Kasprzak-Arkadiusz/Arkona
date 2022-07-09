import styled from "styled-components";

interface Props {
    name: string;
}

const baseButton = styled.button<Props>`
    width: calc(100% * 2 / 3);
    height: 30px;
    display: flex;
    align-items: center;
    margin: 0 auto 20px auto;
    justify-content: center;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;

    border: 0;
    border-radius: 10px;

    cursor: pointer;
`

let colors: { [name: string]: string } = {};
colors.facebook = '#4267b2'
colors.google = '#bdbdbd'

export const button = styled(baseButton)`
    background-color: 
    ${props => {
    let providerName = props.name.toLowerCase()
    return providerName in colors ? colors[providerName] : '#ffffff';
}};
`

export const image = styled.img`
    margin-right: auto;
    border-radius: 4px;
`

export const baseText = styled.a<Props>`
    font-size: 12px;
    line-height: 14px;
`

let textColors: { [name: string]: string } = {};
textColors.facebook = '#ffffff'
textColors.google = '#ffffff'

let textShadows: { [name: string]: string } = {};
textShadows.facebook = '1px 1px 4px rgba(0, 0, 0, 0.75)'
textShadows.google = '1px 1px 4px rgba(0, 0, 0, 0.75)'

export const text = styled(baseText)`
    margin-right:auto;
    translate: -10px;
    color:
    ${props => {
    let providerName = props.name.toLowerCase()
    return providerName in textColors ? textColors[providerName] : '#ffffff';
}};
    text-shadow:
    ${props => {
    let providerName = props.name.toLowerCase()
    return providerName in textShadows ? textShadows[providerName] : '';
}};
`