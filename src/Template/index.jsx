import React from "react";
import loadable from "@loadable/component";
import styles from "./resources/styles/template.module.scss";

const Routes = loadable(() => import(/* webpackChunkName: "Routes" */ "Routes"));

function Template() {
    return (
        <main className={styles.main} variant="container">
            <Routes />
        </main>
    );
}

export default Template;
