import React from "react";
import {IForm} from "features/register/RegisterForm/RegisterForm";
import * as user_pb from "generated/user/user_pb";
import {ServiceError} from "generated/user/user_pb_service";

export interface IAuth {
    authData: string | null,
    signUp: (formData: IForm, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => void,
    signIn: (formData: IForm) => void,
    signOut: () => void
}

const AuthContext = React.createContext <IAuth>({
    authData: null,
    signUp: (formData: IForm, callback: (error: ServiceError | null, responseMessage: user_pb.RegisterResponse | null) => void) => {
    },
    signIn: (formData: IForm) => {
    },
    signOut: () => {
    }
});

export default AuthContext;