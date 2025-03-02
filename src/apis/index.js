import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'


// Employees
export const getAllEmployeesAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/Employee`)
  return response.data
}

export const createEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/Employee/CreateNew`, data)
  return response.data
}

export const getEmployeeByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/Employee/${id}`)
  return response.data
}

export const updateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Employee/Update`, data)
  return response.data
}

export const updateEmployeePasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Employee/UpdatePassword`, data)
  return response.data
}

export const activateDeactivateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Employee/Activation`, data)
  return response.data
}

export const logoutEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/Auth/Logout`)
  return response.data
}

export const refreshTokenEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/Auth/RefreshToken`)
  return response.data
}

// Accounts
export const getAllAccountsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/Account`)
  return response.data
}

export const getAccountByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/Account/${id}`)
  return response.data
}

export const createAccountAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/Account/CreateNew`, data)
  return response.data
}

export const updateAccountAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Account/Update`, data)
  return response.data
}

export const updateAccountPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Account/UpdatePassword`, data)
  return response.data
}

export const loginAccountAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/Account/Login`, data)
  return response.data
}

export const logoutAccountAPI = async () => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/Account/Logout`)
  return response.data
}
