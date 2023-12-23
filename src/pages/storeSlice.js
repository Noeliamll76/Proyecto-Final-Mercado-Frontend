
import { createSlice } from '@reduxjs/toolkit';

export const storeSlice = createSlice({
    name: 'store',
    initialState: {
      infoStore: {}
    },
    reducers: {
      saveStore: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logoutStore: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { saveStore, logoutStore } = storeSlice.actions;

export const storeData = (state) => state.store;

export default storeSlice.reducer;