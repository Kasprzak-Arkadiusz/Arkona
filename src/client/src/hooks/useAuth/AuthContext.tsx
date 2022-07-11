import React from "react";
import {Inputs} from "features/register/RegisterForm/RegisterForm";
import * as user_pb from "generated/user/user_pb";
import {ServiceError} from "generated/user/user_pb_service";
import {ExternalRegisterRequest, RegisterResponse} from "generated/user/user_pb";
import {Provider} from "./AuthProvider";

export interface IAuth {
    authData: RegisterResponse.AsObject | null,
    signUp: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => void,
    signIn: (formData: Inputs) => void,
    externalSignUp: (accessToken: string, provider: Provider,
                     callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => void,
    signOut: () => void
}

const AuthContext = React.createContext <IAuth>({
    authData: null,
    signUp: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => {
    },
    signIn: (formData: Inputs) => {
    },
    externalSignUp: (accessToken: string, provider: Provider,
                     callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => {
    },
    signOut: () => {
    }
});

export default AuthContext;