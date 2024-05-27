import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { CreateProductForBackend, Product, ProductState } from "@/types"
import api from "@/api"
import { getToken } from "@/utils/localStorage"

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
    sortBy,
    selectedCategories
  }: {
    pageNumber: number
    pageSize: number
    sortBy: string
    selectedCategories: number[]
  }) => {
    let url = `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`

    if (selectedCategories.length > 0) {
      const categoryQueryString = selectedCategories.map((catId) => `categoryId=${catId}`).join("&")
      url += `&${categoryQueryString}`
    }
    const response = await api.get(url)
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
export const CreateProduct = createAsyncThunk("users/CreateProduct", async (newProduct: CreateProductForBackend) => {
  const response = await api.post("/products", newProduct , {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  console.log(response.data)
  return response.data
})

export const UpdateProduct = createAsyncThunk(
  "products/UpdateProduct",
  async ({
    updateProductData,
    productId
  }: {
    updateProductData: CreateProductForBackend
    productId: number
  }) => {
    const response = await api.put(`/products/${productId}`, updateProductData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    console.log(response.data)
    return response.data
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    await api.delete(`/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return productId
  }
)

// cases : pending , fulfilled , rejected
const ProductReducer = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
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
      .addCase(CreateProduct.fulfilled, (state, action) => {
        state.products.push(action.payload)
        state.isLoading = false
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.productId !== action.payload)
        state.isLoading = false
      })
      .addCase(UpdateProduct.fulfilled, (state, action) => {
        const FindProduct = state.products.find(
          (product) => product.productId === action.payload.data.productId
        )
        if (FindProduct) {
          FindProduct.productImage = action.payload.data.productImage
          FindProduct.productName = action.payload.data.productName
          FindProduct.productDescription = action.payload.data.productDescription
          FindProduct.productPrice = action.payload.data.productPrice
          FindProduct.productQuantityInStock = action.payload.data.productQuantityInStock
          FindProduct.categoryId = action.payload.data.categoryId
          state.isLoading = false
        }
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
