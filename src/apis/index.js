import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from '~/utils/constants'

//token
export const refreshTokenEmployeeAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Employee/RefreshToken`)
  return response.data
}

export const refreshTokenAccountAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Account/RefreshToken`)
  return response.data
}

// City code
export const getCityCodeAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Store/CityCodes`)
  return response.data
}
//get categoryPlan
export const getCategoryPlanAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Plan/CategoriesPlans`)
  return response.data
}


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

export const activateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/Activate`, data)
  return response.data
}


// khúc này chưa xong
export const updateEmployeePasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/UpdatePassword`, data)
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

export const activateAccountAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Account/Activate`, data)
  return response.data
}

export const updateAccountPasswordAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Account/UpdatePassword`, data)
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
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Store`)
  return response.data
}

export const getRetailShopByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Store/${id}`)
  return response.data
}

export const createRetailShopAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Store/Create`, data)
  return response.data
}

export const updateRetailShopAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Store/Update`, data)
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

export const getEquipmentByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Equipment/${id}`)
  return response.data
}

// ORDER

export const getAllOrdersAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Order`)
  return response.data
}

export const createOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Order/Create`, data)
  return response.data
}

export const getOrderByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Order/${id}`)
  return response.data
}

export const updateOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Order/Update`, data)
  return response.data
}