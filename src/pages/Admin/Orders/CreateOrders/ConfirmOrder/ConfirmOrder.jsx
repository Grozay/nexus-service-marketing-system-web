/* eslint-disable no-unused-vars */
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { createOrderAPI, createSubscriptionAPI, createDepositAPI } from '~/apis'
import { useState } from 'react'

const ConfirmOrder = ({ accountData, planData, store, onSubmit }) => {
  const navigate = useNavigate()
  const currentEmployee = useSelector(selectCurrentUser)
  const [isLoading, setIsLoading] = useState(false)

  if (!accountData || !planData || !store || !currentEmployee) {
    return (
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" color="error">
          Error: Missing required data to confirm order.
          {!accountData && ' [Account data missing]'}
          {!planData && ' [Plan data missing]'}
          {!store && ' [Store data missing]'}
          {!currentEmployee && ' [Employee data missing]'}
        </Typography>
      </Box>
    )
  }

  const handleCompleteOrder = async () => {
    if (!accountData.accountId || !planData.planId || !store.storeId || !currentEmployee.userId) {
      toast.error('Missing required fields')
      return
    }

    const orderData = {
      orderName: `Order for ${accountData.accountName || 'Unknown Account'}`,
      orderDescription: `Plan: ${planData.planName || 'Unknown Plan'} at ${store.storeName || 'Unknown Store'}`,
      orderAmount: planData.planPrice || 0,
      accountId: accountData.accountId,
      planId: planData.planId,
      employeeId: currentEmployee.userId || currentEmployee.employeeId,
      storeId: store.storeId,
      orderIsFeasible: true,
      orderStatus: 'Processing'
    }

    try {
      setIsLoading(true)

      // 1. Tạo Order và lấy response
      const orderResponse = await toast.promise(
        createOrderAPI(orderData),
        {
          pending: 'Creating order...',
          success: {
            render({ data }) {
              return 'Order created successfully'
            }
          },
          error: {
            render({ data }) {
              return data?.message || 'Failed to create order'
            }
          }
        }
      )

      // Kiểm tra response và lấy orderId
      if (!orderResponse || orderResponse.error) {
        throw new Error('Order creation failed')
      }
      const orderId = orderResponse.orderId

      // 2. Tạo Subscription
      const subscriptionData = {
        orderId: orderId,
        subscriptionStartDate: planData.startDate ? new Date(planData.startDate).toISOString().split('T')[0] : 'N/A',
        subscriptionEndDate: planData.endDate ? new Date(planData.endDate).toISOString().split('T')[0] : 'N/A',
        subscriptionAmount: planData.planPrice || 0,
        subscriptionStatus: 'Active'
      }

      const subscriptionResponse = await toast.promise(
        createSubscriptionAPI(subscriptionData),
        {
          pending: 'Creating subscription...',
          success: 'Subscription created successfully',
          error: 'Failed to create subscription'
        }
      )

      if (!subscriptionResponse || subscriptionResponse.error) {
        throw new Error('Subscription creation failed')
      }

      // 3. Tạo Deposit
      const depositData = {
        orderId: orderId,
        depositAmount: (planData.planPrice * 0.5) || 500.00
      }

      const depositResponse = await toast.promise(
        createDepositAPI(depositData),
        {
          pending: 'Creating deposit...',
          success: 'Deposit created successfully',
          error: 'Failed to create deposit'
        }
      )

      if (!depositResponse || depositResponse.error) {
        throw new Error('Deposit creation failed')
      }

      // Nếu tất cả thành công
      onSubmit()
      navigate('/management/orders')

    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Order
      </Typography>
      <Typography variant="body1" gutterBottom>
        Full Name: {accountData?.accountName || 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {accountData?.accountEmail || 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: {accountData?.accountPhone || 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Address: {accountData?.accountAddress || 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Deposit Amount: {planData?.planPrice ? `${planData.planPrice} $` : 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selected Plan: {planData?.planName ? `${planData.planName} - ${planData.planPrice} VND` : 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Start Date: {planData?.startDate ? new Date(planData.startDate).toLocaleDateString() : 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        End Date: {planData?.endDate ? new Date(planData.endDate).toLocaleDateString() : 'N/A'}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selected Store: {store?.storeName || 'N/A'}
      </Typography>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Button
          variant="contained"
          onClick={handleCompleteOrder}
          sx={{ mt: 2 }}
          disabled={isLoading || !accountData?.accountId || !planData?.planId || !store?.storeId}
        >
          Complete Order
        </Button>
      )}
    </Box>
  )
}

export default ConfirmOrder