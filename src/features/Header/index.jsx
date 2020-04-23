import React from "react";
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
            <Logout />
        </header>
    );
};

export default Header;
