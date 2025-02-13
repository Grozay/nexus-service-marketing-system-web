import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Container,
  Icon,
  Box // Import Box để sử dụng layout linh hoạt hơn
} from '@mui/material'
import WifiIcon from '@mui/icons-material/Wifi'
import DialpadIcon from '@mui/icons-material/Dialpad'
import PhoneIcon from '@mui/icons-material/Phone'
import { Link } from '@mui/material' // Import Link từ Material UI
import AppBar from '~/components/AppBar/AppBar'

// **Định nghĩa các style chung để đảm bảo tính nhất quán**
const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}

const cardContentStyle = {
  paddingBottom: '16px' // Tăng paddingBottom để tạo khoảng cách với CardActions
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
  display: 'flex', // Đảm bảo các button nằm trên cùng một hàng
  justifyContent: 'space-between', // Căn đều button và box giá
  alignItems: 'center' // Căn chỉnh button và box giá theo chiều dọc
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
  const servicePlans = [
    {
      id: 1,
      title: 'Dial-Up 30 Hours',
      connectionType: 'Dial-Up',
      description: 'Cost-effective, suitable for light usage needs.',
      price: '$130',
      billingCycle: '3 months',
      icon: <DialpadIcon />
    },
    {
      id: 2,
      title: 'Broadband 64 Kbps',
      connectionType: 'Broadband',
      description: 'Stable speed, smooth web browsing and video streaming.',
      price: '$350',
      billingCycle: 'month',
      icon: <WifiIcon />
    },
    {
      id: 3,
      title: 'Landline Local - Monthly',
      connectionType: 'Landline',
      description: 'Unlimited local calls, maximum savings.',
      price: '$35',
      billingCycle: 'month',
      icon: <PhoneIcon />
    },
    {
      id: 4,
      title: 'Broadband Unlimited 128 Kbps',
      connectionType: 'Broadband',
      description: 'High speed, unlimited data, fast downloads.',
      price: '$550',
      billingCycle: 'month',
      icon: <WifiIcon />
    },
    {
      id: 5,
      title: 'Premium Dial-Up 60 Hours',
      connectionType: 'Dial-Up',
      description: 'Large capacity Dial-Up package with longer usage time.',
      price: '$225',
      billingCycle: '6 months',
      icon: <DialpadIcon />
    },
    {
      id: 6,
      title: 'Economy Landline STD',
      connectionType: 'Landline',
      description: 'Discounted inter-state call rates, easy to stay connected.',
      price: '$125',
      billingCycle: 'year',
      icon: <PhoneIcon />
    },
    {
      id: 7,
      title: 'Super Speed Broadband 256 Kbps',
      connectionType: 'Broadband',
      description: 'Extremely fast speed, smooth experience for all applications.',
      price: '$750',
      billingCycle: 'month',
      icon: <WifiIcon />
    },
    {
      id: 8,
      title: 'Family Combo Package (Broadband + Landline)',
      connectionType: 'Combo',
      description: 'Save more when using both Internet and Landline services.',
      price: '$420',
      billingCycle: 'quarter',
      icon: <Icon> <WifiIcon /> + <PhoneIcon /></Icon>
    }
  ]

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
          {servicePlans.map((plan) => (
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
                  <Button sx={viewDetailsButtonStyle}>
                    View Details
                  </Button>
                  <Button sx={registerButtonStyle}>
                    Register
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Do you have any questions or need advice? <Link href="/contact">Contact us</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Service
