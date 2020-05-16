import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";
import styles from "./resources/styles/header.module.scss";

const Logout = loadable(() => import(/* webpackChunkName: "Logout" */ "features/authentication/Logout"), {
    fallback: <Loading />,
});

const Header = () => {
    const referer = useLocation();
    const onClickEventHandler = (event) => {
        if (event.currentTarget.className.split(" ").includes("is-active")) {
            event.preventDefault();
        }
    };
    return (
        <header className={styles.container}>
            Header component
            <nav>
                <ul style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                    <li>
                        <NavLink
                            activeClassName="is-active"
                            onClick={onClickEventHandler}
                            to={{ pathname: `${process.env.PUBLIC_URL}/login`, state: { referer } }}
                        >
                            Login Page
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="is-active" onClick={onClickEventHandler} exact to={`${process.env.PUBLIC_URL}/`}>
                            Homepage
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="is-active" onClick={onClickEventHandler} to={`${process.env.PUBLIC_URL}/form`}>
                            Form
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="is-active" onClick={onClickEventHandler} to={`${process.env.PUBLIC_URL}/test`}>
                            Test
                        </NavLink>
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
