import React from "react";
import {Inputs} from "features/register/RegisterForm/RegisterForm";
import * as user_pb from "generated/user/user_pb";
import {ServiceError} from "generated/user/user_pb_service";
import {RegisterResponse} from "generated/user/user_pb";

export interface IAuth {
    authData: RegisterResponse.AsObject | null,
    signUp: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => void,
    signIn: (formData: Inputs) => void,
    signOut: () => void
}

const AuthContext = React.createContext <IAuth>({
    authData: null,
    signUp: (formData: Inputs, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => {
    },
    signIn: (formData: Inputs) => {
    },
    signOut: () => {
    }
});

export default AuthContext;