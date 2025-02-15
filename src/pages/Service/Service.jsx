import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Icon,
  Box
} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import DialpadIcon from '@mui/icons-material/Dialpad'
import PhoneIcon from '@mui/icons-material/Phone'
import { Link as RouterLink } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import { useParams } from 'react-router-dom'
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
  variant: 'contained'
}

const registerButtonStyle = {
  size: 'small',
  color: 'primary'
}

const Service = () => {
  const { slug } = useParams() // Lấy slug từ URL params
  const allServicePlans = [
    {
      id: 1,
      title: 'Dial-Up 30 Hours',
      connectionType: 'Dial-Up',
      description: 'Cost-effective, suitable for light usage needs.',
      price: '$130',
      billingCycle: '3 months',
      icon: <DialpadIcon />,
      type: 'dial-up',
      slug: 'dial-up-30-hours'
    },
    {
      id: 2,
      title: 'Broadband 64 Kbps',
      connectionType: 'Broadband',
      description: 'Stable speed, smooth web browsing and video streaming.',
      price: '$350',
      billingCycle: 'month',
      icon: <WifiIcon />,
      type: 'broadband',
      slug: 'broadband-64-kbps'
    },
    {
      id: 3,
      title: 'Landline Local - Monthly',
      connectionType: 'Landline',
      description: 'Unlimited local calls, maximum savings.',
      price: '$35',
      billingCycle: 'month',
      icon: <PhoneIcon />,
      type: 'landline',
      slug: 'landline-local-monthly'
    },
    {
      id: 4,
      title: 'Broadband Unlimited 128 Kbps',
      connectionType: 'Broadband',
      description: 'High speed, unlimited data, fast downloads.',
      price: '$550',
      billingCycle: 'month',
      icon: <WifiIcon />,
      type: 'broadband',
      slug: 'broadband-unlimited-128-kbps'
    },
    {
      id: 5,
      title: 'Premium Dial-Up 60 Hours',
      connectionType: 'Dial-Up',
      description: 'Large capacity Dial-Up package with longer usage time.',
      price: '$225',
      billingCycle: '6 months',
      icon: <DialpadIcon />,
      type: 'dial-up',
      slug: 'premium-dial-up-60-hours'
    },
    {
      id: 6,
      title: 'Economy Landline STD',
      connectionType: 'Landline',
      description: 'Discounted inter-state call rates, easy to stay connected.',
      price: '$125',
      billingCycle: 'year',
      icon: <PhoneIcon />,
      type: 'landline',
      slug: 'economy-landline-std'
    },
    {
      id: 7,
      title: 'Super Speed Broadband 256 Kbps',
      connectionType: 'Broadband',
      description: 'Extremely fast speed, smooth experience for all applications.',
      price: '$750',
      billingCycle: 'month',
      icon: <WifiIcon />,
      type: 'broadband',
      slug: 'super-speed-broadband-256-kbps'
    },
    {
      id: 8,
      title: 'Family Combo Package (Broadband + Landline)',
      connectionType: 'Combo',
      description: 'Save more when using both Internet and Landline services.',
      price: '$420',
      billingCycle: 'quarter',
      icon: <Icon> <WifiIcon /> + <PhoneIcon /></Icon>,
      type: 'combo',
      slug: 'family-combo-package-broadband-landline'
    }
  ]

  const filteredServicePlans = slug
    ? allServicePlans.filter(plan => plan.type === slug)
    : allServicePlans

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Services of Nexus
        </Typography>
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center'
        }}>
          {filteredServicePlans.map((plan) => ( // Sử dụng filteredServicePlans để map
            <Box key={plan.id} sx={{
              width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' },
              maxWidth: 400
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
                  <Button
                    sx={viewDetailsButtonStyle}
                    component={RouterLink}
                    to={`/service/${plan.slug}/detail`}
                  >
                    View Details
                  </Button>
                  <Button sx={registerButtonStyle}
                    component={RouterLink}
                    to='/subscribe/broadband-128-kbps'
                  >
                    Subscribe
                  </Button>
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
