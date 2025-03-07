import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getRetailShopByIdAPI } from '~/apis' // Giả định API cho retail shop
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StoreIcon from '@mui/icons-material/Store'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import HomeIcon from '@mui/icons-material/Home'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function RetailShopDetail() {
  const { id } = useParams() // Lấy storeId từ URL
  const navigate = useNavigate()
  const [shop, setShop] = useState(null)

  // Fetch thông tin cửa hàng khi component được mount
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const data = await getRetailShopByIdAPI(id)
        setShop(data)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch retail shop details')
        navigate('/management/retailshop/list')
      }
    }
    fetchShop()
  }, [id, navigate])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!shop) {
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
          onClick={() => navigate('/management/retail-shop/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Retail Shop Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản với avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt={shop.storeName}
            src="/path-to-shop-image.jpg" // Thay bằng URL ảnh nếu có
          >
            {shop.storeName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {shop.storeName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Store ID: {shop.storeId}
            </Typography>
            <Chip
              label={shop.storeStatus}
              color={shop.storeStatus === 'Active' ? 'success' : 'error'}
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
                Contact & Location
              </Typography>
              <DetailItem
                icon={<PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Phone"
                value={shop.storePhone}
              />
              <DetailItem
                icon={<HomeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Address"
                value={shop.storeAddress}
              />
              <DetailItem
                icon={<LocationCityIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="City"
                value={shop.storeCity}
              />
            </Paper>
          </Grid>

          {/* Box 2: Thông tin hoạt động */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, minHeight: '200px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Operation Information
              </Typography>
              <DetailItem
                icon={<AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Open At"
                value={shop.storeOpenAt}
              />
              <DetailItem
                icon={<AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Close At"
                value={shop.storeCloseAt}
              />
            </Paper>
          </Grid>

          {/* Box 3: Bản đồ */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Location Map
              </Typography>
              <MapContainer
                center={[parseFloat(shop.storeLatitude), parseFloat(shop.storeLongitude)]}
                zoom={13}
                style={{ height: '300px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[parseFloat(shop.storeLatitude), parseFloat(shop.storeLongitude)]}>
                  <Popup>
                    <Box>
                      <Typography variant="subtitle1">{shop.storeName}</Typography>
                      <Typography variant="body2">{shop.storeAddress}</Typography>
                    </Box>
                  </Popup>
                </Marker>
              </MapContainer>
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