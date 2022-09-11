import styled from "styled-components";

export const ContentContainer = styled.div`
    max-width: 480px;
    width: fit-content;
    display: flex;
    flex-direction: column;
    align-content: center;
    margin: auto;
`

export const SectionTitle = styled.span`
    width: fit-content;
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 16px;
    text-align: left;
`

interface Props {
    isTransparent: boolean;
}

export const RadioInput = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`

export const AvailableOfferItemContainer = styled.label<Props>`
    display: block;
    position: relative;
    margin: 10px auto;
    padding-left: 35px;
    cursor: pointer;
    opacity: ${props => props.isTransparent ? "50%" : "100%"};
    
    @media only screen and (max-width: 480px) {
        width: auto;
        margin: 12px;
    }
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

export const InformationContainer = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: column;
`

export const Title = styled.span`
    margin-bottom: 10px;
    font-weight: bold;
    text-align: left;
`

export const Description = styled.span`
   text-align: left; 
`