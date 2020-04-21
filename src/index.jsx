import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React, { Suspense } from "react";
import { render, hydrate } from "react-dom";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import loadable from "@loadable/component";
import { createBrowserHistory } from "history";
import store from "Store";
import "i18n";

import "./resources/styles/default.scss";
import configureMockApi from "mockApi";
import * as serviceWorker from "./serviceWorker";

configureMockApi();

const Template = loadable(() => import("./Template"), {
    fallback: <div>Loading...</div>,
});

const history = createBrowserHistory();

const TemplateApplication = (
    <React.StrictMode>
        <Provider store={store}>
            <Suspense fallback="">
                <Router history={history}>
                    <Template />
                </Router>
            </Suspense>
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
