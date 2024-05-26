import { configureStore } from '@reduxjs/toolkit'

import ProductReducer from './slices/ProductSlice'
import UserReducer from './slices/UserSlice'
import CategoryReducer from './slices/CategorySlice'
import CartReducer from './slices/CartSlice'
import OrderReducer from './slices/OrdersSlice copy'



export const store = configureStore({
  reducer: {
    ProductR: ProductReducer,
    userR: UserReducer,
    categoryR: CategoryReducer,
    orderR: OrderReducer,
    CartR: CartReducer
  }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;