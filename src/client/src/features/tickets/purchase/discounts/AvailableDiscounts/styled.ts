import styled from "styled-components";

interface Props {
    isTransparent: boolean;
}

export const AvailableDiscountItemContainer = styled.label<Props>`
    display: flex;
    position: relative;
    margin: 10px auto 10px 10px;
    cursor: pointer;
    opacity: ${props => props.isTransparent ? "50%" : "100%"};
    
    @media only screen and (max-width: 480px) {
        width: auto;
        margin: 12px;
    }
`