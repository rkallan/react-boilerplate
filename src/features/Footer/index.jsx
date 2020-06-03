import React from "react";
import loadable from "@loadable/component";
import { Loading } from "rkallan-ui-library-loc";
import styles from "./resources/styles/footer.module.scss";

const ColorScheme = loadable(() => import(/* webpackChunkName: "ColorScheme" */ "features/theme/ColorScheme"), {
    fallback: <Loading />,
});

const Footer = () => {
    return (
        <footer className={styles.container}>
            <ColorScheme />
        </footer>
    );
};

export default Footer;
