import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getAccountByIdAPI } from '~/apis' // Giả định API cho customer
import { formatDate } from '~/utils/formatter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import CakeIcon from '@mui/icons-material/Cake'
import EventIcon from '@mui/icons-material/Event'
import CategoryIcon from '@mui/icons-material/Category'
import LocationCityIcon from '@mui/icons-material/LocationCity'

export default function CustomerDetail() {
  const { id } = useParams() // Lấy accountId từ URL
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)

  // Fetch thông tin khách hàng khi component được mount
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await getAccountByIdAPI(id)
        setCustomer(data)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch customer details')
        navigate('/management/customer/list')
      }
    }
    fetchCustomer()
  }, [id, navigate])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!customer) {
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
          onClick={() => navigate('/management/customer/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Customer Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản với avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt={customer.accountName}
            src="/path-to-avatar.jpg" // Thay bằng URL ảnh nếu có
          >
            {customer.accountName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {customer.accountName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Account ID: {customer.accountId}
            </Typography>
            <Chip
              label={customer.accountIsActive ? 'Active' : 'Inactive'}
              color={customer.accountIsActive ? 'success' : 'error'}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Thông tin chi tiết chia thành các box */}
        <Grid container spacing={3}>
          {/* Box 1: Thông tin liên hệ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Contact Information
              </Typography>
              <DetailItem
                icon={<EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Email"
                value={customer.accountEmail}
              />
              <DetailItem
                icon={<PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Phone"
                value={customer.accountPhone}
              />
              <DetailItem
                icon={<HomeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Address"
                value={customer.accountAddress}
              />
            </Paper>
          </Grid>

          {/* Box 2: Thông tin cá nhân */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Personal Information
              </Typography>
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Gender"
                value={customer.accountGender}
              />
              <DetailItem
                icon={<CakeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Date of Birth"
                value={formatDate(customer.accountDOB)}
              />
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Identity"
                value={customer.accountIdentity || 'N/A'}
              />
            </Paper>
          </Grid>

          {/* Box 3: Thông tin tài khoản */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Account Information
              </Typography>
              <DetailItem
                icon={<EventIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Join Date"
                value={formatDate(customer.accountCreatedAt)}
              />
              <DetailItem
                icon={<LocationCityIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="City"
                value={customer.cityCodeDetails?.cityName || 'N/A'}
              />
              <DetailItem
                icon={<CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Category"
                value={customer.categoryDetails?.categoryName || 'N/A'}
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