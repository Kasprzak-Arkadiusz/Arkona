import React from "react";
import {FieldError, Message} from "react-hook-form";
import {ValidationText} from "assets/styles/formStyle";

interface IProps{
    errors: (FieldError | undefined)
}

function ValidationTexts({errors}: IProps){
        if (errors === undefined || errors.types === undefined) {
            return <></>;
        }

        let errorArray: JSX.Element[] = [];

        if (errors.types.required) {
            errorArray.push(<ValidationText key={"requiredField"}>{errors.types.required}</ValidationText>)
            return <div>{errorArray}</div>
        }

        if (typeof (errors.types?.validate) === "string") {
            errorArray.push(<ValidationText key={"singleValidate"}>{errors.types.validate}</ValidationText>)
            return <div>{errorArray}</div>
        }

        let messageArray = errors.types?.validate as Message[];
        errorArray = messageArray.map((item, index) => {
            return <ValidationText key={index}>{item}</ValidationText>
        })

        return <div>{errorArray}</div>
}

export default ValidationTexts;