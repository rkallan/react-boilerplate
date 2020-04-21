import React, { useEffect } from "react";
import loadable from "@loadable/component";
import { useDispatch, useSelector } from "react-redux";
import useColorScheme from "rkallan-react-hooks/useColorScheme";

import { setThemeColorScheme } from "features/theme/themeSlice";
import { getThemeColorScheme } from "features/theme/themeSelector";

import styles from "./resources/styles/template.module.scss";

const Routes = loadable(() => import(/* webpackChunkName: "Routes" */ "Routes"));

function Template() {
    const dispatch = useDispatch();
    const [getColorScheme] = useColorScheme();
    const themeColorScheme = useSelector(getThemeColorScheme);

    useEffect(() => {
        if (!themeColorScheme || getColorScheme !== themeColorScheme) dispatch(setThemeColorScheme(getColorScheme));
    }, [dispatch, getColorScheme, themeColorScheme]);

    return (
        <main className={styles.main} variant="container">
            <Routes />
        </main>
    );
}

export default Template;
