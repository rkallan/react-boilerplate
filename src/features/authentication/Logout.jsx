import React from "react";
import useAuth from "./hooks/useAuth";
import { logout } from ".";

const Logout = () => {
    const auth = useAuth();

    const onClickHandler = () => {
        logout();
    };

    if (!auth) return null;

    return (
        <button type="button" onClick={onClickHandler}>
            Logout
        </button>
    );
};

export default Logout;
