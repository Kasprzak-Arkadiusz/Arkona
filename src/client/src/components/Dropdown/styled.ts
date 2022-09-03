import styled from "styled-components";

export const SelectLabel = styled.label`
    margin: auto 5px auto auto;
    max-width: 90px;
    
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    text-align: right;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const SelectContainer = styled.div`
    width: auto;
    display: flex;
    margin: 5px 0px;
    
    @media only screen and (max-width: 840px) {
        margin: 0px 0px 5px;
    }
`

export const Select = styled.select`
    height: 25px;
    width: 200px;
    margin: 5px;
    display: flex;
    border: 0;
    border-radius: 15px;
    padding: 0 10px 0 5px;
    text-align: center;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1px;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
    background: ${props => props.theme.Palette.gray};
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
`