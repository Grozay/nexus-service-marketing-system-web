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
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Employee/UpdatePassword`, data)
  return response.data
}

export const activateDeactivateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/Employee/Activation`, data)
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

// Customers
// export const getAllCustomersAPI = async () => {
//   const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Customer`)
//   return response.data
// }

// export const createCustomerAPI = async (data) => {
//   const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Customer/CreateNew`, data)
//   return response.data
// }

// export const getCustomerByIdAPI = async (id) => {
//   const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Customer/${id}`)
//   return response.data
// }

// export const updateCustomerAPI = async (data) => {
//   const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Customer/Update`, data, {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   return response.data
// }

// export const deleteCustomerAPI = async (id) => {
//   const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Customer/${id}`)
//   return response.data
// }