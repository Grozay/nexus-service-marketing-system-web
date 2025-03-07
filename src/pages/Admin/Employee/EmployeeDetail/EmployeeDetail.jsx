import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip, Avatar } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getEmployeeByIdAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import WorkIcon from '@mui/icons-material/Work'
import CakeIcon from '@mui/icons-material/Cake'
import EventIcon from '@mui/icons-material/Event'

export default function EmployeeDetail() {
  const { id } = useParams() // Lấy employeeId từ URL
  const navigate = useNavigate()
  const [employee, setEmployee] = useState(null)

  // Fetch thông tin nhân viên khi component được mount
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeByIdAPI(id)
        setEmployee(data)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch employee details')
        navigate('/management/employee/list')
      }
    }
    fetchEmployee()
  }, [id, navigate])

  // Nếu chưa có dữ liệu, hiển thị loading
  if (!employee) {
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
          onClick={() => navigate('/management/employee/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Employee Details
        </Typography>
      </Box>

      {/* Main content */}
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        {/* Thông tin cơ bản với avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt={employee.employeeName}
            src="/path-to-avatar.jpg" // Thay bằng URL ảnh nếu có
          >
            {employee.employeeName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {employee.employeeName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Employee ID: {employee.employeeId}
            </Typography>
            <Chip
              label={employee.employeeIsActive ? 'Active' : 'Inactive'}
              color={employee.employeeIsActive ? 'success' : 'error'}
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
                value={employee.employeeEmail}
              />
              <DetailItem
                icon={<PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Phone"
                value={employee.employeePhone}
              />
              <DetailItem
                icon={<HomeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Address"
                value={employee.employeeAddress}
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
                value={employee.employeeGender}
              />
              <DetailItem
                icon={<CakeIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Date of Birth"
                value={formatDate(employee.employeeDOB)}
              />
              <DetailItem
                icon={<PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Identity"
                value={employee.employeeIdentity || 'N/A'}
              />
            </Paper>
          </Grid>

          {/* Box 3: Thông tin công việc */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Job Information
              </Typography>
              <DetailItem
                icon={<WorkIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Role"
                value={employee.employeeRole}
              />
              <DetailItem
                icon={<EventIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                label="Join Date"
                value={formatDate(employee.employeeCreatedAt)}
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