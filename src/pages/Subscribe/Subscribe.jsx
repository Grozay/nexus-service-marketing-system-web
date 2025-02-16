import { useState } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { useParams } from 'react-router-dom'
const steps = ['Personal Information', 'Confirm Subscription', 'Payment']

const servicePlans = [
  {
    id: 1,
    name: 'Broadband 64 Kbps',
    securityDeposit: '$350',
    slug: 'broadband-128-kbps',
    description: 'High-speed internet for home and business users. Enjoy seamless streaming, fast downloads, and reliable connectivity for all your online activities.'
  }
]

const SubscribePage = () => {
  const { slug } = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    plan: slug,
    deposit: 0
  })
  const [formErrors, setFormErrors] = useState({})
  const selectedPlan = servicePlans.find(plan => plan?.slug === slug)

  const handleNext = () => {
    let errors = {}
    if (activeStep === 0) {
      if (!formData.fullName) errors.fullName = 'Please enter your Full Name'
      if (!formData.phone) errors.phone = 'Please enter your Phone Number'
      if (!formData.email) errors.email = 'Please enter your Email'
      if (!formData.address) errors.address = 'Please enter your Address'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    } else {
      setFormErrors({})
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setFormErrors({})
  }

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      plan: selectedPlan ? selectedPlan.slug : formData.plan
    }
    console.log('Form submitted:', finalData)
    alert('Subscription successful! Your information has been submitted.')
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handlePlanChange = (event) => {
    const selectedPlanSlug = event.target.value
    const selectedPlan = servicePlans.find(plan => plan.slug === selectedPlanSlug)
    setFormData({
      ...formData,
      plan: selectedPlan,
      deposit: selectedPlan ? selectedPlan.securityDeposit : 0
    })
  }


  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return (
        <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                  Personal Information
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                id="phone"
                name="phone"
                label="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!formErrors.phone}
                helperText={formErrors.phone}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                id="email"
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
              />
              <TextField
                fullWidth
                margin="normal"
                id="address"
                name="address"
                label="Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                error={!!formErrors.address}
                helperText={formErrors.address}
                required
              />
            </CardContent>
          </Card>
          <Card sx={{ p: 3, display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                  Selected Service Plan
              </Typography>
              <FormControl fullWidth margin="normal" error={!!formErrors.plan} required>
                <TextField
                  id="plan"
                  name="plan"
                  value={selectedPlan.name}
                  disabled
                  onChange={handlePlanChange}
                />
                <FormHelperText>{formErrors.plan}</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>
        </Box>
      )
    case 1:
      return (
        <Card sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
              Confirm Subscription Information
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">Personal Information:</Typography>
          <Typography variant="body1">Full Name: {formData.fullName}</Typography>
          <Typography variant="body1">Phone Number: {formData.phone}</Typography>
          <Typography variant="body1">Email: {formData.email}</Typography>
          <Typography variant="body1">Address: {formData.address}</Typography>

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Selected Service Plan:</Typography>
          {selectedPlan && (
            <>
              <Typography variant="body1">Plan Name: {selectedPlan.name}</Typography>
              <Typography variant="body1">Security Deposit: {selectedPlan.securityDeposit}</Typography>
            </>
          )}
          <Typography variant="body1" sx={{ mt: 2 }}>
              Please double-check your information before confirming your subscription.
          </Typography>
        </Card>
      )
    case 2:
      // eslint-disable-next-line no-case-declarations
      const selectedPlanForPayment = selectedPlan || servicePlans.find(plan => plan.slug === formData.plan)
      console.log('🚀 ~ getStepContent ~ selectedPlanForPayment:', selectedPlanForPayment)
      return (
        <Card sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
              Security Deposit Payment
          </Typography>
          {selectedPlanForPayment && (
            <>
              <Typography variant="body1" gutterBottom>
                  Service Plan: <Typography component="span" fontWeight="bold">{selectedPlanForPayment.name}</Typography> {/* Label in English */}
              </Typography>
              <Typography variant="body1" gutterBottom>
                  Security Deposit Amount: <Typography component="span" fontWeight="bold" color="secondary">{selectedPlanForPayment.securityDeposit}</Typography>
              </Typography>
            </>
          )}

          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              Select Payment Method: (Placeholder - Payment Gateway Integration needed here)
          </Typography>

          {/* Placeholder for Payment Gateway integration - In real app, add payment form here */}
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="success" size="large" disabled>
                Pay (Not Available) Chưa có làm
            </Button>
            <Typography variant="caption" display="block" mt={1} color="text.secondary">
              {/* Payment feature is under development. */}
            </Typography>
          </Box>
        </Card>
      )
    default:
      return 'Unknown step'
    }
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 7 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" fontWeight="bold">
          NEXUS Service Subscription
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3, mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 3 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="contained"
            color="grey"
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Complete Subscription
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default SubscribePage