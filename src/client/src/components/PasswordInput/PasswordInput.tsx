import React, {ReactElement} from 'react';
import {useState} from 'react';
import {PasswordHiddenIcon} from './PasswordHiddenIcon';
import {PasswordShownIcon} from './PasswordShownIcon';
import * as style from './styled'

interface IProps {
    validationText: string[],
    label: string
    name: string,
    handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}

const PasswordInput = ({validationText, label, name, handleChange}: IProps) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const renderValidationText = () => {
        if (validationText.length) {
            return <style.validationText>
                {validationText.map((item: string, index: number): ReactElement => {
                    return <li key={`${item}-${index}`}>{item}</li>
                })}
            </style.validationText>;
        }
    }
    
    return (
        <style.container>
            {renderValidationText()}
            <style.label>{label}</style.label>
            <style.input
                name={name}
                type={passwordShown ? 'text' : 'password'}
                onChange={handleChange}
            />
            <style.iconContainer onClick={togglePassword}>
                {passwordShown ? (
                    <PasswordShownIcon/>
                ) : (
                    <PasswordHiddenIcon/>
                )}
            </style.iconContainer>
        </style.container>
    );
};

export default PasswordInput;
