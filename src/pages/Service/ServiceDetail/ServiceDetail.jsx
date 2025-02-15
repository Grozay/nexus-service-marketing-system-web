import React from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Link } from 'react-router-dom'
const ServiceDetailPage = () => {
  const serviceDetail = {
    id: 1,
    name: 'Broadband 128 Kbps',
    price: '$350/month',
    speed: '128 Kbps',
    description: 'High-speed internet for home and business users. Enjoy seamless streaming, fast downloads, and reliable connectivity for all your online activities.',
    similarPlans: [
      { id: 2, name: 'Broadband 64 Kbps', price: '$250/month', speed: '64 Kbps' },
      { id: 3, name: 'Broadband 256 Kbps', price: '$450/month', speed: '256 Kbps' }
    ]
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
          <Link to={`/subscribe/${serviceDetail.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button variant="contained" color="primary" sx={{ mt: 4, display: 'block', margin: '0 auto' }}>
              Subscribe Now
            </Button>
          </Link>
        </Card>

        {/* Similar Plans Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
            Similar Plans
          </Typography>
          <Grid container spacing={3}>
            {serviceDetail.similarPlans.map(plan => (
              <Grid xs={12} sm={6} md={4} key={plan.id}>
                <Card sx={{ p: 3, borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardContent sx={{ p: 0, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {plan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Price: <Typography component="span" fontWeight="bold" color="secondary">{plan.price}</Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Speed: {plan.speed}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 0 }}>
                    <Button variant="outlined" fullWidth size="small">
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default ServiceDetailPage