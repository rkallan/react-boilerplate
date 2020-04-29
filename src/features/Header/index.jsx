import React from "react";
import { Link } from "react-router-dom";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";
import styles from "./resources/styles/header.module.scss";

const Logout = loadable(() => import(/* webpackChunkName: "Logout" */ "features/authentication/Logout"), {
    fallback: <Loading />,
});

const Header = () => {
    return (
        <header className={styles.container}>
            Header component
            <nav>
                <ul>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/login`}>Login Page</Link>
                    </li>
                    <li>
                        <Link to={`${process.env.PUBLIC_URL}/`}>Homepage</Link>
                    </li>
                </ul>
            </nav>
            <Logout />
        </header>
    );
};

export default Header;
