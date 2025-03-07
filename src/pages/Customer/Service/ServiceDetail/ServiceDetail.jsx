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
import { getPlanByCategoryIdAPI } from '~/apis'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import backgroundImage from '~/assets/team-member-1.png'

const ServiceDetail = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const currentPlan = useSelector(selectCurrentPlan)
  const planCategoryId = currentPlan.categoryId
  const [loading, setLoading] = useState(true)
  const [similarPlans, setSimilarPlans] = useState([])

  useEffect(() => {
    dispatch(fetchPlansDetailsAPI(slug)).then(() => {
      setLoading(false)
    }).catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error fetching plan details:', error)
      setLoading(false)
    })
  }, [dispatch, slug])

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getPlanByCategoryIdAPI(planCategoryId)
          .then(res => {
            setSimilarPlans(res.filter(plan => plan.slug !== slug)) // Loại bỏ plan hiện tại khỏi danh sách
            setLoading(false)
          })
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        setLoading(false)
      }
    }
    fetchData()
  }, [planCategoryId, slug])

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading service details...</Typography>
        </Container>
      </Box>
    )
  }

  if (!currentPlan) {
    return (
      <Box sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Service not found</Typography>
          <Link to="/service">
            <Button variant="contained" color="primary">Back to Services</Button>
          </Link>
        </Container>
      </Box>
    )
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: (theme) => theme.palette.background.default }}>
      <AppBar />
      <Container maxWidth="lg">
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
              {currentPlan.planName} Details
            </Typography>
            <Typography variant="subtitle1">
              {currentPlan.planDescription}
            </Typography>
          </Box>
        </Box>
      </Container>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={3}>
            <Grid xs={12} md={4}>
              <Card sx={{
                height: '100%',
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                backgroundColor: (theme) => theme.palette.background.paper,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                }
              }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Service Plan
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="primary">
                  {currentPlan.planName}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{
                height: '100%',
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                backgroundColor: (theme) => theme.palette.background.paper,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                }
              }}>
                <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
                  Price
                </Typography>
                <Typography variant="h5" fontWeight="bold" color="secondary">
                  ${currentPlan.planPrice}
                </Typography>
              </Card>
            </Grid>

            <Grid xs={12} md={4}>
              <Card sx={{
                height: '100%',
                p: 3,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                backgroundColor: (theme) => theme.palette.background.paper,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                }
              }}>
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

        <Card sx={{
          mb: 6,
          p: 4,
          borderRadius: 2,
          boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
          backgroundColor: (theme) => theme.palette.background.paper,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
          }
        }}>
          <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Description: {currentPlan.planDescription}
          </Typography>
          <Link to={`/register/${currentPlan.slug}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                mt: 4,
                display: 'block',
                mx: 'auto',
                px: 5,
                py: 1.5,
                borderRadius: 25,
                fontWeight: 'bold',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
                }
              }}
            >
              Register Now
            </Button>
          </Link>
        </Card>

        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 4, color: '#1a237e' }}>
            Similar Plans
          </Typography>
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              960: { slidesPerView: 3 }
            }}
          >
            {similarPlans.map(plan => (
              <SwiperSlide key={plan.id}>
                <Card sx={{
                  p: 3,
                  borderRadius: 2,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                  backgroundColor: (theme) => theme.palette.background.paper,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.2)'
                  }
                }}>
                  <CardContent sx={{ p: 0, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ color: '#1976d2' }}>
                      {plan.planName}
                    </Typography>
                    <Typography component="span" fontWeight="bold" color="secondary">
                      ${plan.planPrice}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Validity: {plan.planValidity}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.planDescription}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 0 }}>
                    <Button
                      component='a'
                      href={`/service/${plan.slug}/details`}
                      variant="outlined"
                      fullWidth
                      size="small"
                      sx={{
                        borderRadius: 20,
                        '&:hover': {
                          backgroundColor: '#1976d2',
                          color: 'white'
                        }
                      }}
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default ServiceDetail