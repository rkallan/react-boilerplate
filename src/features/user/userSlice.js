import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        setUser(state, action) {
            const newState = state;
            newState.user = action.payload;
        },
    },
});

const { setUser } = user.actions;
const userReducer = user.reducer;

export { userReducer, setUser };
