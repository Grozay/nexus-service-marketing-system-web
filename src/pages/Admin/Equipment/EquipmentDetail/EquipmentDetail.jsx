import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getEquipmentByIdAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DescriptionIcon from '@mui/icons-material/Description'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import InventoryIcon from '@mui/icons-material/Inventory'
import CategoryIcon from '@mui/icons-material/Category'
import EventIcon from '@mui/icons-material/Event'
import BusinessIcon from '@mui/icons-material/Business'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import image from '~/assets/equipment1.png'

export default function EquipmentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState(null)

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const data = await getEquipmentByIdAPI(id)
        setEquipment(data)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch equipment details')
        navigate('/management/equipment/list')
      }
    }
    fetchEquipment()
  }, [id, navigate])

  if (!equipment) {
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
          onClick={() => navigate('/management/equipment/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Equipment Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản với ảnh */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt={equipment.equipmentName}
            src={image}
            // src={equipment.equipmentPhoto}
            variant="square"
          >
            {equipment.equipmentName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {equipment.equipmentName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Equipment ID: {equipment.equipmentId}
            </Typography>
            <Chip
              label={equipment.equipmentStatus}
              color={
                equipment.equipmentStatus === 'Active' ? 'success' :
                  equipment.equipmentStatus === 'Available' ? 'warning' :
                    equipment.equipmentStatus === 'Low Stock' ? 'error' : 'default'
              }
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Thông tin chi tiết chia thành các box */}
        <Grid container spacing={3}>
          {/* Box 1: Thông tin thiết bị */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, minHeight: '200px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Equipment Information
              </Typography>
              <DetailItem
                icon={<DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Description"
                value={equipment.equipmentDescription}
              />
              <DetailItem
                icon={<MonetizationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Cost"
                value={`$${equipment.equipmentCost.toFixed(2)}`}
              />
              <DetailItem
                icon={<InventoryIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Inventory"
                value={equipment.equipmentInventory}
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
                icon={<CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Type"
                value={equipment.equipmentType}
              />
              <DetailItem
                icon={<EventIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Created At"
                value={formatDate(equipment.equipmentCreatedAt)}
              />
            </Paper>
          </Grid>

          {/* Box 3: Thông tin nhà cung cấp */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Vendor Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DetailItem
                    icon={<BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="Vendor Name"
                    value={equipment.vendorDetails?.vendorName || 'N/A'}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DetailItem
                    icon={<PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="Vendor Phone"
                    value={equipment.vendorDetails?.vendorPhone || 'N/A'}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <DetailItem
                    icon={<EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="Vendor Email"
                    value={equipment.vendorDetails?.vendorEmail || 'N/A'}
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