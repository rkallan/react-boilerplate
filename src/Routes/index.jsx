import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useTransition, animated, config } from "react-spring";
import PrivateRoute from "./PrivateRoute";
import appRoutes from "./config";

import styles from "./resources/styles/routes.module.scss";

const Routes = () => {
    const location = useLocation();

    const transition = useTransition(location, {
        from: {
            position: "absolute",
            left: "-150%",
            opacity: 1,
        },
        enter: {
            position: "relative",
            left: "0%",
            opacity: 1,
        },
        leave: {
            position: "absolute",
            left: "200%",
            opacity: 0,
        },
        onChange: () => {
            window.scrollTo(0, 0);
        },
        config: config.default,
    });

    return transition((style, item) => {
        return (
            <animated.section style={style} className={styles.main} variant="unit">
                <Switch location={item}>
                    {appRoutes.map((route) => {
                        const { id, path, exact, routes, authenticated } = route;

                        if (authenticated) return <PrivateRoute key={id} {...route} />;

                        return <Route key={id} path={path} exact={exact} render={(routeProps) => <route.component {...routeProps} routes={routes} />} />;
                    })}
                </Switch>
            </animated.section>
        );
    });
};

export default Routes;
