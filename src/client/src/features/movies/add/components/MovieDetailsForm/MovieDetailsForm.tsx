import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm, Validate} from "react-hook-form";
import * as style from "./styled";
import {ValidateResult} from "react-hook-form/dist/types/validator";
import {AgeRestrictions} from "utils/CustomTypes/AgeRestrictions";
import GenreArrayFields from "../GenreArrayFields/GenreArrayFields";

export type Inputs = {
    title: string,
    releaseDate: Date,
    duration: number,
    description: string,
    ageRestrictionId: number
};

interface Props {
    handleFormSubmit: (data: Inputs, selectedMovieGenreIds: Array<number>) => void
}

function MovieDetailsForm({handleFormSubmit}: Props) {
    const [selectedMovieGenreIds, setSelectedMovieGenreIds] = useState<Array<number>>(new Array<number>());
    const [genreError, setGenreError] = useState<string | null>(null);
    const {
        register,
        setError,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({mode: "all", criteriaMode: "all"});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(selectedMovieGenreIds);
        if (genreError !== null) {
            return
        }

        handleFormSubmit(data, selectedMovieGenreIds);
    };

    const validateReleaseDate: Validate<Date> = (providedDate: Date): ValidateResult => {
        if (providedDate.setHours(0, 0, 0, 0) >= (new Date).setHours(0, 0, 0, 0)) {
            const errorMessage = "Wybrana data musi być z przeszłości";
            setError("releaseDate", {type: "validate", message: errorMessage});
            return errorMessage;
        }
    }

    useEffect(() => {        
        if (selectedMovieGenreIds.length === 0) {
            setGenreError("Pole gatunki jest wymagane")
            return
        }
        
        setGenreError(null);
    }, [selectedMovieGenreIds]);
    
    useEffect(() => {
        console.log(genreError);
    }, [genreError])

    return (
        <style.FormContainer onSubmit={handleSubmit((data) => onSubmit(data))}>
            <style.InputContainer>
                {errors.title && <style.ValidationText>{errors.title.message}</style.ValidationText>}
                <style.Label>Tytuł:</style.Label>
                <style.Input {...register("title", {
                    required: {value: true, message: "Pole tytuł jest wymagane"},
                    maxLength: {value: 100, message: "Tytuł nie może być dłuższy niż 100 znaków"}
                })} type="text"/>
                {errors.releaseDate && <style.ValidationText>{errors.releaseDate.message}</style.ValidationText>}
                <style.Label>Data premiery:</style.Label>
                <style.Input  {...register("releaseDate", {
                    required: {
                        value: true,
                        message: "Pole data premiery jest wymagane"
                    }, valueAsDate: true,
                    validate: validateReleaseDate
                })}
                              type="date"/>
                {errors.duration && <style.ValidationText>{errors.duration.message}</style.ValidationText>}
                <style.Label>Czas trwania [min]:</style.Label>
                <style.Input {...register("duration", {
                    required: {
                        value: true,
                        message: "Pole czas trwania jest wymagane"
                    },
                    max: {value: 300, message: "Maksymalna dozwolona wartość to 300"},
                    min: {value: 1, message: "Minimalna dozwolona wartość to 1"}
                })} type="number"/>
                {errors.description && <style.ValidationText>{errors.description.message}</style.ValidationText>}
                <style.Label>Opis:</style.Label>
                <style.DescriptionArea {...register("description", {
                    required: {
                        value: true,
                        message: "Pole opis jest wymagane"
                    }
                })}/>
                {errors.ageRestrictionId &&
                    <style.ValidationText>{errors.ageRestrictionId.message}</style.ValidationText>}
                <style.Label>Ograniczenie wiekowe:</style.Label>
                <style.Select {...register("ageRestrictionId", {
                    required: {
                        value: true,
                        message: "Pole ograniczenie wiekowe jest wymagane"
                    }
                })}>
                    {Array.from(AgeRestrictions).map(([key, value]) => {
                        return <option value={value} label={key} key={key}></option>
                    })}
                </style.Select>
                <GenreArrayFields onSelectChange={setSelectedMovieGenreIds} errorMessage={genreError}/>
                <style.SearchButton>Utwórz</style.SearchButton>
            </style.InputContainer>
        </style.FormContainer>
    )
}

export default MovieDetailsForm;