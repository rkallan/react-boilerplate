import React from "react";
import Test from "Test";
import { useTranslation, Trans } from "react-i18next";
import logo from "./resources/svg/logo.svg";
import styles from "./resources/styles/template.module.scss";

function Template() {
    const { t } = useTranslation("template");
    const x = {
        text: "test",
    };

    return (
        <main className={styles.template}>
            <header className={styles.header}>
                <img src={logo} className={styles.logo} alt="logo" />
                <p>
                    <Trans t={t}>Edit srcApp pass</Trans>
                </p>
                <a className={styles.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    {t("Learn React")}
                </a>
                <Test {...x} />
            </header>
        </main>
    );
}

export default Template;
