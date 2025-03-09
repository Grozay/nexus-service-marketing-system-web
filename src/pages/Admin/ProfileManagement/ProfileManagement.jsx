import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { getEmployeeByIdAPI } from '~/apis'
import { useState, useEffect } from 'react'
const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper
}))


const InfoItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2)
}))

const Profile = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const [employeeData, setEmployeeData] = useState(null)

  const fetchEmployeeData = async () => {
    const employeeData = await getEmployeeByIdAPI(currentUser.userId)
    setEmployeeData(employeeData)
  }

  useEffect(() => {
    fetchEmployeeData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handleUpdatePassword = () => {
    navigate('/management/profile/update-password')
  }

  return (
    <Container maxWidth="md">
      <ProfilePaper elevation={3}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            {employeeData?.employeeName}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {employeeData?.employeeEmail}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                User ID
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {employeeData?.employeeId}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                Role
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {employeeData?.employeeRole === 'admin'
                  ? 'Administrator'
                  : employeeData?.employeeRole === 'css'
                    ? 'Customer Service Staff'
                    : employeeData?.employeeRole === 'tes'
                      ? 'Technical Staff'
                      : employeeData?.employeeRole === 'acs'
                        ? 'Accountant Staff'
                        : 'Unknown Role'}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                Identity
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {employeeData?.employeeIdentity}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                Date of Birth
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {formatDate(employeeData?.employeeDOB)}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                Gender
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {employeeData?.employeeGender}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                Phone
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {employeeData?.employeePhone}
              </Typography>
            </InfoItem>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <InfoItem>
              <Typography variant="h6" color="text.primary">
                Address
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {employeeData?.employeeAddress}
              </Typography>
            </InfoItem>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleUpdatePassword}
          >
            Update Password
          </Button>
        </Box>
      </ProfilePaper>
    </Container>
  )
}

export default Profile