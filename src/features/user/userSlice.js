import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        resetUser(state, action) {
            return action.payload;
        },
    },
});

const { setUser, resetUser } = user.actions;
const userReducer = user.reducer;

export { userReducer, setUser, resetUser };
