import styled from "styled-components";

const IconContainer = styled.svg.attrs((props: {height: string, width: string}) => props)`
    width: ${props => props.width};
    height: ${props => props.height};
    display: inline-block;
    margin: auto 0 auto 0;'
`

export default IconContainer;