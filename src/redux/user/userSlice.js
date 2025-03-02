import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
//khởi tạo gía trị state của 1 cái slice trong redux
const initialState = {
  currentUser: null
}

//Các hành động gọi api (bất đồng bộ) và cập nhập dữ liệu vào redux, dùng middleware CreateAsyncThunk đi kèm với extraReducers

//Employee
export const loginEmployeeApi = createAsyncThunk(
  'user/loginEmployeeApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Employee/Login`, data)
    return response.data
  }
)

export const logoutEmployeeApi = createAsyncThunk(
  'user/logoutEmployeeApi',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Employee/Logout`)
    if (showSuccessMessage) {
      toast.success('Logout successfully')
    }
    return response.data
  }
)

//Account
export const loginAccountApi = createAsyncThunk(
  'user/loginAccountApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/Account/Login`, data)
    return response.data
  }
)

export const logoutAccountApi = createAsyncThunk(
  'user/logoutAccountApi',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/Account/Logout`)
    if (showSuccessMessage) {
      toast.success('Logout successfully')
    }
    return response.data
  }
)

//tạo ra 1 slice trong redux store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  //extraReducers: nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginEmployeeApi.fulfilled, (state, action) => {
      //action.payload là dữ liệu trả về từ axios call api
      const user = action.payload

      //update lại dữ liệu của currentUser
      state.currentUser = user
    })
    builder.addCase(loginAccountApi.fulfilled, (state, action) => {
      //action.payload là dữ liệu trả về từ axios call api
      const user = action.payload

      //update lại dữ liệu của currentUser
      state.currentUser = user
    })
    builder.addCase(logoutEmployeeApi.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(logoutAccountApi.fulfilled, (state) => {
      state.currentUser = null
    })
  }
})

// export const { } = userSlice.actions

//selector: là nơi cho các component lấy dữ liệu từ redux store
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}

export const userReducer = userSlice.reducer
