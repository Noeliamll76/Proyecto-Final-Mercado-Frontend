
import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
      infoBasket: {}
    },
    reducers: {
      saveBasket: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      logoutBasket: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    }
    
});

export const { saveBasket, logoutBasket } = basketSlice.actions;

export const basketData = (state) => state.basket;

export default basketSlice.reducer;