import React from 'react';
import * as holder from './styled'

interface IProps {
    image: string,
    title: string,
    id: number,
    displayTitle?: boolean
}


function FilmHolder({image, title, id, displayTitle = true}: IProps) {
    return (
        <holder.Container href={`movie/${id}`}>
            <holder.Image src={`data:image/jpeg;base64,${image}`} alt={`Movie: ${title}`}/>
            {displayTitle && (
                <holder.TitleContainer>
                    <holder.Title>{title}</holder.Title>
                </holder.TitleContainer>)}
        </holder.Container>
    );
}

export default FilmHolder;
