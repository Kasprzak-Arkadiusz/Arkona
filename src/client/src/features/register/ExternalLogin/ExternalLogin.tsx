import React from 'react';
import * as style from './styled'

interface Props {
    providerName: string;
    buttonText: string;
    imgSource: string;
}

function ExternalLogin({providerName, buttonText, imgSource}: Props) {
    return (
        <style.button name={providerName}>
            <style.image src={imgSource} alt=""/>
            <style.text name={providerName}>{buttonText}</style.text>
        </style.button>
    );
}

export default ExternalLogin;
