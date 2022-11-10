import React, {useState} from 'react';
import SectionContainer from 'components/SectionContainer/SectionContainer'
import IconTitle from "components/IconTitle/IconTitle";
import Dropdown from "components/Dropdown/DropDown";
import {SearchIcon} from "assets/icons/SearchIcon";
import SearchField from "./SearchField"
import * as style from "./styled";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"
import {AgeRestrictions} from 'utils/CustomTypes/AgeRestrictions'
import {MovieGenres} from 'utils/CustomTypes/MovieGenres'
import CustomDatePicker from "components/CustomDatePicker/CustomDatePicker";
import {Timestamp} from "google-protobuf/google/protobuf/timestamp_pb";

interface Props {
    onSubmitHandler: (formData: SubmitResult | null) => void;
}

export interface SubmitResult {
    title: string,
    date: Timestamp,
    ageRestriction: number,
    movieGenre: number
}

function MovieSearchBar({onSubmitHandler}: Props) {
    const onSubmitPrivateHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (title === "" && startDate === null && 
            ageRestriction === -1 && movieGenre === -1){
            onSubmitHandler(null);
            return;
        }
        
        const submitResult: SubmitResult = {
            title: title === null ? "" : title as string,
            date: Timestamp.fromDate(startDate === null ? new Date(0) : startDate),
            ageRestriction: ageRestriction === null ? -1 : ageRestriction as number,
            movieGenre: movieGenre === null ? -1 : movieGenre as number
        };
        
        onSubmitHandler(submitResult);
    }

    const [title, setTitle] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [ageRestriction, setAgeRestriction] = useState<number>(-1);
    const [movieGenre, setMovieGenre] = useState<number>(-1);

    return <SectionContainer>
        <IconTitle Component={SearchIcon} width={"24px"} height={"22px"} title="Szukaj"/>
        <style.SearchForm onSubmit={onSubmitPrivateHandler}>
            <style.SearchFieldsContainer>
                <style.SearchColumn>
                    <SearchField label={"Tytuł:"} onChangeHandler={setTitle}/>
                    <Dropdown label={"Ograniczenie wiekowe:"} values={AgeRestrictions}
                              onChangeHandler={setAgeRestriction}></Dropdown>
                </style.SearchColumn>
                <style.SearchColumn>
                    <Dropdown label={"Gatunek"} values={MovieGenres}
                              onChangeHandler={setMovieGenre}/>
                    <CustomDatePicker selectedDate={startDate} onChangeHandler={setStartDate}
                                      onClearOutput={setStartDate}/>
                </style.SearchColumn>
            </style.SearchFieldsContainer>
            <style.SearchButton>Szukaj</style.SearchButton>
        </style.SearchForm>
    </SectionContainer>;
}

export default MovieSearchBar
;
