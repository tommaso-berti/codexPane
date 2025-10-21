import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {mode: localStorage.getItem('mui-mode') || 'light',},
    reducers: {
        toggleTheme (state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('mui-mode', state.mode);
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;