import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Typography, Button, Modal, TextField, Grid, Paper } from '@mui/material'
import { toast } from 'react-toastify'
import { getBillingByIdAPI, createVNPayPaymentAPI } from '~/apis'
import NavBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'

export default function Payment() {
  const [billing, setBilling] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [openCreditCardModal, setOpenCreditCardModal] = useState(false)
  const location = useLocation()

  // Lấy billingId từ URL
  const queryParams = new URLSearchParams(location.search)
  const billingId = queryParams.get('billingId')

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        setIsLoading(true)
        const response = await getBillingByIdAPI(billingId)
        setBilling(response)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch billing information')
      } finally {
        setIsLoading(false)
      }
    }

    if (billingId) {
      fetchBilling()
    } else {
      toast.error('No billing ID provided')
      setIsLoading(false)
    }
  }, [billingId])

  // Xử lý mở/đóng modal
  const handleOpenCreditCardModal = () => setOpenCreditCardModal(true)
  const handleCloseCreditCardModal = () => setOpenCreditCardModal(false)

  // Xử lý thanh toán Credit Card (giả lập)
  const handleCreditCardPayment = () => {
    toast.success('Credit Card payment processed successfully (simulation)')
    handleCloseCreditCardModal()
  }

  // Xử lý thanh toán VNPay
  const handleVNPayPayment = async () => {
    try {
      const data = {
        billingId: parseInt(billingId),
        amount: billing.billingTotal
      }
      const response = await createVNPayPaymentAPI(data)
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl
      } else {
        toast.error('Failed to initiate VNPay payment')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to create VNPay payment')
    }
  }

  if (isLoading) {
    return <Box>Loading...</Box>
  }

  if (!billing) {
    return (
      <>
        <NavBar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <Typography variant="h4">No billing information found</Typography>
        </Box>
        <Footer />
      </>
    )
  }

  return (
    <>
      <NavBar />
      <Box sx={{ p: 4, maxWidth: 600, margin: '0 auto' }}>
        {/* Tiêu đề */}
        <Typography variant="h4" gutterBottom align="center">
          Payment for Billing #{billing.billingId}
        </Typography>

        {/* Thông tin hóa đơn */}
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6">Billing Details</Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Typography><strong>Billing Name:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{billing.billingName}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Order ID:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{billing.orderId}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Subtotal:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>${billing.billingSubTotal?.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Tax (10%):</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>${billing.tax?.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Total Amount:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">${billing.billingTotal?.toFixed(2)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Due Date:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{new Date(billing.billingDueDate).toLocaleDateString()}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography><strong>Note:</strong></Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{billing.billingNote}</Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Nút chọn phương thức thanh toán */}
        <Typography variant="h6" gutterBottom>
          Choose Payment Method
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleOpenCreditCardModal}>
            Pay with Credit Card
          </Button>
          <Button variant="contained" color="secondary" onClick={handleVNPayPayment}>
            Pay with VNPay
          </Button>
        </Box>

        {/* Modal cho Credit Card (giả lập) */}
        <Modal open={openCreditCardModal} onClose={handleCloseCreditCardModal}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}>
            <Typography variant="h6" gutterBottom>
              Credit Card Payment
            </Typography>
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
              placeholder="1234 5678 9012 3456"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Expiration Date"
                  fullWidth
                  margin="normal"
                  placeholder="MM/YY"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="CVV"
                  fullWidth
                  margin="normal"
                  placeholder="123"
                />
              </Grid>
            </Grid>
            <TextField
              label="Cardholder Name"
              fullWidth
              margin="normal"
              placeholder="John Doe"
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button variant="contained" color="primary" onClick={handleCreditCardPayment}>
                Pay Now
              </Button>
              <Button variant="outlined" onClick={handleCloseCreditCardModal}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <Footer />
    </>
  )
}