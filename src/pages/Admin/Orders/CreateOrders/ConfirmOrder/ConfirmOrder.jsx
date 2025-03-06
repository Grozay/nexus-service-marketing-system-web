import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { createOrderAPI } from '~/apis'
const ConfirmOrder = ({ accountData, planData, store, onSubmit }) => {
  const navigate = useNavigate()
  const currentEmployee = useSelector(selectCurrentUser)
  console.log('🚀 ~ ConfirmOrder ~ currentEmployee:', currentEmployee)

  const handleCompleteOrder = async () => {
    // Create order object with all required fields
    // const orderData = {
    //   orderName: `Order for ${accountData.accountName}`,
    //   orderDescription: `Plan: ${planData.planName} at ${store.storeName}`,
    //   orderAmount: planData.planPrice,
    //   accountId: accountData.accountId,
    //   planId: planData.planId,
    //   employeeId: currentEmployee.employeeId,
    //   storeId: store.storeId,
    //   orderIsFeasible: true,
    //   orderStatus: 'Processing',
    //   accountDetails: {
    //     ...accountData,
    //     cityCodeDetails: accountData.cityCodeId,
    //     categoryDetails: accountData.categoryId
    //   },
    //   planDetails: {
    //     ...planData,
    //     plan_Category: planData.categoryId
    //   },
    //   employeeDetails: currentEmployee,
    //   storeDetails: store
    // }

    const orderData = {
      orderName: `Order for ${accountData.accountName}`,
      orderDescription: `Plan: ${planData.planName} at ${store.storeName}`,
      orderAmount: planData.planPrice,
      accountId: accountData.accountId,
      planId: planData.planId,
      employeeId: currentEmployee.userId,
      storeId: store.storeId,
      orderIsFeasible: true,
      orderStatus: 'Processing'
    }

    // Call onSubmit with complete order data
    toast.promise(
      createOrderAPI(orderData),
      console.log('🚀 ~ handleCompleteOrder ~ orderData:', orderData),
      {
        pending: 'Creating order...',
        success: {
          render({ data: res }) {
            if (res && !res.error) {
              navigate('/management/orders')
              return 'Create order successfully'
            }
            return res?.message || 'Cannot create order'
          }
        },
        error: {
          render({ data: error }) {
            if (error?.errors) {
              const errorMessages = Object.values(error.errors).flat()
              return errorMessages.join(', ') || 'Cannot create order'
            }
            return error.message || 'Cannot create order'
          }
        }
      }
    ).catch(() => {}) // Bắt lỗi để tránh unhandled promise rejection
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Order
      </Typography>
      <Typography variant="body1" gutterBottom>
        Full Name: {accountData.accountName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {accountData.accountEmail}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: {accountData.accountPhone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Address: {accountData.accountAddress}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selected Plan: {planData.planName} - {planData.planPrice} VND
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selected Store: {store.storeName}
      </Typography>
      <Button
        variant="contained"
        onClick={handleCompleteOrder}
        sx={{ mt: 2 }}
      >
        Complete Order
      </Button>
    </Box>
  )
}

export default ConfirmOrder