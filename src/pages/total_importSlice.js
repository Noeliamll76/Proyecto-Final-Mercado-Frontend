
import { createSlice } from '@reduxjs/toolkit';

export const total_importSlice = createSlice({
    name: 'total_import',
    initialState: {
      infoTotal_import: {}
    },
    reducers: {
      saveTotal_import: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logoutTotal_import: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { saveTotal_import, logoutTotal_import } = total_importSlice.actions;

export const total_importData = (state) => state.total_import;

export default total_importSlice.reducer;