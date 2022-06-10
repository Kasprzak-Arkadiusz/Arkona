import React from "react";
import * as style from './styled'

interface Props {
    title: string;
}

function SectionTitle({title} : Props) {
    return (
        <style.Container>
            <style.Title>{title}</style.Title>
        </style.Container>
    )
}

export default SectionTitle