import React, { useState } from 'react'
import { Box, Typography, Card, CardContent, Button, TextField, Modal, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { Order } from '~/apis/mock-data'

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

const mockBillings = generateBillingsFromOrders(Order)

const Billing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [openModal, setOpenModal] = useState(false)
  const [orderSearchTerm, setOrderSearchTerm] = useState('')
  const navigate = useNavigate()

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value)
  }

  const handleOrderSearchChange = (event) => {
    setOrderSearchTerm(event.target.value)
  }

  const handlePayment = (billing) => {
    navigate(`/admin/billing/payment/${billing.billingId}`)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const filteredBillings = mockBillings.filter(billing =>
    (billing.billingId.toString().includes(searchTerm) ||
    billing.billingName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === 'all' || billing.billingStatus.toLowerCase() === statusFilter)
  )

  const processingOrders = Order.filter(order =>
    order.orderStatus === 'Processing' &&
    order.orderId.toString().includes(orderSearchTerm)
  )

  const columns = [
    { field: 'billingId', headerName: 'Billing ID', width: 120 },
    { field: 'billingName', headerName: 'Billing Name', width: 200 },
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'billingSubTotal', headerName: 'Sub Total', width: 120, type: 'number' },
    { field: 'billingDiscount', headerName: 'Discount', width: 120, type: 'number' },
    { field: 'Tax', headerName: 'Tax', width: 100, type: 'number' },
    { field: 'billingTotal', headerName: 'Total', width: 120, type: 'number' },
    { field: 'billingDueDate', headerName: 'Due Date', width: 150 },
    { field: 'billingStatus', headerName: 'Status', width: 120 },
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
          {params.row.billingStatus === 'paid' ? 'Paid' : 'Pay'}
        </Button>
      )
    }
  ]

  const orderColumns = [
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'orderName', headerName: 'Order Name', width: 200 },
    { field: 'orderAmount', headerName: 'Amount', width: 120, type: 'number' },
    { field: 'orderStatus', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            handleCloseModal()
          }}
        >
          Create Bill
        </Button>
      )
    }
  ]

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Billing Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        sx={{ mb: 2 }}
      >
        Create Bill
      </Button>
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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="create-bill-modal"
        aria-describedby="create-bill-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select Order to Create Bill
          </Typography>
          <TextField
            label="Search Order ID"
            variant="outlined"
            fullWidth
            value={orderSearchTerm}
            onChange={handleOrderSearchChange}
            sx={{ mb: 2 }}
          />
          <DataGrid
            rows={processingOrders}
            columns={orderColumns}
            getRowId={(row) => row.orderId}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ height: '400px' }}
          />
        </Box>
      </Modal>
    </Box>
  )
}

export default Billing