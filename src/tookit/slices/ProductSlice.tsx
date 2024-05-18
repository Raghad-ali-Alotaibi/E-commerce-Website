import { ProductState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

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
    keyword,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy: string
  }) => {
    const response =
      keyword.length > 0
        ? await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}&sortBy=${sortBy}`)
        : await api.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`)
    return response.data
  }
)

export const fetchProductBySlug = createAsyncThunk(
  "products/fetchProductBySlug",
  async (productId: string | undefined) => {
    const response = await api.get(`/products/${productId}`)
    return response.data
  }
)

const ProductSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.isLoading = false
    })
    builder.addCase(fetchProductBySlug.fulfilled, (state, action) => {
      state.product = action.payload.data
      state.isLoading = false
    })
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state, action) => {
        state.error = "An error occurred"
        state.isLoading = false
      }
    )
  }
})

export default ProductSlice.reducer