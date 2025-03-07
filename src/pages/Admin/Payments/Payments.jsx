import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getAllPaymentsAPI } from '~/apis'
import Chip from '@mui/material/Chip'
import PaymentIcon from '@mui/icons-material/Payment'

const PaymentList = () => {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await getAllPaymentsAPI()
        if (response && Array.isArray(response.data)) {
          // Transform dữ liệu payments để đảm bảo đúng cấu trúc
          const transformedPayments = response.data.map(payment => ({
            paymentId: payment.paymentId, // map paymentId
            billingId: payment.billingId, // map billingId
            paymentMethod: payment.paymentMethod, // map paymentMethod
            paymentAmount: payment.paymentAmount, // map paymentAmount
            paymentNote: payment.paymentNote, // map paymentNote
            paymentStatus: payment.paymentStatus, // map paymentStatus
            PaidAt: payment.PaidAt, // map PaidAt
            paymentCreatedAt: payment.paymentCreatedAt // map paymentCreatedAt
          }))
          setPayments(transformedPayments) // Cập nhật state payments với dữ liệu đã được transform
        } else {
          console.error('Failed to fetch payments or invalid response:', response)
          setPayments([])
        }
      } catch (error) {
        console.error('Error fetching payments:', error)
        setPayments([])
      }
    }
    fetchPayments()
  }, [])

  // Function to handle search term changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }


  // Filter payments based on search term
  const filteredPayments = payments.filter(payment =>
    payment.paymentId?.toString().includes(searchTerm) ||
    payment.paymentMethod?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Define columns for DataGrid
  const columns = [
    { field: 'paymentId', headerName: 'Payment ID', width: 100 },
    { field: 'billingId', headerName: 'Billing ID', width: 100 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
    { field: 'paymentAmount', headerName: 'Amount', width: 120, type: 'number' },
    { field: 'paymentNote', headerName: 'Payment Note', width: 200 },
    {
      field: 'paymentStatus',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Paid' ? 'success' : 'warning'}
          variant="outlined"
          size="small"
        />
      )
    },
    { field: 'PaidAt', headerName: 'Paid At', width: 150 },
    { field: 'paymentCreatedAt', headerName: 'Created At', width: 150 }
  ]

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Payment Management
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Search Payment ID, Method"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
          <DataGrid
            rows={filteredPayments}
            columns={columns}
            getRowId={(row) => row.paymentId}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ height: '500px' }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default PaymentList