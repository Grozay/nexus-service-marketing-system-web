import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Container,
  Button
} from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { toast } from 'react-toastify'
import { getPreOrderByEmailAPI } from '~/apis'

export default function SearchRegistration() {
  const location = useLocation()
  const navigate = useNavigate()
  const [preOrderData, setPreOrderData] = useState(null)

  // Lấy search query từ URL
  const searchParams = new URLSearchParams(location.search)
  const searchValue = searchParams.get('search')

  useEffect(() => {
    const fetchPreOrderData = async () => {
      if (!searchValue) {
        toast.error('No registration code provided.')
        return
      }

      try {
        const response = await getPreOrderByEmailAPI(searchValue)
        if (response && !response.error) {
          setPreOrderData(response)
        } else {
          toast.error('No pre-order found with this registration code.')
        }
      } catch (error) {
        toast.error('Error fetching pre-order data: ' + error.message)
      }
    }

    fetchPreOrderData()
  }, [searchValue])

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar />
      <Container maxWidth="sm" sx={{ my: 4, flexGrow: 1 }}>
        <Paper
          sx={{
            borderRadius: 2,
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              bgcolor: '#2980b9',
              p: 2,
              textAlign: 'center',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8
            }}
          >
            <Typography
              variant="h5"
              sx={{ color: 'white', fontSize: { xs: '20px', md: '24px' }, m: 0 }}
            >
              Your Pre-Order Details
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ p: 3 }}>
            {preOrderData ? (
              <>
                <Typography
                  variant="h6"
                  sx={{ fontSize: '18px', fontWeight: 'bold', mb: 2, textAlign: 'center' }}
                >
                  Pre-Order #{preOrderData.preOrderId}
                </Typography>

                <Table
                  sx={{
                    bgcolor: '#f9f9f9',
                    p: 2,
                    borderRadius: 1,
                    mb: 2
                  }}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Name:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderName}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Email:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderEmail}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Phone:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderPhone}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Address:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderAddress}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        City:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderCity}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Plan:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderPlan}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Status:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {preOrderData.preOrderStatus}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={{ fontSize: '16px', py: 1, fontWeight: 'bold' }}>
                        Created At:
                      </TableCell>
                      <TableCell sx={{ fontSize: '16px', py: 1 }}>
                        {new Date(preOrderData.preOrderCreatedAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/services')}
                    sx={{
                      bgcolor: '#2980b9',
                      color: 'white',
                      '&:hover': { bgcolor: '#1f6391' }
                    }}
                  >
                    Explore Our Services
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/contact-us')}
                    sx={{
                      borderColor: '#2980b9',
                      color: '#2980b9',
                      '&:hover': { borderColor: '#1f6391', color: '#1f6391' }
                    }}
                  >
                    Contact Us
                  </Button>
                </Box>
              </>
            ) : (
              <Typography variant="body1" sx={{ fontSize: '16px', textAlign: 'center' }}>
                Loading pre-order details...
              </Typography>
            )}
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  )
}