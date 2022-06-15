import React, {useState} from "react";
import * as form from "./styled";
import PasswordInput from "components/PasswordInput/PasswordInput";
import TextInput from 'components/TextInput/TextInput'

const initialState = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    repeatPassword: "",
};

function RegisterForm() {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState({});
    
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
    };
    
    const handleSubmitButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        console.log(formData);
    }
    
    return (
        <form.Container>
            <TextInput label={"Imię:"} name={"firstName"} handleChange={handleChange}></TextInput>
            <TextInput label={"Nazwisko:"} name={"lastName"} handleChange={handleChange}></TextInput>
            <TextInput label={"Adres e-mail:"} name={"emailAddress"} handleChange={handleChange}></TextInput>
            <PasswordInput label="Hasło:" name={"password"} handleChange={handleChange}/>
            <PasswordInput label="Potwierdź hasło:" name={"repeatPassword"} handleChange={handleChange}/>
            <form.Button type="submit" onClick={handleSubmitButtonClick}>
                Utwórz konto
            </form.Button>
        </form.Container>
    )
}

export default RegisterForm