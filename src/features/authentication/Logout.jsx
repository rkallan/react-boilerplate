import React from "react";
import { useHistory } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { logout } from ".";

const Logout = () => {
    const auth = useAuth();
    const history = useHistory();

    const onClickHandler = () => {
        logout();
        history.push("/login");
    };

    if (!auth) return null;

    return (
        <button type="button" onClick={onClickHandler}>
            Logout
        </button>
    );
};

export default Logout;
