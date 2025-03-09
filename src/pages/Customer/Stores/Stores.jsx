import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, List, ListItem, ListItemText, Divider, Button } from '@mui/material'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import backgroundImage from '~/assets/team-member-1.png'
import { getAllRetailShopsAPI } from '~/apis'
import { toast } from 'react-toastify'

// Fix Leaflet default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

// Component để cập nhật vị trí bản đồ
const MapUpdater = ({ center }) => {
  const map = useMap()
  React.useEffect(() => {
    map.setView(center, 15)
  }, [center, map])
  return null
}

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null)
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true)
        const response = await getAllRetailShopsAPI()
        if (response && Array.isArray(response) && response.length > 0) {
          setStores(response)
          setSelectedStore(response[0]) // Chọn cửa hàng đầu tiên làm mặc định
        } else {
          toast.error('No store data available.')
        }
      } catch (error) {
        toast.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchStores()
  }, [])

  // Vị trí mặc định nếu không có dữ liệu
  const fallbackCenter = [10.7769, 106.7009] // Tọa độ mặc định (TP.HCM)
  const defaultCenter = stores.length > 0
    ? [parseFloat(stores[0].storeLatitude), parseFloat(stores[0].storeLongitude)]
    : fallbackCenter
  const selectedCenter = selectedStore
    ? [parseFloat(selectedStore.storeLatitude), parseFloat(selectedStore.storeLongitude)]
    : defaultCenter

  const mapStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '8px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.12)'
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ position: 'relative', textAlign: 'center', color: 'white', mb: 4 }}>
          <Box
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 300,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }
            }}
          />
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Store Locations
            </Typography>
            <Typography variant="subtitle1">
              NEXUS Telecom - Connecting people, building the digital future
            </Typography>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {loading ? (
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Loading store locations...
          </Typography>
        ) : stores.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            No store locations available at the moment.
          </Typography>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ width: { xs: '100%', md: '40%' }, maxHeight: '500px', overflowY: 'auto' }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                - Store Locations -
              </Typography>
              <List>
                {stores.map((store, index) => (
                  <React.Fragment key={store.storeAddress}>
                    <ListItem
                      button
                      onClick={() => setSelectedStore(store)}
                      sx={{
                        backgroundColor: selectedStore?.storeAddress === store.storeAddress ? '#e0f7fa' : 'inherit',
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          backgroundColor: '#b2ebf2',
                          transform: 'translateY(-2px)',
                          transition: 'all 0.3s ease'
                        }
                      }}
                    >
                      <ListItemText
                        primary={`${store.storeAddress}, ${store.storeCity}`}
                        secondary={`Open: ${store.storeOpenAt.slice(0, 5)} - ${store.storeCloseAt.slice(0, 5)} | Phone: ${store.storePhone}`}
                        primaryTypographyProps={{ fontWeight: 'bold', color: '#1976d2' }}
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                      />
                    </ListItem>
                    {index < stores.length - 1 && <Divider sx={{ my: 0.5 }} />}
                  </React.Fragment>
                ))}
              </List>
            </Box>

            <Box sx={{ width: { xs: '100%', md: '60%' } }}>
              <MapContainer center={defaultCenter} zoom={15} style={mapStyle}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapUpdater center={selectedCenter} />
                <Marker position={selectedCenter}>
                  <Popup>
                    {selectedStore
                      ? `${selectedStore.storeAddress}, ${selectedStore.storeCity}`
                      : `${stores[0].storeAddress}, ${stores[0].storeCity}`
                    }
                  </Popup>
                </Marker>
              </MapContainer>
              {selectedStore && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a237e' }}>
                    {selectedStore.storeAddress}, {selectedStore.storeCity}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Phone: {selectedStore.storePhone} | Open: {selectedStore.storeOpenAt.slice(0, 5)} - {selectedStore.storeCloseAt.slice(0, 5)}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Container>
      <Box mt={4} mb={4} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          Do you have any questions or need advice?{' '}
        </Typography>
        <Button component="a" href="/contact-us" variant="contained" color="primary" sx={{ my: 2 }}>
          Contact Us
        </Button>
      </Box>
      <Footer />
    </Box>
  )
}

export default Stores