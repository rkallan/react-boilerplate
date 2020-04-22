import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { themeReducer } from "features/theme/themeSlice";
import { authenticationReducer } from "features/authentication/authenticationSlice";

const reducer = combineReducers({
    authentication: authenticationReducer,
    theme: themeReducer,
});

const store = configureStore({
    reducer,
});

export default store;
