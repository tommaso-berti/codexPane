import {configureStore} from '@reduxjs/toolkit';
import sectMenuListSlice from "./sectMenuListSlice.js";

export default configureStore({
    reducer: {
        sectMenuList: sectMenuListSlice
    }
})