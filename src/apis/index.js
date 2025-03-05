import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


// Employees
export const getAllEmployeesAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Employee`)
  return response.data
}

export const createEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Employee/CreateNew`, data)
  return response.data
}

export const getEmployeeByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Employee/${id}`)
  return response.data
}

export const updateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/Update`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.data
}

export const logoutEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Auth/Logout`)
  return response.data
}

// khúc này chưa xong
export const updateEmployeePasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/UpdatePassword`, data)
  return response.data
}

export const activateDeactivateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/Activation`, data)
  return response.data
}

// Accounts
export const getAllAccountsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Account`)
  return response.data
}

export const getAccountByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Account/${id}`)
  return response.data
}

export const createAccountAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Account/CreateNew`, data)
  return response.data
}

export const updateAccountAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Account/Update`, data)
  return response.data
}

export const updateAccountPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Account/UpdatePassword`, data)
  return response.data
}

export const logoutAccountAPI = async () => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Account/Logout`)
  return response.data
}

export const refreshTokenAccountAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Account/RefreshToken`)
  return response.data
}

export const refreshTokenEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Auth/RefreshToken`)
  return response.data
}

export const sendOtpCodeAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/OtpRecord/Create`, data)
  return response.data
}

export const verifyOtpCodeAPI = async (userId, otpCode) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/OtpRecord/Verify?userId=${userId}&otpCode=${otpCode}`)
  return response.data
}

// RESET PASSWORD
export const resetPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Account/ResetPassword`, data)
  return response.data
}

// PLANS LIST
export const getPlanListAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Plan/Plans`)
  return response.data
}

// PRE-ORDER
export const createPreOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/PreOrder/Create`, data)
  return response.data
}
