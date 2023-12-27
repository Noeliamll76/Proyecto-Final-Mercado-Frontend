
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../pages/userSlice';
import guildSlice from '../pages/guildSlice';
import storeSlice from '../pages/storeSlice';
import productSlice from '../pages/productSlice';
import basketSlice from '../pages/basketSlice';
import orderSlice from '../pages/orderSlice';
import total_importSlice from '../pages/total_importSlice';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import {thunk} from 'redux-thunk';


const reducers = combineReducers({
  user: userSlice,
  guild: guildSlice,
  store: storeSlice,
  product: productSlice,
  basket: basketSlice,
  order: orderSlice,
  total_import: total_importSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware)=>
  getDefaultMiddleware({ serializableCheck: false,}).concat(thunk),
});