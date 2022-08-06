import * as style from "./styled";
import React from "react";

interface Props {
    label?: string
}

function SearchField({label}: Props) {
    return <style.SearchInputContainer>
        {label && <style.SearchLabel>{label}</style.SearchLabel>} 
        <style.SearchInput></style.SearchInput>
    </style.SearchInputContainer> 
}

export default SearchField;