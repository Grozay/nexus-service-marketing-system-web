import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import CardActions from '@mui/material/CardActions'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlansDetailsAPI, selectCurrentPlan } from '~/redux/plans/planSlice'

const ServiceDetail = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const currentPlan = useSelector(selectCurrentPlan)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchPlansDetailsAPI(slug)).then(() => {
      setLoading(false)
    }).catch((error) => {
      error.response.data.message
      // console.error('Error fetching plan details:', error)
      setLoading(false)
    })
  }, [dispatch, slug])

  if (loading) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading service details...</Typography>
        </Container>
      </Box>
    )
  }

  if (!currentPlan) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Service not found</Typography>
          <Link to="/service">
            <Button>Back to Services</Button>
          </Link>
        </Container>
      </Box>
    )
  }

  const similarPlans = [
    { id: 1, name: 'Broadband 60 Hours Plan', price: '$315', speed: 'Up to 128 Kbps', slug: 'broadband-60-hours-plan' },
    { id: 2, name: 'Broadband Unlimited 64Kbps Monthly', price: '$225', speed: '64 Kbps', slug: 'broadband-unlimited-64kbps-monthly' }
  ]

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 7 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" sx={{ mb: 4 }}>
          {currentPlan.planName} Detail
        </Typography>

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
                  {currentPlan.planName}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Price
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  ${currentPlan.planPrice}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, textAlign: 'center', borderRadius: 2 }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Speed
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="info">
                  {currentPlan.planDescription.includes('Kbps') ? currentPlan.planDescription.match(/\d+Kbps/)[0] : 'N/A'}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Card sx={{ mb: 5, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
            Service Plan Details
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Connection Type: {currentPlan.plan_Category.categoryName}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Validity: {currentPlan.planValidity}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Deposit: ${currentPlan.plan_Category.categoryDeposit}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {currentPlan.planDescription}
          </Typography>
          <Link to={`/register/${currentPlan.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button variant="contained" color="primary" sx={{ mt: 4, display: 'block', marginTop: '10px' }}>
              Register Now
            </Button>
          </Link>
        </Card>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
            Similar Plans
          </Typography>
          <Grid container spacing={3}>
            {similarPlans.map(plan => (
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
                    <Link to={`/service/${plan.slug}`} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                      <Button variant="outlined" fullWidth size="small">
                        View Details
                      </Button>
                    </Link>
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

export default ServiceDetail