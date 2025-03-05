import { useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import WifiIcon from '@mui/icons-material/Wifi'
import DialpadIcon from '@mui/icons-material/Dialpad'
import PhoneIcon from '@mui/icons-material/Phone'
import VisibilityIcon from '@mui/icons-material/Visibility'
import Tooltip from '@mui/material/Tooltip'
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import { useParams } from 'react-router-dom'
import { getPlanListAPI } from '~/apis'
import { useDispatch } from 'react-redux'
import { fetchPlansDetailsAPI } from '~/redux/plans/planSlice'
import { toast } from 'react-toastify'
import dialUpConnection from '~/assets/images/dial-up-connection.jpg'
import broadbandConnection from '~/assets/images/broadband-connection.jpg'
import landlineConnection from '~/assets/images/landline-connection.jpg'

const Service = () => {
  const { slug } = useParams()
  const [servicePlans, setServicePlans] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPlanListAPI().then(res => {
          setServicePlans(res)
          setLoading(false)
        }).catch(err => {
          console.error('Error fetching service plans:', err)
          setLoading(false)
        })
      } catch (error) {
        console.error('Error fetching service plans:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const onViewDetails = (slug) => {
    toast.promise(dispatch(fetchPlansDetailsAPI(slug)), {
      pending: 'Loading...'
    }).then(res => {
      if (!res.error) {
        navigate(`/service/${slug}/detail`)
      }
    })
  }

  const onRegister = (slug) => {
    toast.promise(dispatch(fetchPlansDetailsAPI(slug)), {
      pending: 'Loading...'
    }).then(res => {
      if (!res.error) {
        navigate(`/register/${slug}`)
      }
    })
  }

  const filteredServicePlans = slug
    ? servicePlans.filter(plan => plan.plan_Category?.slug === slug)
    : servicePlans

  if (loading) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading service plans...</Typography>
        </Container>
      </Box>
    )
  }

  const NoServiceFound = () => {
    return (
      <Box>
        <Container maxWidth="md" sx={{
          height: '60vh',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2
        }}>
          <Typography variant="h4">404 - No Service Found</Typography>
          <Link to="/service">
            <Button variant="contained" color="primary">
              Back to Services
            </Button>
          </Link>
        </Container>
      </Box>
    )
  }

  const getCategoryColor = (slug) => {
    switch (slug) {
    case 'dial-up-connection':
      return '#1976d2'
    case 'broad-band-connection':
      return '#d81b60'
    case 'landline-connection':
      return '#388e3c'
    default:
      return '#666'
    }
  }

  const getBackgroundImage = (slug) => {
    switch (slug) {
    case 'dial-up-connection':
      return dialUpConnection
    case 'broad-band-connection':
      return broadbandConnection
    case 'landline-connection':
      return landlineConnection
    default:
      return ''
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <AppBar />
      <Box sx={{
        width: '100%',
        height: '400px',
        backgroundImage: `url(${getBackgroundImage(slug)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 'bold',
            color: '#fff',
            letterSpacing: 1,
            textAlign: 'center',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          {slug === 'broad-band-connection' ? 'Register A Broadband Connection'
            : slug === 'dial-up-connection' ? 'Register A Dial-Up Connection'
              : slug === 'landline-connection' ? 'Register A Landline Connection'
                : 'Service Plans'}
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        {filteredServicePlans.length === 0 && slug ? <NoServiceFound /> : (
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
            justifyContent: 'space-between'
          }}>
            {filteredServicePlans.map((plan) => (
              <Box key={plan.planId} sx={{
                width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 24px)' },
                maxWidth: 450
              }}>
                <Card sx={{
                  height: '100%',
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
                }}>
                  <CardContent sx={{
                    flexGrow: 1,
                    textAlign: 'left',
                    py: 3,
                    px: 4
                  }}>
                    <Typography
                      variant="h6"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        color: getCategoryColor(slug),
                        fontSize: '1.6rem'
                      }}
                    >
                      {plan.planName}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'text.secondary',
                        fontSize: '1.1rem'
                      }}
                    >
                      {slug === 'broad-band-connection' ? <WifiIcon sx={{ mr: 1 }} />
                        : slug === 'dial-up-connection' ? <DialpadIcon sx={{ mr: 1 }} />
                          : <PhoneIcon sx={{ mr: 1 }} />}
                      {plan.plan_Category?.categoryName || 'N/A'}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.5,
                        mt: 2
                      }}
                    >
                      {plan.planDescription}
                    </Typography>
                    <Box sx={{
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <Box>
                        <Typography
                          variant="h6"
                          component="p"
                          sx={{
                            fontWeight: 'bold',
                            color: getCategoryColor(slug)
                          }}
                        >
                          ${plan.planPrice}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary' }}
                        >
                          Period: {plan.planValidity}
                        </Typography>
                      </Box>
                      <Tooltip title="View Details" placement="top">
                        <Button
                          onClick={() => onViewDetails(plan.slug)}
                          sx={{
                            minWidth: 0,
                            p: 1,
                            color: getCategoryColor(slug),
                            '&:hover': {
                              backgroundColor: `${getCategoryColor(slug)}22`,
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <VisibilityIcon />
                        </Button>
                      </Tooltip>
                    </Box>
                  </CardContent>
                  <CardActions sx={{
                    padding: '16px 24px',
                    borderTop: '1px solid #eee',
                    backgroundColor: '#fafafa'
                  }}>
                    <Button
                      variant="contained"
                      onClick={() => onRegister(plan.slug)}
                      sx={{
                        width: '100%',
                        backgroundColor: getCategoryColor(slug),
                        color: '#fff',
                        borderRadius: 20,
                        px: 4,
                        py: 1.2,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: `${getCategoryColor(slug)}dd`,
                          transform: 'scale(1.02)',
                          boxShadow: '0 5px 12px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      Register
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </Box>
        )}

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Do you have any questions or need advice?{' '}
            <RouterLink to="/contact" style={{ color: '#1976d2', textDecoration: 'none' }}>
              Contact us
            </RouterLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Service