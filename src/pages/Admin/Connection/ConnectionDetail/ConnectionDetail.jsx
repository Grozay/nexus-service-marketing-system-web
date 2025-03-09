import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getConnectionByIdAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import EventIcon from '@mui/icons-material/Event'
import CategoryIcon from '@mui/icons-material/Category'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function ConnectionDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [connection, setConnection] = useState(null)

  useEffect(() => {
    const fetchConnection = async () => {
      try {
        const connectionData = await getConnectionByIdAPI(id)
        setConnection(connectionData)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch connection details')
        navigate('/management/connection/list')
      }
    }
    fetchConnection()
  }, [id, navigate])

  if (!connection) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    )
  }

  const handleViewOrderDetail = () => {
    navigate(`/management/orders/${connection.orderDetails.orderId}`)
  }

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/management/connection/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Connection Details
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={3}>
          {/* Header Section */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {connection.connectionName}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Connection ID: {connection.connectionId}
                </Typography>
                <Chip
                  label={connection.connectionStatus}
                  color={connection.connectionStatus === 'Connected' ? 'success' : 'error'}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
            <Divider sx={{ mb: 4 }} />
          </Grid>

          {/* Main Content */}
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Connection Information
                </Typography>
                <DetailItem icon={<EventIcon />} label="Created At" value={formatDate(connection.connectionCreatedAt)} />
                <DetailItem icon={<PersonIcon />} label="Employee ID" value={connection.employeeId} />
                <DetailItem icon={<CategoryIcon />} label="Description" value={connection.connectionDescription || 'N/A'} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Order Information
                </Typography>
                <DetailItem icon={<EventIcon />} label="Order ID" value={connection.orderDetails.orderId} />
                <DetailItem icon={<CategoryIcon />} label="Order Name" value={connection.orderDetails.orderName} />
                <DetailItem icon={<Typography>$</Typography>} label="Order Amount" value={`${connection.orderDetails.orderAmount} USD`} />
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<VisibilityIcon />}
                  onClick={handleViewOrderDetail}
                  sx={{ mt: 2 }}
                >
                  View Order Detail
                </Button>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Account Information
                </Typography>
                <DetailItem icon={<PersonIcon />} label="Account Name" value={connection.orderDetails.accountDetails.accountName} />
                <DetailItem icon={<EmailIcon />} label="Email" value={connection.orderDetails.accountDetails.accountEmail} />
                <DetailItem icon={<PhoneIcon />} label="Phone" value={connection.orderDetails.accountDetails.accountPhone} />
                <DetailItem icon={<HomeIcon />} label="Address" value={connection.orderDetails.accountDetails.accountAddress} />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2, height: '100%' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Store Information
                </Typography>
                <DetailItem icon={<LocationCityIcon />} label="Store Name" value={connection.orderDetails.storeDetails.storeName} />
                <DetailItem icon={<HomeIcon />} label="Address" value={connection.orderDetails.storeDetails.storeAddress} />
                <DetailItem icon={<PhoneIcon />} label="Phone" value={connection.orderDetails.storeDetails.storePhone} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  )
}

const DetailItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    {icon}
    <Box sx={{ ml: 1 }}>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">{value || 'N/A'}</Typography>
    </Box>
  </Box>
)