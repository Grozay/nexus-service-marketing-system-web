import React from 'react'
import {
  Container,
  Box,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Icon
} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import EditIcon from '@mui/icons-material/Edit'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import WifiIcon from '@mui/icons-material/Wifi'
import DialpadIcon from '@mui/icons-material/Dialpad'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid2'
import AppBar from '~/components/AppBar/AppBar'
const Profile = () => {
  // Sample customer data (replace with real API data)
  const customerData = {
    avatarUrl: '/static/images/avatars/avatar_default.jpg',
    name: 'John Doe',
    memberSince: '15/08/2023',
    email: 'john.doe@example.com',
    phone: '0901234567',
    address: '123 Main St, District 1, HCMC',
    username: 'johndoe123',
    accountCreated: '10/08/2023',
    registeredPlans: [
      { id: 1, name: 'Broadband 64 Kbps', connectionType: 'Broadband', registeredDate: '20/08/2023', status: 'Active', icon: <WifiIcon /> },
      { id: 2, name: 'Landline Local - Monthly', connectionType: 'Landline', registeredDate: '25/08/2023', status: 'Active', icon: <PhoneAndroidIcon /> },
      { id: 3, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 4, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 5, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 6, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 7, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 8, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 9, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> },
      { id: 10, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon /> }

    ]
  }

  const [showAllPlans, setShowAllPlans] = React.useState(false)

  const handleShowMore = () => {
    setShowAllPlans(true)
  }

  const handleShowLess = () => {
    setShowAllPlans(false)
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Profile Header */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
          <Avatar
            alt={customerData.name}
            src={customerData.avatarUrl}
            sx={{ width: 80, height: 80, mb: 1 }}
          >
            <AccountCircleIcon sx={{ width: 80, height: 80 }} />
          </Avatar>
          <Typography variant="h5" component="h2" gutterBottom>
            {customerData.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Member since {customerData.memberSince}
          </Typography>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {/* Personal Information */}
          <Grid xs={12} md={6}>
            <Typography variant="h6" component="h3" gutterBottom>
                Personal Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={customerData.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="Phone Number" secondary={customerData.phone} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Address" secondary={customerData.address} />
              </ListItem>
            </List>
          </Grid>

          {/* Account Information */}
          <Grid xs={12} md={6}>
            <Typography variant="h6" component="h3" gutterBottom>
                Account Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Username" secondary={customerData.username} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PlaylistAddCheckIcon />
                </ListItemIcon>
                <ListItemText primary="Account Created Date" secondary={customerData.accountCreated} />
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 3, mb: 3 }} />

        {/* Registered Services */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <Icon sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}><PlaylistAddCheckIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: '1.5rem' }} /></Icon>
            Registered Services
          </Typography>
          <List dense>
            {customerData.registeredPlans.slice(0, showAllPlans ? customerData.registeredPlans.length : 5).map((plan, index) => (
              <ListItem key={plan.id} 
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1, sm: 0 },
                  position: 'relative',
                  pb: { xs: 6, sm: 0 } // Thêm padding bottom cho mobile để chừa chỗ cho nút
                }}>
                <ListItemIcon>
                  {plan.icon}
                </ListItemIcon>
                <ListItemText
                  primary={plan.name}
                  secondary={`${plan.connectionType} - Registered: ${plan.registeredDate} - Status: ${plan.status}`}
                  sx={{ width: { xs: '100%', sm: 'auto' } }}
                />
                <Box 
                  sx={{ 
                    position: { xs: 'absolute', sm: 'static' },
                    bottom: { xs: 8, sm: 'auto' },
                    left: { xs: 16, sm: 'auto' },
                    width: { xs: 'calc(100% - 32px)', sm: 'auto' }
                  }}
                >
                  <Button 
                    aria-label="view" 
                    size="small" 
                    variant="outlined"
                    fullWidth
                  >
                    View Details
                  </Button>
                </Box>
              </ListItem>
            ))}
            {!showAllPlans && customerData.registeredPlans.length > 5 && (
              <Box sx={{ mt: 1 }}>
                <ListItem key="show-more">
                  <Button onClick={handleShowMore} fullWidth>
                    Show more
                  </Button>
                </ListItem>
              </Box>
            )}
            {showAllPlans && customerData.registeredPlans.length > 5 && (
              <Box sx={{ mt: 1 }}>
                <ListItem key="show-less">
                  <Button onClick={handleShowLess} fullWidth>
                    Show less
                  </Button>
                </ListItem>
              </Box>
            )}
          </List>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {/* Account Settings */}
        <Box>
          <Typography variant="h6" component="h3" gutterBottom>
            Account Settings
          </Typography>
          <List dense>
            <ListItem component={Link} to="/profile/change-password">
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItem>
            <ListItem component={Link} to="/profile/update-profile">
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" />
            </ListItem>
          </List>
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Have questions or need support? <Link href="/contact">Contact us</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile