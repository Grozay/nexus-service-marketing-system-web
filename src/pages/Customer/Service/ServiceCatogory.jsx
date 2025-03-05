import { Box, Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import Grid2 from '@mui/material/Grid2'
import Footer from '~/components/Footer/Footer'
import AppBar from '~/components/AppBar/AppBar'
import { Link } from 'react-router-dom'
import dialUpConnection from '~/assets/images/dial-up-connection.jpg'
import broadbandConnection from '~/assets/images/broadband-connection.jpg'
import landlineConnection from '~/assets/images/landline-connection.jpg'

function ServiceCatogory() {
  const services = [
    {
      categoryName: 'Dial-Up Connection',
      slug: 'dial-up-connection',
      description: 'Affordable and reliable internet access for basic browsing and email.',
      color: '#1976d2',
      image: `url(${dialUpConnection})`
    },
    {
      categoryName: 'Broad Band Connection',
      slug: 'broad-band-connection',
      description: 'High-speed internet for streaming, gaming, and heavy usage.',
      color: '#d81b60',
      image: `url(${broadbandConnection})`
    },
    {
      categoryName: 'LandLine Connection',
      slug: 'landline-connection',
      description: 'Crystal-clear voice calls with reliable landline service.',
      color: '#388e3c',
      image: `url(${landlineConnection})`
    }
  ]

  return (
    <Box sx={{ backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 8, mb: 8, py: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          sx={{
            mb: 6,
            fontWeight: 'bold',
            color: '#1a237e',
            letterSpacing: 1
          }}
        >
          Please Select Your Service
        </Typography>

        <Grid2
          container
          spacing={4}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between', // Đảm bảo các card căn đều trên 1 hàng
            gap: 4,
            alignItems: 'stretch' // Đảm bảo các card cùng chiều cao
          }}
        >
          {services.map((service) => (
            <Grid2
              size={{ xs: 12, sm: 4, md: 4 }} // Mỗi card chiếm 4/12 (1/3) trên sm và md
              key={service.slug}
              sx={{
                flexGrow: 0,
                flexShrink: 0,
                width: { xs: '100%', sm: 'calc(33.33% - 32px)' }, // Cố định 1/3 chiều rộng, trừ spacing
                maxWidth: { xs: '100%', sm: '33.33%' },
                display: 'flex'
              }}
            >
              <Card
                sx={{
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  backgroundColor: '#fff',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                  }
                }}
              >
                <Box
                  sx={{
                    height: 220,
                    backgroundImage: service.image,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderBottom: `4px solid ${service.color}`
                  }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 3 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      color: service.color,
                      fontSize: '1.5rem'
                    }}
                  >
                    {service.categoryName}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ fontSize: '1rem', lineHeight: 1.6 }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                  <Link to={`/service/${service.slug}`} style={{ textDecoration: 'none' }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: service.color,
                        color: '#fff',
                        borderRadius: 25,
                        px: 5,
                        py: 1.2,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: `${service.color}dd`,
                          transform: 'scale(1.08)',
                          boxShadow: '0 5px 12px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      Explore
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
      <Footer />
    </Box>
  )
}

export default ServiceCatogory