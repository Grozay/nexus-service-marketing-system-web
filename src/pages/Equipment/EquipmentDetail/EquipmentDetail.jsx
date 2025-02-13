import React from 'react'
import { Container } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import Link from '@mui/material/Link'
import MuiLink from '@mui/material/Link'
import Icon from '@mui/material/Icon'
import modemDetailImage from '~/assets/equipment1.png'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
const EquipmentDetailPage = () => {
  // Sample equipment data (replace with real data from backend based on ID or slug)
  const equipmentDetail = {
    id: 1,
    name: 'NEXUS X1000 Modem - Details',
    image: modemDetailImage,
    description: `The NEXUS X1000 Modem is the perfect solution for home and small office internet connections. With advanced ADSL2+ technology, this modem provides fast and stable data transfer speeds, enabling seamless web browsing, video streaming, gaming, and online work.

        **Key Features:**

        *   **High Speed:** Supports ADSL2+ standard with download speeds up to 24Mbps and upload speeds up to 1Mbps
        *   **Stable Connection:** Advanced technology ensures uninterrupted internet connection
        *   **Easy Setup:** Intuitive interface for quick configuration and use
        *   **Enhanced Security:** Supports WPA/WPA2 security protocols for safe Wi-Fi
        *   **Energy Efficient:** Eco-friendly, low power consumption design

        **Technical Specifications:**

        *   Connection Standard: ADSL2/ADSL2+
        *   LAN Ports: 4 x RJ45 10/100Mbps
        *   Wi-Fi Standard: 802.11b/g/n
        *   Wi-Fi Frequency: 2.4GHz
        *   Security: WPA/WPA2, Firewall
        *   Power Supply: 12V DC
        *   Dimensions: ...
        *   Weight: ...
        `,
    features: [
      'Download 24Mbps, Upload 1Mbps',
      'Stable ADSL2+ connection',
      'Easy setup with intuitive interface',
      'WPA/WPA2 Wi-Fi security',
      'Energy efficient design'
    ],
    price: '$89.99'
  }

  return (
    <Box>
      <AppBar />
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      {/* Page Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {equipmentDetail.name}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Product Image Section */}
        <Grid xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="auto"
              image={equipmentDetail.image}
              alt={equipmentDetail.name}
            />
          </Card>
        </Grid>

        {/* Product Details Section */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <CardContent>
              <Typography variant="h6" component="h2" gutterBottom>
                Product Description
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                {equipmentDetail.description}
              </Typography>

              <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
                Key Features
              </Typography>
              <List dense>
                {equipmentDetail.features.map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </CardContent>

            <CardActions sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {equipmentDetail.price && (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Icon><LocalOfferIcon color="primary" sx={{ mr: 0.5 }} /></Icon>
                  <Typography variant="h6" component="p" fontWeight="bold">
                    Price: {equipmentDetail.price}
                  </Typography>
                </Box>
              )}

              <Button variant="contained" size="large" startIcon={<AddShoppingCartIcon />} sx={{ mb: 1 }}>
                Subscription
              </Button>
              <Typography variant="body2" color="text.secondary">
                Call our hotline or leave your information for the best support.
              </Typography>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Box mt={6} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Still have questions? <MuiLink href="/contact">Contact us</MuiLink>
        </Typography>
      </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default EquipmentDetailPage