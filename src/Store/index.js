import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { themeReducer } from "features/theme/themeSlice";
import { userReducer } from "features/user/userSlice";

const reducer = combineReducers({
    user: userReducer,
    theme: themeReducer,
});

const store = configureStore({
    reducer,
});

export default store;
