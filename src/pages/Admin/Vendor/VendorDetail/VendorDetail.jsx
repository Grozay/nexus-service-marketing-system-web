import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getVendorByIdAPI } from '~/apis' // Giả định API cho vendor
import { formatDate } from '~/utils/formatter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BusinessIcon from '@mui/icons-material/Business'
import DescriptionIcon from '@mui/icons-material/Description'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import HomeIcon from '@mui/icons-material/Home'
import EventIcon from '@mui/icons-material/Event'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

export default function VendorDetail() {
  const { id } = useParams() // Lấy vendorId từ URL
  const navigate = useNavigate()
  const [vendor, setVendor] = useState(null)

  // Fetch thông tin nhà cung cấp khi component được mount
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const data = await getVendorByIdAPI(id)
        setVendor(data)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch vendor details')
        navigate('/management/vendor/list')
      }
    }
    fetchVendor()
  }, [id, navigate])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!vendor) {
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
          onClick={() => navigate('/management/vendor/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Vendor Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản với avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt={vendor.vendorName}
            src="/path-to-vendor-logo.jpg" // Thay bằng URL logo nếu có
          >
            {vendor.vendorName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {vendor.vendorName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Vendor ID: {vendor.vendorId}
            </Typography>
            <Chip
              label={vendor.vendorStatus}
              color={vendor.vendorStatus === 'Active' ? 'success' : 'error'}
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
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, minHeight: '200px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Contact Information
              </Typography>
              <DetailItem
                icon={<PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Phone"
                value={vendor.vendorPhone}
              />
              <DetailItem
                icon={<EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Email"
                value={vendor.vendorEmail}
              />
              <DetailItem
                icon={<HomeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Address"
                value={vendor.vendorAddress}
              />
            </Paper>
          </Grid>

          {/* Box 2: Thông tin bổ sung */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, minHeight: '200px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Additional Information
              </Typography>
              <DetailItem
                icon={<DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Description"
                value={vendor.vendorDescription}
              />
              <DetailItem
                icon={<EventIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Created At"
                value={formatDate(vendor.vendorCreatedAt)}
              />
            </Paper>
          </Grid>

          {/* Box 3: Thời gian hợp tác */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Partnership Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <DetailItem
                    icon={<CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="Start Date"
                    value={formatDate(vendor.vendorStartFrom)}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <DetailItem
                    icon={<CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="End Date"
                    value={formatDate(vendor.vendorEndTo)}
                  />
                </Grid>
              </Grid>
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