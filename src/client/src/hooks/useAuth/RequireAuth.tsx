import React from "react";
import useAuth from "hooks/useAuth/useAuth";
import {Navigate, useLocation, Outlet} from "react-router-dom";
import jwtDecode from "jwt-decode";
import {CustomJwtPayload} from "utils/CustomTypes/CustomJwtPayload";

interface IProps {
    children?: React.ReactNode;
    role?: string | undefined
}

const RequireAuth = ({role, children}: IProps): JSX.Element => {
    const auth = useAuth();
    const location = useLocation();

    const isTokenExpired = () => {
        if (auth.authData === null) {
            return true;
        }

        const accessToken = auth.authData.accesstoken;
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);

        if (decodedToken.exp === undefined) {
            return true;
        }

        return decodedToken.exp * 1000 < new Date().getTime();
    };

    const isWrongRole = () => {
        if (role === undefined) {
            return false;
        }

        return auth.authData?.role.toLowerCase() !== role;
    };

    if (!auth.authData) {
        return <Navigate to="/signIn" state={{from: location}} replace/>;
    }

    if (isTokenExpired()) {
        auth.signOut();
        return <Navigate to="/signIn" state={{from: location}} replace/>;
    }

    if (isWrongRole()) {
        return <Navigate to="/" state={{from: location}} replace/>;
    }

    return children === undefined ? <Outlet/> : <div>{children}</div>
};

export default RequireAuth;