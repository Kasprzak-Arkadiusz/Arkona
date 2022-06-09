import React from 'react';

function FilmHolder(props: { image: string; title: string }) {
    return (
        <div className="film-holder">
            <img className="film-holder__image" src={props.image} alt="" />
            <span className="film-holder__title">{props.title}</span>
        </div>
    );
}

export default FilmHolder;
