import styled from "styled-components";

interface ButtonProps {
    backgroundColor: string;
}

export const Button = styled.button<ButtonProps>`
    margin: 0 5px;
    background-color: ${props => props.backgroundColor};
    border-radius: 5px;
`