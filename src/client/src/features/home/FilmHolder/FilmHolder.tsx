import React from 'react';
import * as holder from './styled'

interface IProps {
    image: string,
    title: string,
    id: number,
}


function FilmHolder({image, title, id}: IProps) {
    return (
        <holder.Container href={`movie/${id}`}>
            <holder.Image src={`data:image/jpeg;base64,${image}`} alt="Movie image"/>
            <holder.TitleContainer>
                <holder.Title>{title}</holder.Title>
            </holder.TitleContainer>
        </holder.Container>
    );
}

export default FilmHolder;
