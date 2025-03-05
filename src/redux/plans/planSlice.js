import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

//khởi tạo gía trị state của 1 cái slice trong redux
const initialState = {
  currentPlan: null
}

//Các hành động gọi api (bất đồng bộ) và cập nhập dữ liệu vào redux, dùng middleware CreateAsyncThunk đi kèm với extraReducers

export const fetchPlansDetailsAPI = createAsyncThunk(
  'plan/fetchPlansDetailsAPI',
  async (slug) => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Plan/${slug}`)
    return response.data
  }
)

//tạo ra 1 slice trong redux store
export const planSlice = createSlice({
  name: 'plan',
  initialState,
  //extraReducers: nơi xử lí dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(fetchPlansDetailsAPI.fulfilled, (state, action) => {
      //action.payload là dữ liệu trả về từ axios call api
      const plan = action.payload

      //update lại dữ liệu của currentPlan
      state.currentPlan = plan
    })
  }
})

// export const { } = userSlice.actions

//selector: là nơi cho các component lấy dữ liệu từ redux store
export const selectCurrentPlan = (state) => {
  return state.plan.currentPlan
}

export const planReducer = planSlice.reducer
