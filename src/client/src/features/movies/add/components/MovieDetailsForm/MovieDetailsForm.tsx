import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import * as style from "./styled";

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

    return (
        <style.FormContainer>
            <style.InputContainer>
                <style.Label>Tytuł:</style.Label>
                <style.Input {...register("title", {required: true, maxLength: 100})} type="text"/>
                <style.Label>Data premiery:</style.Label>
                <style.Input {...register("releaseDate", {required: true, valueAsDate: true})} type="date"/>
                <style.Label>Czas trwania [min]:</style.Label>
                <style.Input {...register("duration", {required: true, max:300, min: 1})} type="number"/>
                <style.Label>Opis:</style.Label>
                <style.DescriptionArea {...register("description", {required: true})}/>
                <style.Label>Ograniczenie wiekowe:</style.Label>
                <style.Select {...register("ageRestrictionId", {required: true})}>
                    <option value="0">Bez ograniczeń</option>
                    <option value="3">3 lata</option>
                    <option value="7">7 lat</option>
                    <option value="12">12 lat</option>
                    <option value="15">15 lat</option>
                </style.Select>
            </style.InputContainer>
        </style.FormContainer>
    )
}

export default MovieDetailsForm;