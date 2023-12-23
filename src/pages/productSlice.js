
import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
      infoProduct: {}
    },
    reducers: {
      saveProduct: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logoutProduct: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { saveProduct, logoutProduct } = productSlice.actions;

export const productData = (state) => state.product;

export default productSlice.reducer;