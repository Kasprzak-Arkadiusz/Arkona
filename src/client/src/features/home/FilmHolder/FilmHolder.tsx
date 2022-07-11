import React from 'react';
import * as holder from './styled'

function FilmHolder(props: { image: string; title: string }) {
    return (
        <holder.Container>
            <holder.Image src={props.image} alt="" />
            <holder.Title>{props.title}</holder.Title>
        </holder.Container>
    );
}

export default FilmHolder;
