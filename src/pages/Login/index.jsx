import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";
import { useLocalStorage } from "rkallan-react-hooks";
import { decodeToken } from "rkallan-javascript-helpers";
import { setAuthentication } from "features/authentication/authenticationSlice";
import { getLoginDetails } from "features/authentication/authenticationSelector";
import styles from "./resources/styles/login.module.scss";

import loginFormObject from "./constants/loginForm";

const Form = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library/Form"), {
    fallback: <Loading />,
});

const Notification = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library/Notification"), {
    fallback: <Loading />,
});

const Login = () => {
    const { t } = useTranslation("loginForm");
    const dispatch = useDispatch();
    const [getJwtToken, setJwtToken] = useLocalStorage("token");
    const [getSessionCreationDate, setSessionCreationDate] = useLocalStorage("sessionCreationDate");
    const formData = loginFormObject();
    const [errorMessage, setErrorMessage] = useState(undefined);
    const loginDetails = useSelector(getLoginDetails);

    if (loginDetails.loginStatus === 0 && getJwtToken) {
        const { payload } = decodeToken(getJwtToken);
        dispatch(setAuthentication({ loginStatus: 1, token: getJwtToken, sessionCreationDate: getSessionCreationDate, ...payload }));
    }

    const customSubmitHandler = async (response) => {
        const responseData = await response;
        if (!responseData.ok) {
            const error = await responseData.error();
            setErrorMessage(error.message);

            return;
        }

        const data = await responseData.json();

        dispatch(setAuthentication(data));
        setJwtToken(data.token);
        setSessionCreationDate(data.sessionCreationDate);
    };

    return (
        <>
            <div className={styles.content} variant="container">
                <h1>{t("Login page")}</h1>
                <article>
                    <Form {...formData} customSubmitHandler={customSubmitHandler} />
                    {errorMessage && (
                        <Notification variant="error">
                            <p>{errorMessage}</p>
                        </Notification>
                    )}
                </article>
                <Link to={`${process.env.PUBLIC_URL}/test`}>Test Page</Link>
            </div>
        </>
    );
};

export default Login;
