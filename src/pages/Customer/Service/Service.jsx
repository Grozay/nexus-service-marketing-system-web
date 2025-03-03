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
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import { useParams } from 'react-router-dom'
import { connectionsPlans } from '~/apis/connections-plans'

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const cardContentStyle = {
  paddingBottom: '16px'
}

const cardTitleStyle = {
  variant: 'h5',
  component: 'h3',
  gutterBottom: true
}

const cardSubtitleStyle = {
  variant: 'subtitle1',
  color: 'text.secondary',
  gutterBottom: true,
  display: 'flex',
  alignItems: 'center'
}

const cardDescriptionStyle = {
  variant: 'body2',
  color: 'text.secondary'
}

const cardPriceBoxStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  mr: 2
}

const cardPriceStyle = {
  variant: 'h6',
  component: 'p',
  fontWeight: 'bold'
}

const cardBillingCycleStyle = {
  variant: 'caption',
  color: 'text.secondary'
}

const cardActionsStyle = {
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}

const viewDetailsButtonStyle = {
  size: 'small',
  variant: 'contained',
  textWrap: 'nowrap'
}

const registerButtonStyle = {
  size: 'small',
  color: 'primary'
}

const Service = () => {
  const { slug } = useParams()
  const [servicePlans, setServicePlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transformedPlans = connectionsPlans.flatMap(connection =>
          connection.plans.map(plan => ({
            id: plan.planId,
            title: plan.planName,
            connectionType: connection.connectionName,
            description: plan.planDescription,
            price: `$${plan.planPrice}`,
            billingCycle: plan.planValidity,
            icon: connection.connectionName.includes('Dial-Up') ? <DialpadIcon /> :
              connection.connectionName.includes('Broadband') ? <WifiIcon /> : <PhoneIcon />,
            type: connection.slug,
            slug: plan.slug
          }))
        )

        setServicePlans(transformedPlans)
        setLoading(false)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching service plans:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredServicePlans = slug
    ? servicePlans.filter(plan => plan.type === slug)
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

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Services of Nexus
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}>
          {filteredServicePlans.map((plan) => (
            <Box key={plan.id} sx={{
              width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
              maxWidth: 600
            }}>
              <Card sx={cardStyle}>
                <CardContent sx={cardContentStyle}>
                  <Typography {...cardTitleStyle}>
                    {plan.title}
                  </Typography>
                  <Typography {...cardSubtitleStyle}>
                    {plan.icon} <Box ml={1}>{plan.connectionType}</Box>
                  </Typography>
                  <Typography {...cardDescriptionStyle}>
                    {plan.description}
                  </Typography>
                </CardContent>
                <CardActions sx={cardActionsStyle}>
                  <Box sx={cardPriceBoxStyle}>
                    <Typography {...cardPriceStyle}>
                      {plan.price}
                    </Typography>
                    <Typography {...cardBillingCycleStyle}>
                      /{plan.billingCycle}
                    </Typography>
                  </Box>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <Button
                      sx={viewDetailsButtonStyle}
                      component={RouterLink}
                      to={`/service/${plan.slug}/detail`}
                    >
                      View Details
                    </Button>
                    <Button sx={registerButtonStyle}
                      component={RouterLink}
                      to={`/subscribe/${plan.slug}`}
                    >
                      Register
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Do you have any questions or need advice? <RouterLink href="/contact">Contact us</RouterLink>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Service
