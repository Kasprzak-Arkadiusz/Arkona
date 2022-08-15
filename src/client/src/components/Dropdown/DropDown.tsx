import React from 'react';
import * as style from './styled'

interface Props {
    label: string,
    values: Map<string, number>
    onChangeHandler: (value: string) => void
}


function Dropdown({label, values, onChangeHandler}: Props) {
    const onChangePrivateHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChangeHandler(event.target.value);
    };
    
    return (
        <style.SelectContainer>
            <style.SelectLabel>{label}</style.SelectLabel>
            <style.Select defaultValue={"default"} onChange={onChangePrivateHandler}>
                <option value={"default"}></option>
                {Array.from(values).map(([key, value]) => {
                    return <option value={value} label={key} key={key}></option>
                })}
            </style.Select>
        </style.SelectContainer>
    );
}

export default Dropdown;
