import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm, Validate} from "react-hook-form";
import * as style from "./styled";
import {ValidateResult} from "react-hook-form/dist/types/validator";
import {AgeRestrictions} from "utils/CustomTypes/AgeRestrictions";
import GenreArrayFields from "../GenreArrayFields/GenreArrayFields";
import {toDateInputValue} from "../../../../../utils/dateUtils";
import {useNavigate} from "react-router-dom";

export type Inputs = {
    title: string,
    releaseDate: Date,
    duration: number,
    description: string,
    ageRestrictionId: number
};

interface Props {
    handleFormSubmit: (data: Inputs, selectedMovieGenreIds: Array<number>) => void,
    initialInputs?: Inputs,
    initialMovieGenreIds?: Array<number>,
    buttonText: string,
}

function MovieDetailsForm({handleFormSubmit, initialInputs, initialMovieGenreIds, buttonText}: Props) {
    const navigate = useNavigate();
    const [selectedMovieGenreIds, setSelectedMovieGenreIds] = useState<Array<number>>(
        initialMovieGenreIds === undefined || initialMovieGenreIds.length === 0
            ? new Array<number>() : initialMovieGenreIds);
    const [genreError, setGenreError] = useState<string | null>(null);
    const {register, setError, handleSubmit, getValues, reset, formState: {errors}} =
        useForm<Inputs>(initialInputs === undefined
            ? {mode: "all", criteriaMode: "all"} : {
                mode: "all", criteriaMode: "all", defaultValues: {
                    title: initialInputs.title,
                    duration: initialInputs.duration,
                    releaseDate: initialInputs.releaseDate,
                    description: initialInputs.description,
                    ageRestrictionId: initialInputs.ageRestrictionId
                }
            }
        );

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (genreError !== null) {
            return
        }

        handleFormSubmit(data, selectedMovieGenreIds);
    };
    
    const onReturnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        navigate(-1);
    }

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
        if (initialInputs !== undefined) {
            reset()
        }
    }, [initialInputs])

    return (
        <style.FormContainer onSubmit={handleSubmit((data) => onSubmit(data))}>
            <style.InputContainer>
                {errors.title && <style.ValidationText>{errors.title.message}</style.ValidationText>}
                <style.Label>Tytuł:</style.Label>
                <style.Input {...register("title", {
                    required: {value: true, message: "Pole tytuł jest wymagane"},
                    maxLength: {value: 100, message: "Tytuł nie może być dłuższy niż 100 znaków"}
                })} type="text" defaultValue={initialInputs?.title ? initialInputs.title : ''}/>
                {errors.releaseDate && <style.ValidationText>{errors.releaseDate.message}</style.ValidationText>}
                <style.Label>Data premiery:</style.Label>
                <style.Input  {...register("releaseDate", {
                    required: {
                        value: true,
                        message: "Pole data premiery jest wymagane"
                    }, valueAsDate: true,
                    validate: validateReleaseDate
                })}
                              type="date"
                              value={initialInputs?.releaseDate ? toDateInputValue(initialInputs.releaseDate) : toDateInputValue(new Date())}/>
                {errors.duration && <style.ValidationText>{errors.duration.message}</style.ValidationText>}
                <style.Label>Czas trwania [min]:</style.Label>
                <style.Input {...register("duration", {
                    required: {
                        value: true,
                        message: "Pole czas trwania jest wymagane"
                    },
                    max: {value: 300, message: "Maksymalna dozwolona wartość to 300"},
                    min: {value: 1, message: "Minimalna dozwolona wartość to 1"}
                })} type="number" value={initialInputs?.duration ? initialInputs.duration : ''}/>
                {errors.description && <style.ValidationText>{errors.description.message}</style.ValidationText>}
                <style.Label>Opis:</style.Label>
                <style.DescriptionArea {...register("description", {
                    required: {
                        value: true,
                        message: "Pole opis jest wymagane"
                    }
                })} value={initialInputs?.description ? initialInputs.description : ''}/>
                {errors.ageRestrictionId &&
                    <style.ValidationText>{errors.ageRestrictionId.message}</style.ValidationText>}
                <style.Label>Ograniczenie wiekowe:</style.Label>
                <style.Select {...register("ageRestrictionId", {
                    required: {
                        value: true,
                        message: "Pole ograniczenie wiekowe jest wymagane"
                    }
                })} value={initialInputs?.ageRestrictionId ? initialInputs.ageRestrictionId : ''}>
                    {Array.from(AgeRestrictions).map(([key, value]) => {
                        return <option value={value} label={key} key={key}></option>
                    })}
                </style.Select>
                <GenreArrayFields onSelectChange={setSelectedMovieGenreIds} errorMessage={genreError}
                                  initialMovieGenreIds={initialMovieGenreIds}/>
                <style.SearchButton onClick={onReturnClick}>Wróć</style.SearchButton>
                <style.SearchButton>{buttonText}</style.SearchButton>
            </style.InputContainer>
        </style.FormContainer>
    )
}

export default MovieDetailsForm;