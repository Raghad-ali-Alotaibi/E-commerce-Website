import { LoginFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"

const initialState: UserState = {
  error: null,
  isLoading: false
}

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (newUser: User) => {
    const response = await api.post("/users/register",newUser)
    return response.data
  }
)


export const loginUser = createAsyncThunk(
  "users/registerUser",
  async (userData: LoginFormData) => {
    const response = await api.post("/users/login",userData)
    return response.data
  }
)



const UserReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
})

export default UserReducer.reducer
