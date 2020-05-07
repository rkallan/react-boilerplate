import React from "react";
import { Link, useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";
import styles from "./resources/styles/header.module.scss";

const Logout = loadable(() => import(/* webpackChunkName: "Logout" */ "features/authentication/Logout"), {
    fallback: <Loading />,
});

const Header = () => {
    const referer = useLocation();
    return (
        <header className={styles.container}>
            Header component
            <nav>
                <ul style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <li>
                        <Link to={{ pathname: `${process.env.PUBLIC_URL}/login`, state: { referer } }}>Login Page</Link>
                    </li>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/`}>Homepage</Link>
                    </li>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/form`}>Form</Link>
                    </li>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/test`}>Test</Link>
                    </li>
                    <li>
                        <Logout />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
