import React, { Suspense, useEffect } from "react";
import loadable from "@loadable/component";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import useColorScheme from "rkallan-react-hooks/useColorScheme";

import { setThemeColorScheme } from "features/theme/themeSlice";
import { getThemeColorScheme } from "features/theme/themeSelector";
import useAuth from "features/authentication/hooks/useAuth";
import { getUserState } from "features/user/userSelector";
import { setUser, resetUser } from "features/user/userSlice";
import { Loading } from "rkallan-ui-library-loc";

import styles from "./resources/styles/template.module.scss";
import defaultPageData from "./constants/defaultPageData";

const Routes = loadable(() => import(/* webpackChunkName: "Routes" */ "Routes"), {
    fallback: <Loading />,
});

const Header = loadable(() => import(/* webpackChunkName: "Header" */ "features/Header"), {
    fallback: <Loading />,
});

const Footer = loadable(() => import(/* webpackChunkName: "Footer" */ "features/Footer"), {
    fallback: <Loading />,
});

function Template() {
    const { t } = useTranslation("template");
    const dispatch = useDispatch();
    const [getColorScheme] = useColorScheme();
    const themeColorScheme = useSelector(getThemeColorScheme);
    const { htmlAttribute, title, description } = defaultPageData;
    const auth = useAuth();
    const user = useSelector(getUserState);

    useEffect(() => {
        if (!themeColorScheme) dispatch(setThemeColorScheme(getColorScheme));
    }, [dispatch, getColorScheme, themeColorScheme]);

    useEffect(() => {
        if (auth && !Object.keys(user).length) {
            const { displayName, email, phoneNumber, photoURL } = auth;

            dispatch(setUser({ displayName, email, phoneNumber, photoURL }));
        }

        if (!auth && Object.keys(user).length) {
            dispatch(resetUser({}));
        }
    }, [auth, dispatch, user]);

    return (
        <>
            <Helmet>
                <html lang={htmlAttribute.lang} itemScope={htmlAttribute.itemscope} itemType={htmlAttribute.itemtype} />
                <title>{t(`template:${title}`)}</title>
                <meta name="description" content={t(`template:${description}`)} />
                <body theme={themeColorScheme} />
            </Helmet>
            <Header />
            <main className={styles.main} variant="container">
                <Suspense fallback={<Loading />}>
                    <Routes />
                </Suspense>
            </main>
            <Footer />
        </>
    );
}

export default Template;
