import { createSlice } from '@reduxjs/toolkit';

const sectMenuListSlice = createSlice({
    name: 'sectMenuList',
    initialState: { sections: {}},
    reducers: {
        addSectMenuTitle: (state, action) => {

        }
    }
});

export const selectSections = (state) => state.sections;
export const { addSectMenuTitle } = sectMenuListSlice.actions;
export default sectMenuListSlice.reducer;
