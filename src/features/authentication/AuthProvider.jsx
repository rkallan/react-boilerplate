import React from "react";
import PropTypes from "prop-types";
import useAuthProvider from "./hooks/useAuthProvider";
import authContext from "./authContext";

function AuthProvider({ children }) {
    const { initializing, user } = useAuthProvider();

    if (initializing) return <div> Loading </div>;

    return <authContext.Provider value={user}>{children}</authContext.Provider>;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
