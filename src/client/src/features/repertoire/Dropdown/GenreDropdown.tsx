import React from 'react';
import * as style from './styled'
import {MovieGenres} from 'utils/CustomTypes/MovieGenres'

function GenreDropdown() {
    return (
        <style.SelectContainer>
            <style.SelectLabel>Gatunek: </style.SelectLabel>
            <style.Select defaultValue={"default"}>
                <option value={"default"}></option>
                {Array.from(MovieGenres).map(([key, value]) => {
                    return <option value={value} label={key} key={key}></option>
                })}
            </style.Select>
        </style.SelectContainer>
    );
}

export default GenreDropdown;
