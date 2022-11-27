import React, {useEffect, useState} from 'react';
import {MovieGenres} from "utils/CustomTypes/MovieGenres";
import * as style from "../MovieDetailsForm/styled";
import GenreField, {MovieGenre} from "./GenreField";

interface Props {
    onSelectChange: (selectedMovieGenreIds :Array<number>) => void,
    errorMessage: string | null
}

type DropdownObject = {
    dropdown: JSX.Element,
    id: number
}

type SelectedGenre = {
    dropdownId: number,
    selectedGenreId: number
}

function GenreArrayFields({onSelectChange, errorMessage}: Props) {
    const [selectedMovieGenres, setSelectedMovieGenres] = useState<Array<SelectedGenre>>(new Array<SelectedGenre>());
    const [movieGenresArray,] = useState<Array<MovieGenre>>(Array.from(MovieGenres).map(([key, value]) => {
        return {name: key, id: value}
    }));
    const [availableGenres, setAvailableGenres] = useState<Array<MovieGenre>>(movieGenresArray);
    const [elements, setElements] = useState<Array<DropdownObject>>(new Array<DropdownObject>(
        {
            dropdown: <GenreField key={0} fieldId={0} availableMovieGenres={movieGenresArray}
                                  onSelectedValueChange={handleSelectChange}/>,
            id: 0
        }
    ));
    const [error, setError] = useState<string | null>(null);

    const onRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const lastElementId = elements[elements.length - 1].id;
        const removedSelectedMovieGenre = selectedMovieGenres.find(genre => genre.dropdownId === lastElementId);
        if (removedSelectedMovieGenre !== undefined) {
            availableGenres[removedSelectedMovieGenre.selectedGenreId] = {
                name: movieGenresArray[removedSelectedMovieGenre.selectedGenreId].name,
                id: removedSelectedMovieGenre.selectedGenreId
            };
            setAvailableGenres([...availableGenres]);
            
            const updatedSelectedMovieGenres = selectedMovieGenres.filter(genre => genre.dropdownId !== lastElementId)
            setSelectedMovieGenres([...updatedSelectedMovieGenres]);
        }
        
        setElements([...elements.slice(0, elements.length - 1)]);
    }

    const onAddClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const areAllFieldsFilled = elements.length === selectedMovieGenres.length;
        if (!areAllFieldsFilled) {
            setError("Aby dodać nowe pole wszystkie poprzednie pola muszą być wypełnione")
            return;
        }
        const maxId = elements.length === 0 ? 0 : Math.max(...elements.map(el => el.id));
        setElements([...elements, getMovieGenreDropDown(maxId + 1)]);
    }

    useEffect(() => {
        setError(null);
        onSelectChange(selectedMovieGenres.map(genre => genre.selectedGenreId))
    }, [selectedMovieGenres])

    function handleSelectChange(previousValue: number, selectedValue: number, dropdownId: number) {
        if (selectedValue === -1) {
            setSelectedMovieGenres(selectedMovieGenres.filter(genre => genre.selectedGenreId !== previousValue));
            setAvailableGenres([...availableGenres.map(genre => {
                if (genre.id === previousValue) {
                    return {name: movieGenresArray[genre.id].name, id: genre.id};
                } else {
                    return genre;
                }
            })])
            return;
        }

        setAvailableGenres([...availableGenres.map(genre => {
            if (genre.id === previousValue) {
                return {name: movieGenresArray[genre.id].name, id: genre.id};
            } else if (genre.id === selectedValue) {
                return {name: undefined, id: genre.id}
            } else {
                return genre;
            }
        })]);

        const updatedSelectedMovieGenres = selectedMovieGenres.filter(genre => genre.selectedGenreId !== previousValue);
        updatedSelectedMovieGenres.push({dropdownId: dropdownId, selectedGenreId: selectedValue});
        setSelectedMovieGenres([...updatedSelectedMovieGenres]);
    }

    function getMovieGenreDropDown(id: number): DropdownObject {
        return {
            dropdown: <GenreField key={id} fieldId={id} availableMovieGenres={availableGenres}
                                  onSelectedValueChange={handleSelectChange}/>,
            id: id
        }
    }

    return (<style.MovieGenreContainer>
        <style.MovieGenreTitle>Gatunki:</style.MovieGenreTitle>
        {(error && <style.ValidationText>{error}</style.ValidationText>) || errorMessage && <style.ValidationText>{errorMessage}</style.ValidationText>}
        <style.ButtonsContainer>
            {elements.length > 1 && <style.IncrDecrButton onClick={(e) => onRemoveClick(e)} key={`remove-button`}>-</style.IncrDecrButton>}
            {elements.length < movieGenresArray.length &&
                <style.IncrDecrButton onClick={(e) => onAddClick(e)} key={`add-button`}>+</style.IncrDecrButton>}
        </style.ButtonsContainer>
        {elements.map(element => {
            return element.dropdown;
        })}
    </style.MovieGenreContainer>)
}

export default GenreArrayFields;