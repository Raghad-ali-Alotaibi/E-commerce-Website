import { LoginFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"

const data =
  localStorage.getItem("loginData") !== null
    ? JSON.parse(String(localStorage.getItem("loginData")))
    : []

const initialState: UserState = {
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post("/users/register", newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/registerUser", async (userData: LoginFormData) => {
  const response = await api.post("/users/login", userData)
  return response.data
})


const UserReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.userData = null
      state.token = null
      state.isLoggedIn = false
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          userData: state.userData,
          token: state.token,
          isLoggedIn: state.isLoggedIn
        })
      )
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true
        state.userData = action.payload.data
        state.token = action.payload.data.token
        localStorage.setItem(
          "loginData",
          JSON.stringify({
            userData: state.userData,
            token: state.token,
            isLoggedIn: state.isLoggedIn
          })
        )
      })
      .addMatcher(
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
export const { logout } = UserReducer.actions
export default UserReducer.reducer
