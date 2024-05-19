import { configureStore } from '@reduxjs/toolkit'

import ProductSlice from './slices/ProductSlice'
import UserSlice from './slices/UserSlice'


export const store = configureStore({
  reducer: {
    ProductR: ProductSlice,
    userR: UserSlice,

  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;