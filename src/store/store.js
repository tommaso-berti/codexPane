import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice.js'
import uiPrefsSlice from './uiPrefsSlice.js';

export default configureStore({
    reducer: {
        theme: themeSlice,
        uiPrefs: uiPrefsSlice,
    },
});
