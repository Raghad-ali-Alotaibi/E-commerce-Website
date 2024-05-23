import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { CategoryStates, CreateFormData } from "@/types"
import api from "@/api"
import { getToken } from "@/utils/localStorage"

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


// need fix
export const CreateCategories = createAsyncThunk(
  "categories/CreateCategories",
  async (newCategory: CreateFormData) => {
    const response = await api.post("/categories", newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return response.data;
  }
);

// need fix
export const deleteCategories = createAsyncThunk(
  "categories/deleteCategories",
  async (categoryId: number) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    return categoryId
  }
);

// cases : pending , fulfilled , rejected
const CategoryReducer = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload.data
        state.isLoading = false
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.payload)
      })
      .addCase(CreateCategories.fulfilled, (state, action) => {
        state.categories.push(action.payload)
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

export default CategoryReducer.reducer