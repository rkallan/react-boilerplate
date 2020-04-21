import React from "react";
import { Link } from "react-router-dom";
import styles from "./resources/styles/login.module.scss";

const Login = () => {
    return (
        <>
            <div className={styles.content} variant="container">
                <h1>Form login page</h1>
                <Link to={`${process.env.PUBLIC_URL}/test`}>Test Page</Link>
            </div>
        </>
    );
};

export default Login;
