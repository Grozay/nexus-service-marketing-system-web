import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getOrderByIdAPI } from '~/apis' // Giả định API lấy chi tiết đơn hàng
import { formatDate } from '~/utils/formatter' // Hàm định dạng ngày và tiền tệ
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonIcon from '@mui/icons-material/Person'
import StoreIcon from '@mui/icons-material/Store'
import PlanIcon from '@mui/icons-material/Subscriptions'
import EventIcon from '@mui/icons-material/Event'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DescriptionIcon from '@mui/icons-material/Description'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function OrderDetail() {
  const { id } = useParams() // Lấy orderId từ URL
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  // Fetch thông tin đơn hàng khi component được mount
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderByIdAPI(id)
        setOrder(data)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch order details')
        navigate('/management/order/list')
      }
    }
    fetchOrder()
  }, [id, navigate])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!order) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header với nút quay lại */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/management/orders/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Order Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {order.orderName}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Order ID: {order.orderId}
              </Typography>
              <Chip
                label={order.orderStatus}
                color={
                  order.orderStatus === 'Processing'
                    ? 'warning'
                    : order.orderStatus === 'Completed'
                      ? 'success'
                      : 'error'
                }
                variant="outlined"
                size="small"
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Thông tin chi tiết chia thành các box */}
        <Grid container spacing={3}>
          {/* Box 1: Thông tin đơn hàng */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Order Information
              </Typography>
              <DetailItem
                icon={<DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Description"
                value={order.orderDescription}
              />
              <DetailItem
                icon={<AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Amount"
                value={order.orderAmount}
              />
              <DetailItem
                icon={<CheckCircleIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Feasible"
                value={order.orderIsFeasible ? 'Yes' : 'No'}
              />
              <DetailItem
                icon={<EventIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Created At"
                value={formatDate(order.orderCreatedAt)}
              />
            </Paper>
          </Grid>

          {/* Box 2: Thông tin khách hàng */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Customer Information
              </Typography>
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Name"
                value={order.accountDetails.accountName}
              />
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Email"
                value={order.accountDetails.accountEmail}
              />
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Phone"
                value={order.accountDetails.accountPhone}
              />
            </Paper>
          </Grid>

          {/* Box 3: Thông tin gói dịch vụ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Plan Information
              </Typography>
              <DetailItem
                icon={<PlanIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Plan Name"
                value={order.planDetails.planName}
              />
              <DetailItem
                icon={<AttachMoneyIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Price"
                value={order.planDetails.planPrice}
              />
              <DetailItem
                icon={<DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Description"
                value={order.planDetails.planDescription}
              />
            </Paper>
          </Grid>

          {/* Box 4: Thông tin cửa hàng và nhân viên */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Store & Employee
              </Typography>
              <DetailItem
                icon={<StoreIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Store Name"
                value={order.storeDetails.storeName}
              />
              <DetailItem
                icon={<StoreIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Store Address"
                value={order.storeDetails.storeAddress}
              />
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Employee"
                value={order.employeeDetails.employeeName}
              />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

// Component hiển thị từng mục thông tin với icon
const DetailItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    {icon}
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || 'N/A'}</Typography>
    </Box>
  </Box>
)