import { OrderStates } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { getToken } from "@/utils/localStorage"



const initialState: OrderStates = {
  orders: [],
  order:null,
  error: null,
  isLoading: false,
}

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await api.get(`/orders`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return response.data
})


// cases : pending , fulfilled , rejected
const OrderReducer = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload.data
        state.isLoading = false
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.error = null
          state.isLoading = true
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = "An error occurred"
          state.isLoading = false
        }
      )
  }
})
export default OrderReducer.reducer
