import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { ProductState } from "@/types"
import api from "@/api"

const initialState: ProductState = {
  products: [],
  product: null,
  totalPages: 1,
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    sortBy: string
  }) => {
    const response = await api.get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`
    )
    return response.data
  }
)

export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async (keyword: string) => {
    const response = await api.get(`/products/search?keyword=${keyword}`)
    return response.data
  }
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (productSlug: string | undefined) => {
    const response = await api.get(`/products/slug/${productSlug}`)
    return response.data
  }
)


// cases : pending , fulfilled , rejected
const ProductReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })
    .addCase(searchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data
      state.isLoading = false
    })
    .addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.product = action.payload.data
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

export default ProductReducer.reducer
