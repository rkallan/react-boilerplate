import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginStatus: 0,
    token: undefined,
    sessionCreationDate: undefined,
    user: {
        id: undefined,
        username: undefined,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
        organisationId: undefined,
        organisationName: undefined,
        userRole: undefined,
    },
};

const authentication = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setLoginStatus(state, action) {
            const newState = state;
            newState.loginStatus = action.payload;
        },
        setToken(state, action) {
            const newState = state;
            newState.token = action.payload;
        },
        setUser(state, action) {
            const newState = state;
            newState.user = action.payload;
        },
        setAuthentication(state, action) {
            const newState = state;
            const { loginStatus, token, sessionCreationDate, ...user } = action.payload;
            newState.loginStatus = loginStatus;
            newState.token = token;
            newState.sessionCreationDate = sessionCreationDate;
            newState.user = user;
        },
        resetAuthentication(state) {
            const newState = state;
            newState.loginStatus = initialState.loginStatus;
            newState.token = initialState.token;
            newState.user = initialState.user;
        },
    },
});

const { setLoginStatus, setToken, setUser, setAuthentication, resetAuthentication } = authentication.actions;
const authenticationReducer = authentication.reducer;

export { authenticationReducer, setLoginStatus, setToken, setUser, setAuthentication, resetAuthentication };
