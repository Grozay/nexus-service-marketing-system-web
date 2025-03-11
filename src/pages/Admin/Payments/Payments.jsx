import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getAllPaymentsAPI } from '~/apis'
import Chip from '@mui/material/Chip'
import { formatDate } from '~/utils/formatter'
import { toast } from 'react-toastify' // Thêm để thông báo lỗi

const transformedPayments = (payments) => {
  if (!Array.isArray(payments)) return []
  return payments.map(payment => ({
    paymentId: payment.paymentId,
    billingId: payment.billingId,
    paymentMethod: payment.paymentMethod,
    paymentAmount: payment.paymentAmount,
    paymentNote: payment.paymentNote,
    paymentStatus: payment.paymentStatus,
    PaidAt: payment.PaidAt ? formatDate(payment.PaidAt) : '',
    paymentCreatedAt: formatDate(payment.paymentCreatedAt)
  }))
}
const getAllPayments = async () => {
  try {
    const response = await getAllPaymentsAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformedPayments(response)
  } catch (error) {
    throw new Error(error)
  }
}

const PaymentList = () => {
  const [payments, setPayments] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All') // Sửa giá trị mặc định thành 'All'

  useEffect(() => {
    const fetchPayments = async () => {
      const payments = await getAllPayments()
      setPayments(payments)
    }
    fetchPayments()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value)
  }

  // Filter payments với tìm kiếm trên tất cả các trường và trạng thái
  const filteredPayments = payments.filter(payment => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = (
      payment.paymentId?.toString().includes(searchLower) ||
      payment.billingId?.toString().includes(searchLower) ||
      payment.paymentMethod?.toLowerCase().includes(searchLower) ||
      payment.paymentAmount?.toString().includes(searchLower) ||
      payment.paymentNote?.toLowerCase().includes(searchLower) ||
      payment.paymentStatus?.toLowerCase().includes(searchLower) ||
      payment.PaidAt?.toLowerCase().includes(searchLower) ||
      payment.paymentCreatedAt?.toLowerCase().includes(searchLower)
    )

    const matchesStatus = statusFilter === 'All' || payment.paymentStatus === statusFilter

    return matchesSearch && matchesStatus
  })

  const columns = [
    { field: 'paymentId', headerName: 'Payment ID', width: 150 },
    { field: 'billingId', headerName: 'Billing ID', width: 150 },
    { field: 'paymentMethod', headerName: 'Payment Method', width: 200 },
    { field: 'paymentAmount', headerName: 'Amount', width: 200 },
    { field: 'paymentNote', headerName: 'Payment Note', width: 300 },
    {
      field: 'paymentStatus',
      headerName: 'Status',
      width: 200,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Success' ? 'success' :
              params.value === 'Fail' ? 'error' : 'warning'
          }
          variant="outlined"
          size="small"
        />
      )
    },
    { field: 'PaidAt', headerName: 'Paid At', width: 150 },
    { field: 'paymentCreatedAt', headerName: 'Created At', width: 150 }
  ]

  return (
    <Card sx={{ height: '90vh' }}>
      <Typography sx={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginTop: '1rem',
        marginLeft: '1rem'
      }}>
        PAYMENT HISTORY
      </Typography>
      <CardContent sx={{ height: '75vh' }}>
        <Box sx={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}>
          <Typography variant="h5" gutterBottom>
            Search Payments
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Payment Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                label="Payment Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Success">Success</MenuItem>
                <MenuItem value="Fail">Fail</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Search All Fields"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Box>
        </Box>
        <DataGrid
          rows={filteredPayments}
          columns={columns}
          getRowId={(row) => row.paymentId}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ height: '100%' }}
        />
      </CardContent>
    </Card>
  )
}

export default PaymentList