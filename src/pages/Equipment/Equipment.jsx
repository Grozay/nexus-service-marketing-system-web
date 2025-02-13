import React, { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Pagination from '@mui/material/Pagination'
import modemImage from '~/assets/equipment1.png'
import routerImage from '~/assets/equipment2.png'
import phoneImage from '~/assets/equipment3.png'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
const EquipmentPage = () => {
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const baseEquipmentData = [
    {
      id: 1,
      name: 'Modem NEXUS X1000',
      description: 'High-speed ADSL2+ modem, stable, suitable for home and small office use.',
      image: modemImage,
      price: '$89.99',
      detailsLink: '/equipment/modem-x1000'
    },
    {
      id: 2,
      name: 'Router Wi-Fi NEXUS R2500',
      description: 'AC1200 Wi-Fi router, dual-band, wide coverage, high security.',
      image: routerImage,
      price: '$149.99',
      detailsLink: '/equipment/router-r2500'
    },
    {
      id: 3,
      name: 'NEXUS Phone 300 Landline',
      description: 'Landline phone with numeric keypad, LCD display, clear sound quality, durable.',
      image: phoneImage,
      price: '$49.50',
      detailsLink: '/equipment/phone-300'
    },
    {
      id: 4,
      name: 'Modem NEXUS Pro Max',
      description: 'VDSL2/ADSL2+ modem, super fast speed, supports IPTV, ideal for gamers and 4K movie watching.',
      image: modemImage,
      price: '$129.99',
      detailsLink: '/equipment/modem-pro-max'
    },
    {
      id: 5,
      name: 'Router Wi-Fi Mesh NEXUS Mesh 5000',
      description: 'Wi-Fi Mesh system, whole-home coverage, no dead zones, easy to expand.',
      image: routerImage,
      price: '$299.00',
      detailsLink: '/equipment/router-mesh-5000'
    },
    {
      id: 6,
      name: 'NEXUS VoIP 500 IP Phone',
      description: 'IP phone with color display, supports multiple VoIP features, suitable for businesses.',
      image: phoneImage,
      price: '$99.00',
      detailsLink: '/equipment/phone-voip-500'
    }
  ]

  const equipmentData = Array.from({ length: 14 }).map((_, index) => ({
    ...baseEquipmentData[index % baseEquipmentData.length],
    id: index + 1,
    name: `${baseEquipmentData[index % baseEquipmentData.length].name} #${index + 1}`
  }))

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = equipmentData.slice(startIndex, endIndex)

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  return (
    <Box>
      <AppBar/>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Explore NEXUS Equipment
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Choose genuine NEXUS equipment to experience the best internet and telecommunications services.
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}>
          {paginatedData.map((equipment) => (
            <Box key={equipment.id} sx={{
              width: { xs: '100%', sm: '45%', md: '30%', lg: '23%' },
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'box-shadow 0.3s ease',
                '&:hover': {
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)'
                }
              }}>
                <Box>
                  <CardMedia
                    component="img"
                    height="200"
                    image={equipment.image}
                    alt={equipment.name}
                    sx={{ 
                      objectFit: 'contain', 
                      p: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.1)'
                      }
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ minHeight: '64px' }}>
                      {equipment.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: '72px' }}>
                      {equipment.description}
                    </Typography>
                    {equipment.price && (
                      <Typography variant="subtitle1" sx={{ mt: 1 }}>
                        Price: <strong>{equipment.price}</strong>
                      </Typography>
                    )}
                  </CardContent>
                </Box>
                <CardActions sx={{ p: 2 }}>
                  <Button
                    size="small"
                    variant="contained"
                    href={equipment.detailsLink}
                    component="a"
                    fullWidth
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: '-100%',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                        transition: 'left 0.5s ease'
                      },
                      '&:hover::before': {
                        left: '100%'
                      }
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(equipmentData.length / itemsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>

        <Box mt={6} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Have questions about our equipment? <Link href="/contact">Contact us</Link> for consultation.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default EquipmentPage