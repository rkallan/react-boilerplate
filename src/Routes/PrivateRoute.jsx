import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "features/authentication/hooks/useAuth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const auth = useAuth();

    return (
        <Route
            {...rest}
            render={(routeProps) => {
                if (auth) return <Component {...routeProps} />;

                return <Redirect to={{ pathname: "/login", state: { referer: routeProps.location } }} />;
            }}
        />
    );
};

PrivateRoute.propTypes = {
    component: PropTypes.shape({
        $$typeof: PropTypes.symbol,
        load: PropTypes.func,
        preload: PropTypes.func,
        render: PropTypes.func,
    }).isRequired,
};

export default PrivateRoute;
