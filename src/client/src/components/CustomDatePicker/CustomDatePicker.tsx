import React from 'react';
import * as style from "./styled";
import {CalendarIcon} from "assets/icons/CalendarIcon";

interface Props {
    selectedDate: Date | null,
    onChangeHandler: (date: Date | null) => void,
    onClearOutput: (date: Date | null) => void
}

function CustomDatePicker({selectedDate, onChangeHandler, onClearOutput}: Props) {
    return <style.DateInputContainer>
        <style.CalendarIconContainer>
            <CalendarIcon/>
        </style.CalendarIconContainer>
        <style.SearchLabel>Data:</style.SearchLabel>
        <style.DatePickerWrapper selected={selectedDate}
                                 onChange={onChangeHandler}
                                 wrapperClassName={"custom-datepicker-input-container"}>
        </style.DatePickerWrapper>
        <style.ClearOutputButton onClick={(e) => {
            e.preventDefault();
            onClearOutput(null)
        }}>X
        </style.ClearOutputButton>
    </style.DateInputContainer>
}

export default CustomDatePicker;