import styled from "styled-components";

const IconContainer = styled.div.attrs((props: {height: string, width: string}) => props)`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: auto 0 auto 0;'
`

export default IconContainer;