import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Order } from '~/apis/mock-data'
import PaymentIcon from '@mui/icons-material/Payment'
import Chip from '@mui/material/Chip'
import { getAllBillingsAPI, getOrderIdAPI } from '~/apis'
// Mock data for billings based on orders
const generateBillingsFromOrders = (orders) => {
  return orders.map((order, index) => ({
    billingId: index + 1,
    billingName: `Billing for ${order.orderName}`,
    orderId: order.orderId,
    billingSubTotal: order.orderAmount,
    billingDiscount: 0.0,
    Tax: 0.0,
    billingTotal: order.orderAmount,
    billingDueDate: new Date(new Date(order.orderCreatedAt).setMonth(new Date(order.orderCreatedAt).getMonth() + 1)).toISOString(),
    billingNote: `Billing for order ${order.orderId}`,
    billingStatus: 'unpaid',
    billingCreatedAt: new Date().toISOString()
  }))
}

const getAllBillings = async () => {
  try {
    const response = await getAllBillingsAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return generateBillingsFromOrders(response)
  } catch (error) {
    throw new Error(error)
  }
}

const BillingList = () => {
  const [billings, setBillings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const navigate = useNavigate()
  useEffect(() => {
    const fetchBillings = async () => {
      const billings = await getAllBillings()
      setBillings(billings)
    }
    fetchBillings()
  }, [])

  // Hàm xử lý khi thay đổi search term
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  // Hàm xử lý khi thay đổi status filter
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value)
  }

  // Hàm xử lý khi click vào nút Pay
  const handlePayment = (billing) => {
    navigate(`/admin/billing/payment/${billing.billingId}`)
  }

  // Lọc billings dựa trên search term và status filter
  const filteredBillings = billings.filter(billing =>
    (billing.billingId.toString().includes(searchTerm) ||
    billing.billingName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || billing.billingStatus.toLowerCase() === statusFilter)
  )

  // Định nghĩa columns cho DataGrid
  const columns = [
    { field: 'billingId', headerName: 'Billing ID', width: 120 },
    { field: 'billingName', headerName: 'Billing Name', width: 200 },
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'billingSubTotal', headerName: 'Sub Total', width: 120, type: 'number' },
    { field: 'billingDiscount', headerName: 'Discount', width: 120, type: 'number' },
    { field: 'Tax', headerName: 'Tax', width: 100, type: 'number' },
    { field: 'billingTotal', headerName: 'Total', width: 120, type: 'number' },
    { field: 'billingDueDate', headerName: 'Due Date', width: 150 },
    {
      field: 'billingStatus',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Paid' : 'Unpaid'}
          color={params.value ? 'success' : 'warning'}
          variant="outlined"
          size="small"
        />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePayment(params.row)}
          disabled={params.row.billingStatus === 'paid'}
        >
          <PaymentIcon fontSize="small" sx={{ mr: 1 }} />
          {params.row.billingStatus === 'paid' ? 'Paid' : 'Pay'}
        </Button>
      )
    }
  ]

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Billing Management
      </Typography>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Search Id, Name"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="unpaid">Unpaid</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <DataGrid
            rows={filteredBillings}
            columns={columns}
            getRowId={(row) => row.billingId}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ height: '500px' }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default BillingList