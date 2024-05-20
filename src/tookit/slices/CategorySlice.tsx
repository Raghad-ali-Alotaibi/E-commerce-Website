import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { CategoryStates } from "@/types"
import api from "@/api"

const initialState: CategoryStates = {
  categories: [],
  category: null,
  error: null,
  isLoading: false
}

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
  const response = await api.get("/categories")
  return response.data
})

// cases : pending , fulfilled , rejected
const categoryReducer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data.$values
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred"
        state.isLoading = false
      })
  }
})

export default categoryReducer.reducer
