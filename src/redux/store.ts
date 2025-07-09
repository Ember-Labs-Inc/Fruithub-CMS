
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import  statReducer  from './slices/statSlice'; 
import authReducer from './slices/authSlice';


const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  stat: statReducer, 
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;