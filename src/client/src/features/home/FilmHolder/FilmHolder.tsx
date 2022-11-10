import React from 'react';
import * as holder from './styled'

interface IProps {
    width?: string,
    height?: string,
    image: string,
    title: string,
    id: number,
    displayTitle?: boolean,
    href?: string
}

function FilmHolder({width = "220px", height = "320px", image, title, id, displayTitle = true, href}: IProps) {
    return (
        <holder.Container width={width} height={height} href={href == undefined ? `movie/${id}` : href}>
            <holder.Image src={`data:image/jpeg;base64,${image}`} alt={`Movie: ${title}`}/>
            {displayTitle && (
                <holder.TitleContainer>
                    <holder.Title>{title}</holder.Title>
                </holder.TitleContainer>)}
        </holder.Container>
    );
}

export default FilmHolder;
