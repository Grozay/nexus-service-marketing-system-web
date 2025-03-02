import React, { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  Modal
} from '@mui/material'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import CancelIcon from '@mui/icons-material/Cancel'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { Order } from '~/apis/mock-data'
import { Link } from 'react-router-dom'

const OrderStatus = () => {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  const getStatusIcon = (status) => {
    switch (status) {
    case 'Completed':
      return <CheckCircleIcon color="success" />
    case 'Pending':
      return <PendingIcon color="warning" />
    case 'Cancelled':
      return <CancelIcon color="error" />
    default:
      return <LocalShippingIcon color="info" />
    }
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
    setSelectedOrder(null)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Order Status
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Track and manage your orders
          </Typography>
        </Box>

        {/* Orders List */}
        <Card sx={{
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          borderRadius: 2
        }}>
          <CardContent>
            <List>
              {Order.map(order => (
                <React.Fragment key={order.orderId}>
                  <ListItem
                    sx={{
                      '&:hover': {
                        backgroundColor: 'action.hover',
                        borderRadius: 1
                      }
                    }}
                  >
                    <ListItemIcon>
                      {getStatusIcon(order.orderStatus)}
                    </ListItemIcon>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" component="div">
                        Order #{order.orderId}
                      </Typography>
                      <Typography variant="body2" color="text.primary" component="div">
                        {order.orderName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" component="div">
                        {order.orderDescription}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Chip
                          label={order.orderStatus}
                          size="small"
                          color={
                            order.orderStatus === 'Completed' ? 'success' :
                              order.orderStatus === 'Pending' ? 'warning' :
                                order.orderStatus === 'Cancelled' ? 'error' : 'info'
                          }
                        />
                      </Box>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ ml: 2 }}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Details
                    </Button>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Order Details Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="order-details-modal"
          aria-describedby="order-details-modal-description"
        >
          <Box sx={modalStyle}>
            {selectedOrder && (
              <>
                <Typography variant="h6" component="h2" gutterBottom>
                  Order Details
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>Order ID:</strong> {selectedOrder.orderId}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>Order Name:</strong> {selectedOrder.orderName}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>Description:</strong> {selectedOrder.orderDescription}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>Amount:</strong> ${selectedOrder.orderAmount}
                </Typography>
                <Typography variant="body1" gutterBottom component="div">
                  <strong>Status:</strong>
                  <Chip
                    label={selectedOrder.orderStatus}
                    size="small"
                    color={
                      selectedOrder.orderStatus === 'Completed' ? 'success' :
                        selectedOrder.orderStatus === 'Pending' ? 'warning' :
                          selectedOrder.orderStatus === 'Cancelled' ? 'error' : 'info'
                    }
                    sx={{ ml: 1 }}
                  />
                </Typography>
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Button
                    variant="contained"
                    onClick={handleCloseModal}
                  >
                    Close
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Modal>

        {/* Call to Action */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} component={'div'}>
            Need help with your order?
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

export default OrderStatus
