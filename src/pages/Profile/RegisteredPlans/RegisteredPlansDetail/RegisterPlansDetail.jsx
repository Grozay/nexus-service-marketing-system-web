import React from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'

const RegisterPlansDetail = () => {
  const serviceDetail = {
    id: 1,
    name: 'Broadband 64 Kbps',
    price: '$350/month',
    speed: '128 Kbps',
    slug: 'broadband-64-kbps',
    description: 'High-speed internet for home and business users. Enjoy seamless streaming, fast downloads, and reliable connectivity for all your online activities.',
    status: 'Active'
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 7 }}>
        {/* Page Title */}
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          Broadband 128 Kbps Detail
        </Typography>

        {/* Main Info Section */}
        <Box sx={{
          mb: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Service Plan
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {serviceDetail.name}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Price
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  {serviceDetail.price}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Speed
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="info">
                  {serviceDetail.speed}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Status
                </Typography>
                <Typography variant="h5" fontWeight="bold" color={serviceDetail.status === 'Active' ? 'success' : 'error'}>
                  {serviceDetail.status}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Description Section */}
        <Card sx={{ mb: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
            Service Plan Details
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {serviceDetail.description}
          </Typography>
        </Card>
      </Container>
      <Footer />
    </Box>
  )
}

export default RegisterPlansDetail