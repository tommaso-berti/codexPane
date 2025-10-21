import { configureStore } from '@reduxjs/toolkit';
import themeSlice from './themeSlice.js'

export default configureStore({
    reducer: {
        theme: themeSlice
    },
});