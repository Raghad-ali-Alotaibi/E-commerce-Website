import { configureStore } from '@reduxjs/toolkit'

import ProductReducer from './slices/ProductSlice'
import UserReducer from './slices/UserSlice'


export const store = configureStore({
  reducer: {
    ProductR: ProductReducer,
    userR: UserReducer,
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;