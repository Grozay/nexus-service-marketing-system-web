import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, Button, TextField, FormControl, InputLabel, Select, MenuItem, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import PaymentIcon from '@mui/icons-material/Payment'
import Chip from '@mui/material/Chip'
import { getAllBillingsAPI, processPaymentAPI, updateBillingAPI, updateDepositAPI, updateOrderAPI, updateSubscriptionAPI } from '~/apis' // Giả định có processPaymentAPI
import { formatDate } from '~/utils/formatter'
import { toast } from 'react-toastify'

const transformBillingData = (billings) => {
  if (!Array.isArray(billings)) return []
  return billings.map(billing => ({
    id: billing.billingId,
    name: billing.billingName,
    orderId: billing.orderId,
    status: billing.billingStatus,
    total: billing.billingTotal,
    dueDate: formatDate(billing.billingDueDate),
    createdAt: formatDate(billing.billingCreatedAt),
    accountId: billing.orderDetails?.accountDetails?.accountId,
    accountName: billing.orderDetails?.accountDetails?.accountName,
    employeeName: billing.orderDetails?.employeeDetails?.employeeName,
    storeName: billing.orderDetails?.storeDetails?.storeName,
    planName: billing.orderDetails?.planDetails?.planName
  }))
}

const getAllBillings = async () => {
  try {
    const response = await getAllBillingsAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformBillingData(response)
  } catch (error) {
    throw new Error(error)
  }
}

const BillingList = () => {
  const [billings, setBillings] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [openModal, setOpenModal] = useState(false)
  const [selectedBilling, setSelectedBilling] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('Cash')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBillings = async () => {
      const billings = await getAllBillings()
      setBillings(billings)
    }
    fetchBillings()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value)
  }

  const handlePayment = (billing) => {
    setSelectedBilling(billing)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedBilling(null)
    setPaymentMethod('Cash') // Reset phương thức thanh toán
  }

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value)
  }

  const handleConfirmPayment = async () => {
    if (!selectedBilling) return

    try {
      const paymentData = {
        billingId: selectedBilling.id,
        paymentMethod: paymentMethod,
        paymentAmount: selectedBilling.total,
        paymentStatus: 'Success',
        paymentNote: 'Payment successful',
        paidAt: new Date()
      }

      const createPayment = await processPaymentAPI(paymentData) // Gọi API thanh toán
      console.log('createPayment', createPayment)
      if (createPayment == null) {
        toast.error(`Create payment failed: ${createPayment.reason || 'Unknown error'}`)
        return
      }
      // Nếu thanh toán thành công
      const updateBilling = await updateBillingAPI({ billingId: selectedBilling.id, billingStatus: 'Paid' })
      console.log('updateBilling', updateBilling)
      if (updateBilling == null) {
        toast.error(`Update billing failed: ${updateBilling.reason || 'Unknown error'}`)
        return
      }
      setBillings(billings.map(billing =>
        billing.id === selectedBilling.id
          ? { ...billing, status: 'Paid' }
          : billing
      ))
      const updateOrder = await updateOrderAPI({ orderId: selectedBilling.orderId, orderStatus: 'Processed', orderIsFeasible: true })
      console.log('updateOrder', updateOrder)
      if (updateOrder == null) {
        toast.error(`Update order failed: ${updateOrder.reason || 'Unknown error'}`)
        return
      }
      const updateSubscription = await updateSubscriptionAPI({ orderId: selectedBilling.orderId, subscriptionStatus: 'Paid' })
      if (updateSubscription == null) {
        toast.error(`Update subscription failed: ${updateSubscription.reason || 'Unknown error'}`)
        return
      }
      const updateDeposit = await updateDepositAPI({ orderId: selectedBilling.orderId, depositStatus: 'Paid' })
      if (updateDeposit == null) {
        toast.error(`Update deposit failed: ${updateDeposit.reason || 'Unknown error'}`)
        return
      }
      toast.success('Payment successful!')
      handleCloseModal()
    } catch (error) {
      toast.error(`Payment failed: ${error.message || 'Unknown error'}`)
    }
  }

  const filteredBillings = billings.filter(billing => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = (
      billing.id.toString().includes(searchLower) ||
      billing.name?.toLowerCase().includes(searchLower) ||
      billing.orderId?.toString().includes(searchLower) ||
      billing.accountId?.toString().includes(searchLower) ||
      billing.accountName?.toLowerCase().includes(searchLower) ||
      billing.employeeName?.toLowerCase().includes(searchLower) ||
      billing.storeName?.toLowerCase().includes(searchLower) ||
      billing.planName?.toLowerCase().includes(searchLower) ||
      billing.total?.toString().includes(searchLower) ||
      billing.dueDate?.toLowerCase().includes(searchLower)
    )

    const matchesStatus = statusFilter === 'All' || billing.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const columns = [
    { field: 'id', headerName: 'Billing ID', width: 80 },
    { field: 'orderId', headerName: 'Order ID', width: 120 },
    { field: 'accountId', headerName: 'Customer ID', width: 160 },
    { field: 'accountName', headerName: 'Customer Name', width: 140 },
    { field: 'employeeName', headerName: 'By Employee', width: 120 },
    { field: 'storeName', headerName: 'Store Location', width: 150 },
    { field: 'planName', headerName: 'Service Plan', width: 200 },
    { field: 'total', headerName: 'Total', width: 80, type: 'number' },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Paid' ? 'success' :
              params.value === 'Unpaid' ? 'warning' :
                params.value === 'Overdue' ? 'error' :
                  params.value === 'Cancelled' ? 'error' :
                    'default'
          }
          variant="outlined"
          size="small"
        />
      )
    },
    { field: 'dueDate', headerName: 'Due Date', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handlePayment(params.row)}
          disabled={params.row.status === 'Paid' || params.row.status === 'Cancelled'}
        >
          <PaymentIcon fontSize="small" sx={{ mr: 1 }} />
          {params.row.status === 'Paid' ? 'Paid' : 'Pay'}
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
        BILLING LIST
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
            Search Billing
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Billing Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={handleStatusChange}
                label="Billing Status"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Unpaid">Unpaid</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
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
          rows={filteredBillings}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ height: '100%' }}
        />
      </CardContent>

      {/* Modal thanh toán */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="payment-modal-title"
        aria-describedby="payment-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2
        }}>
          <Typography id="payment-modal-title" variant="h6" component="h2" gutterBottom>
            Payment for Billing #{selectedBilling?.id}
          </Typography>
          <TableContainer component={Paper} sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>Field</strong></TableCell>
                  <TableCell><strong>Value</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Billing Name</TableCell>
                  <TableCell>{selectedBilling?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>{selectedBilling?.orderId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Customer Name</TableCell>
                  <TableCell>{selectedBilling?.accountName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total</TableCell>
                  <TableCell>{selectedBilling?.total}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Due Date</TableCell>
                  <TableCell>{selectedBilling?.dueDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Select Payment Method:
            </Typography>
            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              row
            >
              <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="CreditCard" control={<Radio />} label="Credit Card" />
              <FormControlLabel value="BankTransfer" control={<Radio />} label="Bank Transfer" />
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmPayment}
              startIcon={<PaymentIcon />}
            >
              Pay
            </Button>
          </Box>
        </Box>
      </Modal>
    </Card>
  )
}

export default BillingList