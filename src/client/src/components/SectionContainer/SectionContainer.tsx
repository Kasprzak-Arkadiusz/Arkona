import React from 'react';
import {Container} from './styled'

interface IProps {
    minHeight?: number
    margin? : string
    children?: React.ReactNode;
}

function SectionContainer({minHeight, margin, children} : IProps) {
    return <Container minHeight={minHeight} margin={margin}>
        {children}
    </Container>
}

export default SectionContainer;
