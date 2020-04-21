import React, { useEffect } from "react";
import loadable from "@loadable/component";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useColorScheme from "rkallan-react-hooks/useColorScheme";

import { setThemeColorScheme } from "features/theme/themeSlice";
import { getThemeColorScheme } from "features/theme/themeSelector";

import styles from "./resources/styles/template.module.scss";
import defaultPageData from "./constants/defaultPageData";

const Routes = loadable(() => import(/* webpackChunkName: "Routes" */ "Routes"));

function Template() {
    const { t } = useTranslation("template");
    const dispatch = useDispatch();
    const [getColorScheme] = useColorScheme();
    const themeColorScheme = useSelector(getThemeColorScheme);
    const { htmlAttribute, title, description } = defaultPageData;

    useEffect(() => {
        if (!themeColorScheme || getColorScheme !== themeColorScheme) dispatch(setThemeColorScheme(getColorScheme));
    }, [dispatch, getColorScheme, themeColorScheme]);

    return (
        <>
            <Helmet>
                <html lang={htmlAttribute.lang} itemScope={htmlAttribute.itemscope} itemType={htmlAttribute.itemtype} />
                <title>{t(`template:${title}`)}</title>
                <meta name="description" content={t(`template:${description}`)} />
            </Helmet>
            <main className={styles.main} variant="container">
                <Routes />
            </main>
        </>
    );
}

export default Template;
