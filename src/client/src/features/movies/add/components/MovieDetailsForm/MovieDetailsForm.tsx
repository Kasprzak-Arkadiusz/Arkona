import React from 'react';
import {SubmitHandler, useForm, Validate} from "react-hook-form";
import * as style from "./styled";
import {ValidateResult} from "react-hook-form/dist/types/validator";
import {toISODateString} from "../../../../../utils/dateUtils";

export type Inputs = {
    title: string,
    releaseDate: Date,
    duration: number,
    description: string,
    ageRestrictionId: number
};

interface Props {

}

function MovieDetailsForm() {
    const {
        register,
        setError,
        clearErrors,
        getValues,
        handleSubmit,
        formState: {errors}
    } = useForm<Inputs>({mode: "all", criteriaMode: "all"});

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    const validateReleaseDate: Validate<Date> = (providedDate: Date): ValidateResult => {
        if (providedDate.setHours(0,0,0,0) >= (new Date).setHours(0, 0, 0, 0)) {
            const errorMessage = "Wybrana data musi być z przeszłości";
            setError("releaseDate", {type: "validate", message: errorMessage});
            return errorMessage;
        }
    }
    
    return (
        <style.FormContainer onSubmit={handleSubmit((data) => console.log(JSON.stringify(data)))}>
            <style.InputContainer>
                {errors.title && <style.ValidationText>{errors.title.message}</style.ValidationText>}
                <style.Label>Tytuł:</style.Label>
                <style.Input {...register("title", {
                    required: {value: true, message: "Pole tytuł jest wymagane"},
                    maxLength: {value: 100, message: "Tytuł nie może być dłuższy niż 100 znaków"}
                })} type="text"/>
                {errors.releaseDate && <style.ValidationText>{errors.releaseDate.message}</style.ValidationText>}
                <style.Label>Data premiery:</style.Label>
                <style.Input value={toISODateString(new Date())} {...register("releaseDate", {
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
                    <option value="0">Bez ograniczeń</option>
                    <option value="3">3 lata</option>
                    <option value="7">7 lat</option>
                    <option value="12">12 lat</option>
                    <option value="15">15 lat</option>
                </style.Select>
                <style.SearchButton>Utwórz</style.SearchButton>
            </style.InputContainer>
        </style.FormContainer>
    )
}

export default MovieDetailsForm;