import styled from "styled-components";
import DatePicker from "react-datepicker";

export const SearchLabel = styled.label`
    margin: auto 5px auto auto;
    max-width: 90px;
    
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    text-align: right;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const DateInputContainer = styled.div`
    display: flex;
    margin: 0px auto;
    
    @media only screen and (max-width: 840px) {
        justify-content: center;
        align-items: center;
    }
`

export const CalendarIconContainer = styled.div`
    margin: 7.5px 5px auto auto;
    user-select: none;
`

export const DatePickerWrapper = styled(DatePicker)`
    height: 25px;
    width: 165px;
    margin: 5px;
    border: 0;
    border-radius: 15px;
    padding: 0 10px;
    text-align: center;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 1px;
    user-select: none;

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
    background: #c4c4c4;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
    
    @media only screen and (max-width: 840px) {
        width: 155px;
    }
`

export const ClearOutputButton = styled.button`
    width: fit-content;
    height: fit-content;
    margin: auto;
    
    font-size: 12px;
    border: 0;
    border-radius: 10px;
    color: ${props => props.theme.Palette.textMain};
    background-color: ${props => props.theme.Palette.gray};
    
    @media only screen and (max-width: 840px) {
        margin: auto  5px;
    }
`