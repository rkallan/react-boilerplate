import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React, { Suspense } from "react";
import { render, hydrate } from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import loadable from "@loadable/component";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserHistory } from "history";
import { Loading, TemplateProvider } from "rkallan-ui-library-loc";
// import configureMockApi from "mockApi";
import AuthProvider from "features/authentication/AuthProvider";
import store from "Store";
import * as serviceWorker from "./serviceWorker";
import "i18n";
import "db";

// configureMockApi();

const Template = loadable(() => import(/* webpackChunkName: "Template" */ "./Template"), {
    fallback: <Loading />,
});

window.customAppVariable = {
    usedLogoutButton: false,
};

const history = createBrowserHistory();
const helmetContext = {};
const TemplateApplication = (
    <React.StrictMode>
        <Provider store={store}>
            <TemplateProvider>
                <AuthProvider>
                    <HelmetProvider context={helmetContext}>
                        <Suspense fallback={<Loading />}>
                            <Router history={history}>
                                <Template />
                            </Router>
                        </Suspense>
                    </HelmetProvider>
                </AuthProvider>
            </TemplateProvider>
        </Provider>
    </React.StrictMode>
);

const templateElement = document.getElementById("template");

if (templateElement.hasChildNodes()) {
    // If it's an SSR, we use hydrate to get fast page loads by just
    // attaching event listeners after the initial render
    loadable.preloadReady().then(() => {
        hydrate(TemplateApplication, templateElement);
    });
} else {
    // If we're not running on the server, just render like normal
    render(TemplateApplication, templateElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
