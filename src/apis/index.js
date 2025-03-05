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
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/Update`, data)
  return response.data
}

export const logoutEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Employee/Logout`)
  return response.data
}

export const activateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/Activate`, data)
  return response.data
}

export const refreshTokenEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Employee/RefreshToken`)
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



//equipment
export const getAllEquipmentsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Equipment`)
  return response.data
}

export const createEquipmentAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Equipment/Create`, data)
  return response.data
}

export const updateEquipmentAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Equipment/Update`, data)
  return response.data
}

//vendor
export const getAllVendorsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Vendor`)
  return response.data
}

export const createVendorAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Vendor/Create`, data)
  return response.data
}

export const updateVendorAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Vendor/Update`, data)
  return response.data
}

export const getVendorByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Vendor/${id}`)
  return response.data
}


//retail shop
export const getAllRetailShopsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/RetailShop`)
  return response.data
}

export const getRetailShopByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/RetailShop/${id}`)
  return response.data
}

export const createRetailShopAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/RetailShop/Create`, data)
  return response.data
}

export const updateRetailShopAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/RetailShop/Update`, data)
  return response.data
}
