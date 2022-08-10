import React, {useState} from 'react';
import SectionContainer from 'components/SectionContainer/SectionContainer'
import IconTitle from "components/IconTitle/IconTitle";
import {SearchIcon} from "assets/icons/SearchIcon";
import {CalendarIcon} from "assets/icons/CalendarIcon";
import SearchField from "./SearchField"
import * as style from "./styled";
import GenreDropdown from "../Dropdown/GenreDropdown";
import AgeRestrictionDropdown from "../Dropdown/AgeRestrictionDropdown";
import "react-datepicker/dist/react-datepicker.css";
import "./style.css"

function MovieSearchBar() {
    const [startDate, setStartDate] = useState<Date | null>(new Date());

    return <SectionContainer>
        <IconTitle Component={SearchIcon} width={"24px"} height={"22px"} title="Szukaj"/>
        <style.SearchForm>
            <style.SearchFieldsContainer>
                <style.SearchColumn>
                    <SearchField label={"Tytuł:"}/>
                    <AgeRestrictionDropdown/>
                </style.SearchColumn>
                <style.SearchColumn>
                    <GenreDropdown/>
                    <style.DateInputContainer>
                        <style.CalendarIconContainer>
                            <CalendarIcon/>
                        </style.CalendarIconContainer>
                        <style.SearchLabel>Data:</style.SearchLabel>
                        <style.DatePickerWrapper selected={startDate}
                                                 onChange={(date: Date | null) => setStartDate(date)}
                            wrapperClassName={"custom-datepicker-input-container"}>
                        </style.DatePickerWrapper>
                        <style.ClearOutputButton onClick={(e) => {
                            e.preventDefault();
                            setStartDate(null)
                        }}>X
                        </style.ClearOutputButton>
                    </style.DateInputContainer>
                </style.SearchColumn>
            </style.SearchFieldsContainer>
            <style.SearchButton>Szukaj</style.SearchButton>
        </style.SearchForm>
    </SectionContainer>;
}

export default MovieSearchBar
;
