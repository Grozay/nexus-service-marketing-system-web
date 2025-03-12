import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, InputLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useConfirm } from 'material-ui-confirm'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getAllDepositsAPI, getAllSubscriptionsAPI, sendBillAPI, updateOrderAPI } from '~/apis' // Thêm sendBillAPI
import Loading from '~/components/Loading/Loading'
import { formatDate } from '~/utils/formatter'

const transformSubscriptionData = (subscriptions) => {
  if (!Array.isArray(subscriptions)) return []
  return subscriptions.map((subscription) => ({
    subscriptionid: subscription.subscriptionId,
    amount: subscription.subscriptionAmount,
    status: subscription.subscriptionStatus,
    startDate: formatDate(subscription.subscriptionStartDate),
    endDate: formatDate(subscription.subscriptionEndDate),
    orderId: subscription.orderId,
    orderStatus: subscription.orderDetails?.orderStatus,
    accountName: subscription.orderDetails?.accountDetails?.accountName,
    accountEmail: subscription.orderDetails?.accountDetails?.accountEmail
  }))
}

export default function SendBill() {
  const [subscriptions, setSubscriptions] = useState([])
  const [deposits, setDeposits] = useState([])
  const [filteredSubscriptions, setFilteredSubscriptions] = useState([])
  const [filteredDeposits, setFilteredDeposits] = useState([])
  const [subscriptionSearch, setSubscriptionSearch] = useState('')
  const [depositSearch, setDepositSearch] = useState('')
  const [subscriptionFilter, setSubscriptionFilter] = useState('')
  const [depositFilter, setDepositFilter] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const confirm = useConfirm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [subscriptionData, depositData] = await Promise.all([
          getAllSubscriptionsAPI(),
          getAllDepositsAPI()
        ])
        const transformedSubscriptions = transformSubscriptionData(subscriptionData)
        setSubscriptions(transformedSubscriptions)
        setDeposits(depositData)
        setFilteredSubscriptions(transformedSubscriptions)
        setFilteredDeposits(depositData)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch data')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Hàm xử lý tìm kiếm
  const handleSearch = (data, searchTerm, setFilteredData) => {
    if (!searchTerm) {
      setFilteredData(data)
      return
    }
    const lowerSearch = searchTerm.toLowerCase()
    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        value && value.toString().toLowerCase().includes(lowerSearch)
      )
    )
    setFilteredData(filtered)
  }

  // Hàm xử lý lọc theo trạng thái
  const handleFilter = (data, status, setFilteredData) => {
    if (!status) {
      setFilteredData(data)
      return
    }
    const filtered = data.filter((item) => item.status === status)
    setFilteredData(filtered)
  }

  // Xử lý gửi bill
  const handleSendBill = (orderId, amount) => async () => {
    try {
      const selectedSubscription = subscriptions.find(sub => sub.orderId === orderId)
      if (!selectedSubscription) {
        toast.error('Subscription not found')
        return
      }

      const calcTax = amount * 0.1
      const billingTotal = amount + calcTax

      const billingData = {
        billingName: `Subscription Bill for Order ${orderId}`,
        orderId: orderId,
        billingSubTotal: amount,
        billingDiscount: 0,
        tax: calcTax,
        billingTotal: billingTotal,
        billingDueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(), // Chuẩn hóa định dạng
        billingNote: 'Please pay the bill before the due date.'
      }

      const { confirmed } = await confirm({
        title: 'Confirm Send Bill',
        description: (
          <Box>
            <Typography variant="body1" gutterBottom>
              Please review the billing information before sending:
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
        toast.promise(sendBillAPI(billingData), {
          pending: 'Sending bill...'
        }).then((response) => {
          if (!response.error) {
            toast.success('Bill sent successfully')
            updateOrderAPI({ orderId: orderId, orderStatus: 'Billed' })
            setSubscriptions(subscriptions.map(subscription =>
              subscription.orderId === orderId
                ? { ...subscription, orderStatus: 'Billed' }
                : subscription
            ))
          } else {
            toast.error('Failed to send bill')
          }
        })
      }
    } catch (error) {
      toast.error(error.message || 'Failed to send bill')
    }
  }

  // Xử lý refund
  const handleRefund = (depositId) => () => {
    toast.info(`Processing refund for deposit ID: ${depositId}`)
  }

  // Cột cho bảng Subscriptions
  const subscriptionColumns = [
    { field: 'subscriptionid', headerName: 'Subscription ID', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'accountName', headerName: 'Customer Name', width: 150 },
    { field: 'accountEmail', headerName: 'Customer Email', width: 180 },
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'orderStatus', headerName: 'Order Status', width: 150 },
    { field: 'startDate', headerName: 'Start Date', width: 180 },
    { field: 'endDate', headerName: 'Next Billing Date', width: 180 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSendBill(params.row.orderId, params.row.amount)}
          disabled={params.row.orderStatus === 'Canceled' || params.row.orderStatus === 'Processing' || params.row.orderStatus === 'Billed'}
        >
          Send Bill
        </Button>
      )
    }
  ]

  // Cột cho bảng Deposits
  const depositColumns = [
    { field: 'depositId', headerName: 'Deposit ID', width: 150 },
    { field: 'depositName', headerName: 'Deposit Name', width: 250 },
    { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'depositAmount', headerName: 'Amount', width: 120 },
    { field: 'depositStatus', headerName: 'Status', width: 120 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={handleRefund(params.row.depositId)}
          disabled={params.row.depositStatus === 'UnPaid' || params.row.depositStatus === 'Refunded'}
        >
          Refund
        </Button>
      )
    }
  ]

  if (isLoading) {
    return <Loading />
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Bảng Subscriptions */}
      <Typography variant="h5" gutterBottom>
        Subscriptions
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Subscriptions"
          variant="outlined"
          size="small"
          value={subscriptionSearch}
          onChange={(e) => {
            setSubscriptionSearch(e.target.value)
            handleSearch(subscriptions, e.target.value, setFilteredSubscriptions)
          }}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={subscriptionFilter}
            onChange={(e) => {
              setSubscriptionFilter(e.target.value)
              handleFilter(subscriptions, e.target.value, setFilteredSubscriptions)
            }}
            label="Filter"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="UnPaid">UnPaid</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => {
            setSubscriptionSearch('')
            setSubscriptionFilter('')
            setFilteredSubscriptions(subscriptions)
          }}
        >
          Clear Filter
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%', mb: 4 }}>
        <DataGrid
          rows={filteredSubscriptions}
          columns={subscriptionColumns}
          getRowId={(row) => row.subscriptionid}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
        />
      </Box>

      {/* Bảng Deposits */}
      <Typography variant="h5" gutterBottom>
        Deposits
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
        <TextField
          label="Search Deposits"
          variant="outlined"
          size="small"
          value={depositSearch}
          onChange={(e) => {
            setDepositSearch(e.target.value)
            handleSearch(deposits, e.target.value, setFilteredDeposits)
          }}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            value={depositFilter}
            onChange={(e) => {
              setDepositFilter(e.target.value)
              handleFilter(deposits, e.target.value, setFilteredDeposits)
            }}
            label="Filter"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="UnPaid">UnPaid</MenuItem>
            <MenuItem value="Refunded">Refunded</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          onClick={() => {
            setDepositSearch('')
            setDepositFilter('')
            setFilteredDeposits(deposits)
          }}
        >
          Clear Filter
        </Button>
      </Box>
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredDeposits}
          columns={depositColumns}
          getRowId={(row) => row.depositId}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } }
          }}
        />
      </Box>
    </Box>
  )
}