import { useState, useEffect } from 'react'
import { Typography, Card, CardContent, Button, TextField } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { getAllOrdersAPI, createBillingAPI } from '~/apis'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { confirm } from 'material-ui-confirm'
// Transform order data to the format suitable for DataGrid
const transformOrderData = (orders) => {
  if (!Array.isArray(orders)) return []
  return orders
    .filter(order => !order.isDeleted) // Filter out deleted orders
    .map(order => ({
      id: order.orderId,
      name: order.orderName,
      description: order.orderDescription,
      amount: order.orderAmount,
      status: order.orderStatus,
      plan: order.planDetails?.planName,
      employee: order.employeeDetails?.employeeName,
      store: order.storeDetails?.storeName,
      storeId: order.storeId,
      createdAt: new Date(order.orderCreatedAt),
      isActive: order.orderIsFeasible,
      accountEmail: order.accountDetails?.accountEmail,
      accountPhone: order.accountDetails?.accountPhone,
      accountAddress: order.accountDetails?.accountAddress
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
  // State to manage order search term
  const [orderSearchTerm, setOrderSearchTerm] = useState('')
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersData = await getAllOrders()
        setOrders(ordersData)
      } catch (error) {
        console.error('Failed to fetch orders', error) // Log error for debugging
        toast.error('Failed to fetch orders') // Show error to user
      }
    }
    fetchData()
  }, [])

  const handleCreateBill = async (orderId) => {
    try {
      // Find the selected order from the orders list
      const selectedOrder = orders.find(order => order.id === orderId)
      if (!selectedOrder) {
        toast.error('Order not found') // Show error to user if order is not found
        return // Exit the function if order not found
      }

      // Prepare billing data
      const billingData = {
        billing: {  // Add billing object
          billingName: `Bill for Order ${selectedOrder.id}`,
          subscriptionId: selectedOrder.plan ? parseInt(selectedOrder.plan) : null, // Convert to integer
          depositId: null,
          billingSubTotal: selectedOrder.amount,
          billingDiscount: 0,
          Tax: 0,
          billingTotal: selectedOrder.amount,
          billingDueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
          billingNote: `Bill created for order: ${selectedOrder.name}`,
          billingStatus: 'Pending',
          billingCreatedAt: new Date(),
          billingUpdatedAt: new Date()
        }
      }

      const { confirmed } = await confirm({
        title: 'Confirm Create Billing',
        description: 'Are you sure you want to create a billing for this order?',
        confirmationText: 'Create Billing',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        try {
          await createBillingAPI(billingData)
          toast.success('Billing created successfully') // Show success notification
        } catch (error) {
          if (error?.errors) {
            // Handle backend validation errors
            const errorMessages = Object.values(error.errors).flat()
            toast.error(errorMessages.join(', ') || 'Failed to create billing') // Show error notification with backend errors
          } else {
            // Handle other errors (e.g., network errors, API errors)
            toast.error(error.message || 'Failed to create billing') // Show generic error notification
          }
        }
      } else {
        throw new Error('Billing creation cancelled by user') // Throw error to prevent further execution in case of cancellation - although not strictly necessary here as it's just a cancellation
      }
    } catch (error) {
      // Catch errors from confirm dialog or order not found or cancellation
      console.error('Error during billing creation:', error) // Log error for debugging
      if (error.message !== 'Billing creation cancelled by user') { // Avoid showing error toast for user cancellation
        toast.error(error.message || 'Failed to create billing') // Show generic error notification for other errors
      }
    }
  }

  // Function to handle order search term changes
  const handleOrderSearchChange = (event) => {
    setOrderSearchTerm(event.target.value)
  }

  // Filter orders that are 'Processing' based on search term
  const processingOrders = orders.filter(order =>
    order.status === 'Processing' && // use status instead of orderStatus to match transformed data
    String(order.id).includes(orderSearchTerm) // use id instead of orderId and convert to String for includes
  )

  // Columns for DataGrid to display order list
  const orderColumns = [
    { field: 'id', headerName: 'Order ID', width: 100 },
    { field: 'name', headerName: 'Order Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'amount', headerName: 'Amount', width: 100, type: 'number' },
    { field: 'status', headerName: 'Status', width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'Processing' ? 'success' : 'error'}
          variant="outlined"
          size="small"
        />
      )
    },
    { field: 'plan', headerName: 'Plan', width: 150 },
    { field: 'store', headerName: 'Store', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150, type: 'dateTime', format: 'yyyy-MM-dd hh:mm:ss' },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCreateBill(params.row.id)}
        >
          Create Bill
        </Button>
      )
    }
  ]

  return (
    <Card>
      <CardContent>
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
          getRowId={(row) => row.id}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{ height: '400px' }}
        />
      </CardContent>
    </Card>
  )
}

export default CreateBilling