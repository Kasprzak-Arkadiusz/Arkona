import styled from "styled-components";

interface Props {
    isTransparent: boolean;
}

export const AvailableOfferItemContainer = styled.label<Props>`
    display: flex;
    position: relative;
    margin: 10px auto 10px 10px;
    padding-left: 35px;
    cursor: pointer;
    opacity: ${props => props.isTransparent ? "50%" : "100%"};
    
    @media only screen and (max-width: 480px) {
        width: auto;
        margin: 12px;
    }
`

export const RadioInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`

interface SubCheckMarkProps {
    isChecked: boolean;
}

export const CheckMark = styled.div`
    position: absolute;
    left: 0;
    height: 16px;
    width: 16px;
    background-color: #eee;
    border-radius: 50%;
    
    ${AvailableOfferItemContainer}:hover & {
        background-color: ${props => props.theme.Palette.bluish};
    }
`

export const SubCheckMark = styled(CheckMark)<SubCheckMarkProps>`
    visibility: ${props => props.isChecked ? "visible": "hidden"};
    top: 4px;
    left: 4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${props => props.theme.Palette.blueBorder}; 
`