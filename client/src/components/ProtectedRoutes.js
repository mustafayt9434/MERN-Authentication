import React from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const {token} = useSelector(state => state.users);
    return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoutes;
