import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { themeReducer } from "features/theme/themeSlice";

const reducer = combineReducers({
    theme: themeReducer,
});

const store = configureStore({
    reducer,
});

export default store;
