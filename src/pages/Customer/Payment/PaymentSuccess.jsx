import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'

const API_URL = 'https://localhost:5189/api' // Thay bằng port của backend

export default function PaymentSuccess() {
  const location = useLocation()

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const queryString = location.search
        const response = await axios.get(`${API_URL}/VnPay/payment-callback${queryString}`)
        if (response.data.message === 'Payment successful') {
          toast.success(`Payment successful! Transaction ID: ${response.data.transactionNo}`)
        } else {
          toast.error('Payment failed')
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error verifying payment')
      }
    }

    verifyPayment()
  }, [location])

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4">Processing Payment...</Typography>
      <Typography>Please wait while we verify your transaction.</Typography>
    </Box>
  )
}