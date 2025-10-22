import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {mode: localStorage.getItem('mui-mode') || 'light', fromSystem: false},
    reducers: {
        toggleTheme(state, action) {
            const { mode, fromSystem = false } = action.payload;
            if (mode === 'light' || mode === 'dark') {
                localStorage.setItem('mui-mode', mode);
                return { mode, fromSystem };
            }
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;