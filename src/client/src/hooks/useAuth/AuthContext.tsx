import React from "react";
import {Inputs} from "features/register/RegisterForm/RegisterForm";
import {ServiceError} from "generated/user/user_pb_service";
import { AuthenticationResponse} from "generated/user/user_pb";
import {Provider} from "./AuthProvider";

export interface IAuth {
    authData: AuthenticationResponse.AsObject | null,
    signUp: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => void,
    signIn: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => void,
    externalSignUp: (accessToken: string, provider: Provider,
                     callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => void,
    signOut: () => void
}

const AuthContext = React.createContext <IAuth>({
    authData: null,
    signUp: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
    },
    signIn: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
    },
    externalSignUp: (accessToken: string, provider: Provider,
                     callback: (error: ServiceError | null, responseMessage: AuthenticationResponse | null) => void) => {
    },
    signOut: () => {
    }
});

export default AuthContext;