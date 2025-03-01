import React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ConfirmOrder = ({ accountData, planData, onSubmit }) => {
  const navigate = useNavigate()
  const handleCompleteOrder = () => {
    // Gọi hàm onSubmit từ props để xử lý logic hoàn tất đơn hàng
    try {
    //   const response = await axios.post('/api/orders', {
    //     accountData,
    //     planData
    //   })
    //   console.log(response)
      onSubmit()
      navigate('/admin/orders/list')
    } catch (error) {
      console.error('Error completing order:', error)
    }
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Order
      </Typography>
      <Typography variant="body1" gutterBottom>
        Full Name: {accountData.fullName}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {accountData.email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone: {accountData.phone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Address: {accountData.address}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Selected Plan: {planData.planName} - {planData.planPrice} VND
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