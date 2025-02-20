import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Link } from 'react-router-dom'
import WifiIcon from '@mui/icons-material/Wifi'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid'
import DialpadIcon from '@mui/icons-material/Dialpad'
import ListItemIcon from '@mui/material/ListItemIcon' // Import ListItemIcon

const RegisteredPlans = () => {
  // Sample data (replace with real API data)
  const [plans, setPlans] = useState([
    { id: 1, name: 'Broadband 64 Kbps', connectionType: 'Broadband', registeredDate: '20/08/2023', status: 'Active', icon: <WifiIcon />, slug: 'broadband-64-kbps' },
    { id: 2, name: 'Landline Local - Monthly', connectionType: 'Landline', registeredDate: '25/08/2023', status: 'Active', icon: <PhoneAndroidIcon />, slug: 'broadband-64-kbps' },
    { id: 3, name: 'Dial-Up 30 Hours', connectionType: 'Dial-Up', registeredDate: '01/09/2023', status: 'Paused', icon: <DialpadIcon />, slug: 'broadband-64-kbps' }
  ])

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Registered Plans
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your active and paused service plans
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Plans List */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {plans.map(plan => (
            <Box key={plan.id} sx={{ width: { xs: '100%', sm: '50%', md: '30%' } }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ListItemIcon sx={{ minWidth: 'auto', mr: 1 }}>
                      {plan.icon}
                    </ListItemIcon>
                    <Typography variant="h6" component="h2">
                      {plan.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Connection Type: {plan.connectionType}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Registered Date: {plan.registeredDate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Status: {plan.status}
                  </Typography>
                </CardContent>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    component={Link}
                    to={`/profile/registered-plans/${plan.slug}`}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        {/* Call to Action */}
        {/* <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Need a new plan?
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/service"
          >
            Browse Services
          </Button>
        </Box> */}
      </Container>
      <Footer />
    </Box>
  )
}

export default RegisteredPlans
