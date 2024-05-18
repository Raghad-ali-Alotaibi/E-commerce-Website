import { configureStore } from '@reduxjs/toolkit'

import ProductSlice from './slices/ProductSlice'

export const store = configureStore({
  reducer: {
    ProductR: ProductSlice
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;