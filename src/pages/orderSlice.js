
import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
      infoOrder: {}
    },
    reducers: {
      saveOrder: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logoutOrder: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { saveOrder, logoutOrder } = orderSlice.actions;

export const orderData = (state) => state.order;

export default orderSlice.reducer;