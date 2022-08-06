import React from 'react';
import SectionContainer from 'components/SectionContainer/SectionContainer'
import IconTitle from "components/IconTitle/IconTitle";
import {SearchIcon} from "assets/icons/SearchIcon";
import {CalendarIcon} from "assets/icons/CalendarIcon";
import SearchField from "./SearchField"
import * as style from "./styled";

function MovieSearchBar() {
    return <SectionContainer>
        <IconTitle Component={SearchIcon} width={"24px"} height={"22px"} title="Szukaj"/>
        <style.SearchForm>
            <style.SearchFieldsContainer>
                <style.SearchColumn>
                    <SearchField label={"Tytuł:"}/>
                    <SearchField label={"Ograniczenie wiekowe:"}/>
                </style.SearchColumn>
                <style.SearchColumn>
                    <SearchField label={"Gatunek:"}/>
                    <style.DateInputContainer>
                        <style.CalendarIconContainer>
                            <CalendarIcon/>
                        </style.CalendarIconContainer>
                        <SearchField label={"Data:"}/>
                    </style.DateInputContainer>
                </style.SearchColumn>
            </style.SearchFieldsContainer>
            <style.SearchButton>Szukaj</style.SearchButton>
        </style.SearchForm>
    </SectionContainer>;
}

export default MovieSearchBar;
