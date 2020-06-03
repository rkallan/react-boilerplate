import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
    name: "theme",
    initialState: {
        template: "default",
        colorScheme: undefined,
    },
    reducers: {
        setThemeTemplate(state, action) {
            const newState = state;
            newState.template = action.payload;
        },
        setThemeColorScheme(state, action) {
            const newState = state;
            newState.colorScheme = action.payload;
        },
    },
});

const { setThemeColorScheme, setThemeTemplate } = theme.actions;
const themeReducer = theme.reducer;

export { themeReducer, setThemeColorScheme, setThemeTemplate };
