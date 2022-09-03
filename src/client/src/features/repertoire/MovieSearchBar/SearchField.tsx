import * as style from "./styled";
import React from "react";

interface Props {
    label?: string
    onChangeHandler: (value: string) => void
}

function SearchField({label, onChangeHandler}: Props) {
    const onChangePrivateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeHandler(event.target.value);
    };
    
    return <style.SearchInputContainer>
        {label && <style.SearchLabel>{label}</style.SearchLabel>} 
        <style.SearchInput onChange={onChangePrivateHandler}></style.SearchInput>
    </style.SearchInputContainer> 
}

export default SearchField;