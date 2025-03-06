import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'
import { toast } from 'react-toastify'
//khởi tạo gía trị state của 1 cái slice trong redux
const initialState = {
  currentAccount: null
}

//Các hành động gọi api (bất đồng bộ) và cập nhập dữ liệu vào redux, dùng middleware CreateAsyncThunk đi kèm với extraReducers
//account
export const loginAccountApi = createAsyncThunk(
  'account/loginAccountApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Account/Login`, data)
    return response.data
  }
)

export const logoutAccountApi = createAsyncThunk(
  'account/logoutAccountApi',
  async (showSuccessMessage = true) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Account/Logout`)
    if (showSuccessMessage) {
      toast.success('Logout successfully')
    }
    return response.data
  }
)


//tạo ra 1 slice trong redux store
export const accountSlice = createSlice({
  name: 'account',
  initialState,
  //extraReducers: nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    //account
    builder.addCase(loginAccountApi.fulfilled, (state, action) => {
      //action.payload là dữ liệu trả về từ axios call api
      const account = action.payload
      //update lại dữ liệu của currentUser
      state.currentAccount = account
    })
    builder.addCase(logoutAccountApi.fulfilled, (state) => {
      state.currentAccount = null
    })
  }
})

// export const { } = userSlice.actions

//selector: là nơi cho các component lấy dữ liệu từ redux store
export const selectCurrentAccount = (state) => {
  return state.account.currentAccount
}

export const accountReducer = accountSlice.reducer
