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

export const deleteEmployeeAPI = async (id) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/employee/delete/${id}`)
  return response.data
}

export const activateEmployeeAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Employee/Activate`, data)
  return response.data
}

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

export const getOrderByAccountIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Order/Account/${id}`)
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

export const deleteAccountAPI = async (id) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/account/delete/${id}`)
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

export const GetPlanBySlugAPI = async (slug) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Plan/${slug}`)
  return response.data
}

export const activatePlanAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Plan/Activate`, data)
  return response.data
}

export const createPlanAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Plan/Create`, data)
  return response.data
}

export const getPlanByCategoryIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Plan/Categories/${id}`)
  return response.data
}

//CONNECTION
export const getAllConnectionsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Connection`)
  return response.data
}

export const createConnectionAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Connection/Create`, data)
  return response.data
}

export const updateConnectionAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Connection/Update`, data)
  return response.data
}

export const getConnectionByOrderIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Connection/Order/${id}`)
  return response.data
}

export const getConnectionByIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Connection/${id}`)
  return response.data
}

export const updateStatusConnectionAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Connection/UpdateStatus`, data)
  return response.data
}

//SUBSCRIPTION
export const getAllSubscriptionsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Subscription`)
  return response.data
}

export const createSubscriptionAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Subscription/Create`, data)
  return response.data
}

//DEPOSIT
export const getAllDepositsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Deposit`)
  return response.data
}

export const createDepositAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Deposit/Create`, data)
  return response.data
}

// PRE-ORDER
export const createPreOrderAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/PreOrder/Create`, data)
  return response.data
}

export const getPreOrderByEmailAPI = async (email) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/PreOrder/${email}`)
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

export const deleteVendorAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Vendor/Delete/${id}`)
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

export const deleteRetailShopAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Store/Delete/${id}`)
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

export const deleteEquipmentAPI = async (id) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Equipment/Delete/${id}`)
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

//contact us
export const contactUsAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Other/contact-us`, data)
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


// BILLING
export const getAllBillingsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Billing`)
  return response.data
}

export const createBillingAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Billing/Create`, data)
  return response.data
}

export const getOrderIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Billing/order/${id}`)
  return response.data
}

export const updateBillingAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Billing/update`, data)
  return response.data
}

export const getBillingsByOrderIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Billing/order/${id}`)
  return response.data
}

// PAYMENT
export const getAllPaymentsAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Payment`)
  return response.data
}


export const processPaymentAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Payment/Create`, data)
  return response.data
}

//SUBSCRIPTION
export const getSubscriptionByOrderIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Subscription/order/${id}`)
  return response.data
}

//update subscription and deposit status
export const updateSubscriptionAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Subscription/update`, data)
  return response.data
}

export const updateDepositAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Deposit/update`, data)
  return response.data
}

// FEEDBACK
export const getAllFeedbacksAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Feedback`)
  return response.data
}

export const createFeedbackAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Feedback/Create`, data)
  return response.data
}

export const getFeedbackByOrderIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Feedback/order/${id}`)
  return response.data
}

export const updateFeedbackAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Feedback/Update`, data)
  return response.data
}

export const deleteFeedbackAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Feedback/Delete/${id}`)
  return response.data
}

// REPLY FEEDBACK
export const getAllReplyFeedbacksAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Reply`)
  return response.data
}

export const createReplyFeedbackAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/api/Reply/Create`, data)
  return response.data
}

export const getReplyFeedbackByOrderIdAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/api/Reply/Order/${id}`)
  return response.data
}

export const updateReplyFeedbackAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/api/Reply/Update`, data)
  return response.data
}

export const deleteReplyFeedbackAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/api/Reply/Delete/${id}`)
  return response.data
}

