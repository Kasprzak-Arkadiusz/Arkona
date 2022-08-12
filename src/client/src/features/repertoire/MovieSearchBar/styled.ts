import styled from "styled-components";

export const SearchForm = styled.form`
    height: auto;
    display: flex;
    padding: 10px 20px 10px 20px;
    flex-wrap: wrap;
    
    @media only screen and (max-width: 840px) {
        display: block;
        width: fit-content;
        margin: auto;
    }
`

export const SearchInputContainer = styled.div`
    width: auto;
    display: flex;
    margin: 5px 0px;
    
    @media only screen and (max-width: 840px) {
        margin: 0px 0px 5px;
    }
`

export const SearchFieldsContainer = styled.div`
    display: flex;
    width: 100%;
    
    @media only screen and (max-width: 840px) {
        display: block;
        width: fit-content;
        margin: auto;
    }
`

export const SearchColumn = styled.div`
    display: block;
    margin:auto;
    
    @media only screen and (max-width: 840px) {
        width: auto;
    }
`

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

export const SearchInput = styled.input`
    height: 25px;
    max-width: 180px;
    width: auto;
    margin: 5px;
    display: inherit;
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

    color: ${props => props.theme.Palette.textMain};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
    background: #c4c4c4;
    box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.5);
`

export const SearchButton = styled.button`
    width: 90px;
    height: 24px;
    border-radius: 15px;
    border: 0;
    margin: 10px auto;

    font-family: ${props => props.theme.Fonts.casual};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    text-decoration: none;

    color: ${props => props.theme.Palette.textMain};
    background-color: ${props => props.theme.Palette.gray};
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.85);
`

