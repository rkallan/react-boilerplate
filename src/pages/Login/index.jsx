import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";
import { login } from "features/authentication";
import { setUser } from "features/user/userSlice";
import styles from "./resources/styles/login.module.scss";
import loginFormObject from "./constants/loginForm";

const Form = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library/Form"), {
    fallback: <Loading />,
});

const Notification = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library/Notification"), {
    fallback: <Loading />,
});

const Login = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation("loginForm");
    const formData = loginFormObject();
    const [errorMessage, setErrorMessage] = useState(undefined);

    const customSubmitHandler = async (response) => {
        if (!response.ok || "error" in response) return setErrorMessage(response.error.message);
        const { email, password } = response.data;
        const responseData = await login({ email, password });

        if (("code", "message" in responseData)) return setErrorMessage(responseData.message);

        const { user } = responseData;
        const userObject = {
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
        };
        dispatch(setUser(userObject));

        return true;
    };

    return (
        <>
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
            </div>
        </>
    );
};

export default Login;
