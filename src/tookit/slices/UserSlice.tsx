import { LoginFormData, UpdateFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import api from "@/api"
import { getLocalStorage, getToken, setLocalStorage } from "@/utils/localStorage"

const data = getLocalStorage("loginData", {
  userData: null,
  token: null,
  isLoggedIn: false
})


const initialState: UserState = {
  users: [],
  error: null,
  isLoading: false,
  userData: data.userData,
  token: data.token,
  isLoggedIn: data.isLoggedIn
}

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get(`/users`,{
    headers: {
        Authorization: `Bearer ${getToken()}`
    }})
  return response.data
})

export const registerUser = createAsyncThunk("users/registerUser", async (newUser: User) => {
  const response = await api.post("/users/register", newUser)
  return response.data
})

export const loginUser = createAsyncThunk("users/loginUser", async (userData: LoginFormData) => {
  const response = await api.post("/users/login", userData)
  return response.data
})

// need fix
export const UpdateUser = createAsyncThunk(
  "users/UpdateUser",
  async ({ updateUserData, userId }: { updateUserData: UpdateFormData , userId: number }) => {
    console.log(getToken)
    const response = await api.put(`/users/${userId}`, updateUserData,{
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      return response.data
  }
)


// need fix
export const deleteUser = createAsyncThunk("categories/deleteUser", async (userId: number) => {
  await api.delete(`/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
  return userId
})

// cases : pending , fulfilled , rejected
const UserReducer = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.userData = null
      state.token = null
      state.isLoggedIn = false
      setLocalStorage("loginData", {
        userData: state.userData,
        token: state.token,
        isLoggedIn: state.isLoggedIn
      })
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.userDto
      state.token = action.payload.data.jwt
      setLocalStorage("loginData", {
        userData: state.userData,
        token: state.token,
        isLoggedIn: state.isLoggedIn
      })
    })
    .addCase(UpdateUser.fulfilled, (state, action) => {
        if (state.userData) {
          state.userData.firstName = action.payload.data.userDto.firstName
          state.userData.lastName = action.payload.data.userDto.lastName
        }
        setLocalStorage("loginData", {
          userData: state.userData,
          token: state.token,
          isLoggedIn: state.isLoggedIn
        })
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data
        state.token = action.payload.data.jwt
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
export const { logout } = UserReducer.actions
export default UserReducer.reducer
