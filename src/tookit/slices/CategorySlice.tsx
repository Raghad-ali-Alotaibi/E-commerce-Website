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

export const CreateCategory = createAsyncThunk(
  "categories/CreateCategory",
  async (newCategory: CreateFormData) => {
    const response = await api.post("/categories", newCategory, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data.data
  }
)

export const UpdateCategory = createAsyncThunk(
  "categories/UpdateCategory",
  async ({
    updateCategoryData,
    categoryId
  }: {
    updateCategoryData: CreateFormData
    categoryId: number
  }) => {
    const response = await api.put(`/categories/${categoryId}`, updateCategoryData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return response.data
  }
)


export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (categoryId: number) => {
    await api.delete(`/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
    return categoryId
  }
)

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
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category.categoryId !== action.payload
        )
        state.isLoading = false
      })
      .addCase(CreateCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload)
        state.isLoading = false
      })
      .addCase(UpdateCategory.fulfilled, (state, action) => {
        const FindCategory = state.categories.find(
          (category) => category.categoryId === action.payload.data.categoryId
        )
        if (FindCategory) {
          FindCategory.categoryName = action.payload.data.categoryName
          FindCategory.categoryDescription = action.payload.data.categoryDescription
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

export default CategoryReducer.reducer


