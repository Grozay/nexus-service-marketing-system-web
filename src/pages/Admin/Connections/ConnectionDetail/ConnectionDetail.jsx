import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { GetPlanBySlugAPI } from '~/apis' // Giả định API cho plan
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DescriptionIcon from '@mui/icons-material/Description'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import CategoryIcon from '@mui/icons-material/Category'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import InfoIcon from '@mui/icons-material/Info'

export default function PlanDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        if (!slug) {
          throw new Error('no connection plan')
        }
        const data = await GetPlanBySlugAPI(slug)
        setPlan(data)
      } catch (error) {
        toast.error(error.message || 'Không thể tải thông tin gói dịch vụ')
        navigate('/management/plan/list')
      }
    }
    fetchPlan()
  }, [slug, navigate])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!plan) {
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
          onClick={() => navigate('/management/connection-plans/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Plan Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản với avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {plan.planName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Plan ID: {plan.planId}
            </Typography>
            <Chip
              label={plan.planIsActive ? 'Active' : 'Inactive'}
              color={plan.planIsActive ? 'success' : 'error'}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Thông tin chi tiết chia thành các box */}
        <Grid container spacing={3}>
          {/* Box 1: Thông tin gói dịch vụ */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2, minHeight: '200px' }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Plan Information
              </Typography>
              <DetailItem
                icon={<DescriptionIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Details"
                value={plan.planDetails}
              />
              <DetailItem
                icon={<MonetizationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Price"
                value={`$${plan.planPrice}`}
              />
              <DetailItem
                icon={<AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Validity"
                value={plan.planValidity}
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
                value={plan.planType}
              />
              <DetailItem
                icon={<InfoIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Description"
                value={plan.planDescription}
              />
            </Paper>
          </Grid>

          {/* Box 3: Thông tin danh mục */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Category Information
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <DetailItem
                    icon={<CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="Category Name"
                    value={plan.plan_Category?.categoryName || 'N/A'}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <DetailItem
                    icon={<MonetizationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    label="Category Deposit"
                    value={`$${plan.plan_Category?.categoryDeposit || 'N/A'}`}
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