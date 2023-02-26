import React, {useEffect, useState} from 'react';
import * as style from "../MovieDetailsForm/styled";

interface Props {
    fieldId: number,
    availableMovieGenres: Array<MovieGenre>,
    onSelectedValueChange: (previousValue: number, selectedValue: number, dropdownId: number) => void,
    defaultValue?: number,
}

export type MovieGenre = {
    name: string | undefined,
    id: number
}

function GenreField({fieldId, availableMovieGenres, onSelectedValueChange, defaultValue}: Props) {
    const [dropdownValue, setDropdownValue] = useState<number>(-1);

    function onDropDownSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedId = parseInt(e.currentTarget.value);
        onSelectedValueChange(dropdownValue, selectedId, fieldId);
        setDropdownValue(selectedId);
    }

    useEffect(() => {
        if (defaultValue === undefined) {
            return
        }

        const select = document.getElementById(`GenreSelect-${fieldId}`) as HTMLSelectElement | null;
        if (select === null) {
            return;
        }

        select.selectedIndex = defaultValue + 1;
    }, [defaultValue])

    return (
        <style.MovieGenreSelect id={`GenreSelect-${fieldId}`} key={fieldId} onChange={onDropDownSelect}
                                value={dropdownValue}>
            <option value={-1} label={""} key={`${fieldId}--1`}/>
            {availableMovieGenres.map(({name, id}) => {
                if (name !== undefined) {
                    return <option value={id} label={name} key={`${fieldId}-${id}`}/>
                }
            })}
        </style.MovieGenreSelect>
    )
}

export default GenreField;