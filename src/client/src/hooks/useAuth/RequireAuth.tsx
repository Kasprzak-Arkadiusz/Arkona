import React, {useEffect, useState} from "react";
import useAuth from "hooks/useAuth/useAuth";
import {Navigate, useLocation, Outlet, useNavigate} from "react-router-dom";
import {UserClient} from "generated/user/user_pb_service";
import {RefreshJwtRequest} from "generated/user/user_pb";
import {setStorageItem} from "utils/storage";
import {accessTokenKey} from "utils/storageItemKeys";

interface IProps {
    children?: React.ReactNode;
    role?: string | undefined
}

const RequireAuth = ({role, children}: IProps): JSX.Element => {
    const userClient = new UserClient(process.env.REACT_APP_SERVER_URL!);
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const auth = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.authData) {
            navigate("/access-denied", {state: location, replace: true})
            return;
        }

        if (isTokenExpired()) {
            const request = new RefreshJwtRequest();
            request.setUserid(auth.authData.nameid);

            userClient.refreshJwt(request, (error, responseMessage) => {
                if (responseMessage === null || responseMessage === undefined) {
                    auth.signOut();
                    return <Navigate to="/login" state={{from: location}} replace/>;
                } else {
                    setStorageItem(accessTokenKey, responseMessage.getAccesstoken());
                    setIsLoaded(true);
                }
            })
        } else {
            setIsLoaded(true);
        }
        
    }, [])

    const isTokenExpired = () => {
        if (auth.authData === null) {
            return true;
        }

        const decodedToken = auth.authData;

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

    if (isWrongRole()) {
        return <Navigate to="/access-denied" state={{from: location}} replace/>;
    }

    return children === undefined || !isLoaded ? <Outlet/> : <div>{children}</div>
};

export default RequireAuth;