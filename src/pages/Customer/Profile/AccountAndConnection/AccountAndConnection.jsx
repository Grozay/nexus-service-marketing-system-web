import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import ListItemIcon from '@mui/material/ListItemIcon'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Link } from 'react-router-dom'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import WifiIcon from '@mui/icons-material/Wifi'
import CableIcon from '@mui/icons-material/Cable'
import SettingsIcon from '@mui/icons-material/Settings'

const AccountAndConnection = () => {
  // Sample data (replace with real API data)
  const accountData = {
    username: 'johndoe123',
    accountCreated: '10/08/2023',
    connections: [
      { id: 1, type: 'Broadband', status: 'Active', ipAddress: '192.168.1.1', icon: <WifiIcon /> },
      { id: 2, type: 'Landline', status: 'Active', phoneNumber: '0901234567', icon: <CableIcon /> }
    ]
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Account and Connection
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account settings and active connections
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Account Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            Account Information
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Box sx={{ width: '50%', display: 'flex' }}>
              <Card sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    Username
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    {accountData.username}
                  </Typography>
                </Box>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/profile/change-password"
                >
                  Change Password
                </Button>
              </Card>
            </Box>
            <Box sx={{ width: '50%', display: 'flex' }}>
              <Card sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Typography variant="subtitle1" color="text.secondary">
                  Account Created
                </Typography>
                <Typography variant="h6">
                  {accountData.accountCreated}
                </Typography>
              </Card>
            </Box>
          </Box>
        </Box>

        {/* Active Connections */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <SettingsIcon sx={{ mr: 1 }} />
            Active Connections
          </Typography>
          <Grid container spacing={3}>
            {accountData.connections.map(connection => (
              <Grid xs={12} sm={6} key={connection.id}> {/* Bỏ prop item */}
                <Card sx={{ p: 2, height: '100%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                      {connection.icon}
                    </ListItemIcon>
                    <Typography variant="h6" component="h2">
                      {connection.type}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Status: {connection.status}
                  </Typography>
                  {connection.ipAddress && (
                    <Typography variant="body2" color="text.secondary">
                      IP Address: {connection.ipAddress}
                    </Typography>
                  )}
                  {connection.phoneNumber && (
                    <Typography variant="body2" color="text.secondary">
                      Phone Number: {connection.phoneNumber}
                    </Typography>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Support Section */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Need help with your connections?
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/support"
          >
            Contact Support
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default AccountAndConnection