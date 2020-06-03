import React, { useState } from "react";
import { Link, useHistory, Redirect, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library-loc";
import { login } from "features/authentication";
import useAuth from "features/authentication/hooks/useAuth";
import styles from "./resources/styles/login.module.scss";
import loginFormObject from "./constants/loginForm";

const Form = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library-loc/Form"), {
    fallback: <Loading />,
});

const Notification = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library-loc/Notification"), {
    fallback: <Loading />,
});

const Login = () => {
    const { t } = useTranslation("loginForm");
    const formData = loginFormObject();
    const [errorMessage, setErrorMessage] = useState(undefined);
    const history = useHistory();
    const auth = useAuth();
    const location = useLocation();
    const redirectTo =
        location.state && "referer" in location.state && "pathname" in location.state.referer ? location.state.referer.pathname : "/";
    window.customAppVariable.usedLogoutButton = false;

    const customSubmitHandler = async (response) => {
        if (!response.ok || "error" in response) return setErrorMessage(response.error.message);
        const { email, password } = response.data;
        const responseData = await login({ email, password });

        if (("code", "message" in responseData)) return setErrorMessage(responseData.message);
        history.push(history.action === "POP" ? "/" : redirectTo, undefined);
        return true;
    };

    if (auth) {
        return <Redirect to={{ pathname: redirectTo, state: undefined }} />;
    }

    return (
        <div className={styles.content} variant="container">
            <h1>{t("Login page")}</h1>
            <article>
                <Form {...formData} customSubmitHandler={customSubmitHandler} postFormWithApiCall={false} />
                {errorMessage && (
                    <Notification variant="error">
                        <p>{errorMessage}</p>
                    </Notification>
                )}
            </article>
            <Link to={`${process.env.PUBLIC_URL}/test`}>Test Page</Link>
            <Link to={`${process.env.PUBLIC_URL}/form`}>Form Page</Link>
        </div>
    );
};

export default Login;
