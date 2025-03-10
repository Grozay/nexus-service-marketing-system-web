import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Divider, Button, Chip, Avatar, Collapse } from '@mui/material'
import Grid from '@mui/material/Grid2'
import { toast } from 'react-toastify'
import { getOrderByAccountIdAPI, getAccountByIdAPI } from '~/apis' // Thêm getAccountByIdAPI
import { formatDate } from '~/utils/formatter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import CakeIcon from '@mui/icons-material/Cake'
import EventIcon from '@mui/icons-material/Event'
import CategoryIcon from '@mui/icons-material/Category'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import VisibilityIcon from '@mui/icons-material/Visibility'

export default function CustomerDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [plans, setPlans] = useState([])
  const [expandedPlan, setExpandedPlan] = useState(null)

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const orderData = await getOrderByAccountIdAPI(id)

        if (orderData) {
          const orders = Array.isArray(orderData) ? orderData : [orderData]
          if (orders.length > 0) {
            setCustomer(orders[0].accountDetails)
            const planList = orders.map((order) => ({
              planId: order.planDetails.planId,
              planName: order.planDetails.planName,
              planDetails: order.planDetails.planDetails,
              planPrice: order.planDetails.planPrice,
              planValidity: order.planDetails.planValidity,
              planDescription: order.planDetails.planDescription,
              planIsActive: order.planDetails.planIsActive
            }))
            setPlans(planList)
          } else {
            throw new Error('No orders found, fetching account details instead')
          }
        } else {
          throw new Error('No orders found, fetching account details instead')
        }
      } catch {
        try {
          const accountData = await getAccountByIdAPI(id)
          if (accountData) {
            setCustomer(accountData) // Dữ liệu từ getAccountByIdAPI
            setPlans([]) // Không có plans vì không có order
          } else {
            throw new Error('No customer data found for this account ID')
          }
        } catch (accountError) {
          toast.error(accountError.message || 'Failed to fetch customer details')
          navigate('/management/customer/list')
        }
      }
    }
    fetchCustomer()
  }, [id, navigate])

  if (!customer) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    )
  }

  const handleExpandPlan = (index) => {
    setExpandedPlan(expandedPlan === index ? null : index)
  }

  const handleViewPlanDetail = (planId) => {
    navigate(`/management/plan/${planId}`)
  }

  return (
    <Box sx={{ p: 4, maxWidth: '1200px', margin: '0 auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/management/customer/list')}
          sx={{ mr: 2 }}
        >
          Back to List
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Customer Details
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <Avatar
            sx={{ width: 100, height: 100, mr: 3 }}
            alt={customer.accountName}
            src="/path-to-avatar.jpg"
          >
            {customer.accountName?.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {customer.accountName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Account ID: {customer.accountId}
            </Typography>
            <Chip
              label={customer.accountIsActive ? 'Active' : 'Inactive'}
              color={customer.accountIsActive ? 'success' : 'error'}
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
            />
          </Box>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Contact Information
              </Typography>
              <DetailItem icon={<EmailIcon />} label="Email" value={customer.accountEmail} />
              <DetailItem icon={<PhoneIcon />} label="Phone" value={customer.accountPhone} />
              <DetailItem icon={<HomeIcon />} label="Address" value={customer.accountAddress} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Personal Information
              </Typography>
              <DetailItem icon={<PersonIcon />} label="Gender" value={customer.accountGender} />
              <DetailItem icon={<CakeIcon />} label="Date of Birth" value={formatDate(customer.accountDOB)} />
              <DetailItem icon={<PersonIcon />} label="Identity" value={customer.accountIdentity || 'N/A'} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Account Information
              </Typography>
              <DetailItem icon={<EventIcon />} label="Join Date" value={formatDate(customer.accountCreatedAt)} />
              <DetailItem icon={<LocationCityIcon />} label="City" value={customer.cityCodeDetails?.cityName || 'N/A'} />
              <DetailItem icon={<CategoryIcon />} label="Category" value={customer.categoryDetails?.categoryName || 'N/A'} />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Subscription Plans
              </Typography>
              {plans.length > 0 ? (
                <Box sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {plans.map((plan, index) => (
                    <Box key={index} sx={{ mb: 2, border: '1px solid #e0e0e0', borderRadius: 2, p: 2 }}>
                      <Box
                        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                        onClick={() => handleExpandPlan(index)}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <CardGiftcardIcon sx={{ mr: 1, color: 'text.secondary' }} />
                          <Typography variant="subtitle1">{plan.planName}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Chip
                            label={plan.planIsActive ? 'Active' : 'Inactive'}
                            color={plan.planIsActive ? 'success' : 'error'}
                            variant="outlined"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          <ExpandMoreIcon />
                        </Box>
                      </Box>
                      <Collapse in={expandedPlan === index}>
                        <Box sx={{ mt: 2 }}>
                          <DetailItem icon={<EventIcon />} label="Details" value={plan.planDetails} />
                          <DetailItem icon={<Typography>$</Typography>} label="Price" value={`${plan.planPrice} USD`} />
                          <DetailItem icon={<EventIcon />} label="Validity" value={plan.planValidity} />
                          <DetailItem icon={<CategoryIcon />} label="Description" value={plan.planDescription} />
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<VisibilityIcon />}
                            onClick={() => handleViewPlanDetail(plan.planId)}
                            sx={{ mt: 2 }}
                          >
                            View Detail
                          </Button>
                        </Box>
                      </Collapse>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary">
                  No plans found for this customer.
                </Typography>
              )}
            </Paper>
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