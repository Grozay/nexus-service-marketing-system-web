import { useState, useEffect } from 'react'
import { Typography, Card, CardContent, Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getAllOrdersAPI, createBillingAPI, updateOrderAPI } from '~/apis'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { confirm } from 'material-ui-confirm'
import { formatDate } from '~/utils/formatter'

// Transform order data
const transformOrderData = (orders) => {
  if (!Array.isArray(orders)) return []
  return orders.map(order => ({
    id: order.orderId,
    name: order.orderName,
    amount: order.orderAmount,
    status: order.orderStatus,
    tax: 0.1 * order.orderAmount,
    billingTotal: order.orderAmount + 0.1 * order.orderAmount,
    plan: order.planDetails?.planName,
    employee: order.employeeDetails?.employeeName,
    store: order.storeDetails?.storeName,
    storeId: order.storeId,
    createdAt: formatDate(order.orderCreatedAt),
    isFeasible: order.orderIsFeasible,
    accountPhone: order.accountDetails?.accountPhone,
    accountAddress: order.accountDetails?.accountAddress,
    accountName: order.accountDetails?.accountName,
    accountEmail: order.accountDetails?.accountEmail,
    employeeName: order.employeeDetails?.employeeName
  }))
}

// Function to fetch all orders from API
const getAllOrders = async () => {
  try {
    const response = await getAllOrdersAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformOrderData(response)
  } catch (error) {
    throw new Error(error)
  }
}

const CreateBilling = () => {
  const [orderSearchTerm, setOrderSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Processing')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders()
        setOrders(ordersData)
      } catch (error) {
        toast.error('Failed to fetch orders', error.message)
      }
    }
    fetchData()
  }, [])

  const handleCreateBill = async (orderId) => {
    try {
      const selectedOrder = orders.find(order => order.id === orderId)
      if (!selectedOrder) {
        toast.error('Order not found')
        return
      }

      const calcTax = selectedOrder.amount * 0.1
      const billingTotal = selectedOrder.amount + calcTax

      const billingData = {
        billingName: `Bill for Order ${selectedOrder.id}`,
        orderId: selectedOrder.id,
        billingSubTotal: selectedOrder.amount,
        billingDiscount: 0,
        tax: calcTax,
        billingTotal: billingTotal,
        billingDueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        billingNote: `Bill created for order: ${selectedOrder.name}, Please pay the bill before the due date.`
      }

      // Hiển thị bảng tóm tắt thông tin trong confirm
      const { confirmed } = await confirm({
        title: 'Confirm Create Bill',
        description: (
          <Box>
            <Typography variant="body1" gutterBottom>
              Please review the billing information before creating:
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 400 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Field</strong></TableCell>
                    <TableCell><strong>Value</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Billing Name</TableCell>
                    <TableCell>{billingData.billingName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>{billingData.orderId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Subtotal</TableCell>
                    <TableCell>{billingData.billingSubTotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax (10%)</TableCell>
                    <TableCell>{billingData.tax}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{billingData.billingTotal}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Due Date</TableCell>
                    <TableCell>{formatDate(billingData.billingDueDate)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Note</TableCell>
                    <TableCell>{billingData.billingNote}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ),
        confirmationText: 'Create Bill',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        try {
          const response = await createBillingAPI(billingData)
          if (response) {
            await updateOrderAPI({ orderId: selectedOrder.id, orderStatus: 'Billed', orderIsFeasible: true })
            setOrders(orders.map(order =>
              order.id === orderId
                ? { ...order, status: 'Billed', isFeasible: true }
                : order
            ))
          }
          toast.success('Billing created successfully')
          setOrderSearchTerm('')
        } catch (error) {
          if (error?.errors) {
            const errorMessages = Object.values(error.errors).flat()
            toast.error(errorMessages.join(', ') || 'Failed to create billing')
          } else {
            toast.error(error.message || 'Failed to create billing')
          }
        }
      }
    } catch (error) {
      toast.error('Failed to create billing', error.message)
    }
  }

  const handleOrderSearchChange = (event) => {
    setOrderSearchTerm(event.target.value)
  }

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value)
  }

  const filteredOrders = orders.filter(order => {
    const searchLower = orderSearchTerm.toLowerCase()
    const matchesSearch = (
      order.id.toString().includes(searchLower) ||
      order.name?.toLowerCase().includes(searchLower) ||
      order.accountName?.toLowerCase().includes(searchLower) ||
      order.accountPhone?.toLowerCase().includes(searchLower) ||
      order.amount?.toString().includes(searchLower) ||
      order.plan?.toLowerCase().includes(searchLower) ||
      order.store?.toLowerCase().includes(searchLower) ||
      order.createdAt?.toLowerCase().includes(searchLower) ||
      order.accountAddress?.toLowerCase().includes(searchLower) ||
      order.accountEmail?.toLowerCase().includes(searchLower) ||
      order.employeeName?.toLowerCase().includes(searchLower)
    )

    const matchesStatus = statusFilter === 'All' || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const orderColumns = [
    { field: 'id', headerName: 'Order ID', width: 150 },
    { field: 'accountName', headerName: 'Customer Name', width: 180 },
    { field: 'accountPhone', headerName: 'Customer Phone', width: 150 },
    { field: 'amount', headerName: 'Order Amount', width: 80, type: 'number' },
    { field: 'tax', headerName: 'Tax (10%)', width: 80, type: 'number' },
    { field: 'billingTotal', headerName: 'Billing Total', width: 80, type: 'number' },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Processing' ? 'success' :
              params.value === 'Processed' ? 'primary' :
                params.value === 'Billed' ? 'warning' : 'error'
          }
          variant="outlined"
          size="small"
        />
      )
    },
    { field: 'plan', headerName: 'Service Plan', width: 250 },
    { field: 'store', headerName: 'Store Location', width: 150 },
    { field: 'employeeName', headerName: 'By Employee', width: 150 },
    { field: 'createdAt', headerName: 'Create Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreateBill(params.row.id)}
          disabled={params.row.status === 'Billed' || params.row.status === 'Cancelled'}
        >
          CREATE BILL
        </Button>
      )
    }
  ]

  return (
    <Card sx={{ height: '90vh' }}>
      <Typography sx={{
        fontSize: '3rem',
        fontWeight: 'bold',
        marginTop: '1rem',
        marginLeft: '1rem'
      }}>
        CREATE BILLS
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
            Select An Order to Create Bill
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Order Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                label="Order Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Processed">Processed</MenuItem>
                <MenuItem value="Billed">Billed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Search All Fields"
              variant="outlined"
              value={orderSearchTerm}
              onChange={handleOrderSearchChange}
            />
          </Box>
        </Box>
        <DataGrid
          rows={filteredOrders}
          columns={orderColumns}
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ height: '100%' }}
        />
      </CardContent>
    </Card>
  )
}

export default CreateBilling