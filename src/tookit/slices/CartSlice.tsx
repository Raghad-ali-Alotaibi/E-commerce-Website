import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { getLocalStorage, setLocalStorage } from "@/utils/localStorage"
import { CartState, Product } from "@/types"

const data = getLocalStorage("cart", { cartItems: [] })

const initialState: CartState = {
  cartItems: data.cartItems
}

const CartReducer = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find(
        (cartItem) => cartItem.productId == action.payload.productId
      )
      if (item) {
        item.orderQuantity += 1
      } else {
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }
      setLocalStorage("cart", state.cartItems)
    },
    IncrementQuantity: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId == action.payload)
      if (item) {
        item.orderQuantity += 1
      } else {
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }
      setLocalStorage("cart", state.cartItems)
    },
    DecrementQuantity: (state, action) => {
      const item = state.cartItems.find((cartItem) => cartItem.productId == action.payload)
      if (item && item.orderQuantity > 1) {
        item.orderQuantity -= 1
      } else {
        state.cartItems.push({ ...action.payload, orderQuantity: 1 })
      }
      setLocalStorage("cart", state.cartItems)
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.productId !== action.payload)
      setLocalStorage("cart", state.cartItems)
    },
    removeAllFromCart: (state) => {
      state.cartItems = []
      setLocalStorage("cart", state.cartItems)
    }
  }
})
export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  IncrementQuantity,
  DecrementQuantity
} = CartReducer.actions
export default CartReducer.reducer
