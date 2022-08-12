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

function MovieSearchBar() {
    const [title, setTitle] = useState<string>();
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [ageRestriction, setAgeRestriction] = useState<string>();
    const [movieGenre, setMovieGenre] = useState<string>();

    return <SectionContainer>
        <IconTitle Component={SearchIcon} width={"24px"} height={"22px"} title="Szukaj"/>
        <style.SearchForm>
            <style.SearchFieldsContainer>
                <style.SearchColumn>
                    <SearchField label={"Tytuł:"} onChangeHandler={setTitle}/>
                    <Dropdown label={"Ograniczenie wiekowe:"} values={AgeRestrictions}
                              onChangeHandler={setAgeRestriction}></Dropdown>
                </style.SearchColumn>
                <style.SearchColumn>
                    <Dropdown label={"Gatunek"} values={MovieGenres}
                              onChangeHandler={setMovieGenre}></Dropdown>
                    <CustomDatePicker selectedDate={startDate} onChangeHandler={setStartDate}
                                      onClearOutput={setStartDate}></CustomDatePicker>
                </style.SearchColumn>
            </style.SearchFieldsContainer>
            <style.SearchButton>Szukaj</style.SearchButton>
        </style.SearchForm>
    </SectionContainer>;
}

export default MovieSearchBar
;
