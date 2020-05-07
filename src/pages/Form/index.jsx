import React, { useState, Fragment } from "react";
import { useTranslation } from "react-i18next";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library";
import styles from "./resources/styles/formPage.module.scss";
import formPageObject from "./constants/form";

const Form = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library/Form"), {
    fallback: <Loading />,
});

const Notification = loadable(() => import(/* webpackChunkName: "LoginForm" */ "rkallan-ui-library/Notification"), {
    fallback: <Loading />,
});

const FormPage = () => {
    const { t } = useTranslation("formPage");
    const formData = formPageObject();
    const [errorMessage, setErrorMessage] = useState(undefined);

    const customSubmitHandler = async (response) => {
        if (!response.ok || "error" in response) return setErrorMessage(response.error.message);

        return true;
    };

    return (
        <div className={styles.content} variant="container">
            <h1>{t("Form page")}</h1>
            <article>
                <Form {...formData} customSubmitHandler={customSubmitHandler} postFormWithApiCall={false} />
                {errorMessage && (
                    <Notification variant="error">
                        <dl>
                            {Object.keys(errorMessage).map((key, index) => {
                                const objectIndex = index;
                                return (
                                    <Fragment key={objectIndex}>
                                        <dt>{key}</dt>
                                        {errorMessage[key].map((message, indexChild) => {
                                            const messageIndex = indexChild;
                                            return <dd key={messageIndex}>{message}</dd>;
                                        })}
                                    </Fragment>
                                );
                            })}
                        </dl>
                    </Notification>
                )}
            </article>
        </div>
    );
};

export default FormPage;
