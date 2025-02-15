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
const steps = ['Personal Information', 'Confirm Subscription', 'Payment'] // Step labels in English

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
    plan: '', // Store plan slug
    deposit: 0 // You might calculate this based on the selected plan
  })
  const [formErrors, setFormErrors] = useState({})
  const selectedPlan = servicePlans.find(plan => plan?.slug === slug)
  console.log(selectedPlan)

  const handleNext = () => {
    // Basic validation before moving to the next step
    let errors = {}
    if (activeStep === 0) {
      if (!formData.fullName) errors.fullName = 'Please enter your Full Name' // Error message in English
      if (!formData.phone) errors.phone = 'Please enter your Phone Number' // Error message in English
      if (!formData.email) errors.email = 'Please enter your Email' // Error message in English
      if (!formData.address) errors.address = 'Please enter your Address' // Error message in English
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return // Stop proceeding if there are errors
    } else {
      setFormErrors({}) // Clear errors if validation passes
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setFormErrors({}) // Clear errors when going back
  }

  const handleSubmit = () => {
    // Handle final submission - in real app, send data to backend
    console.log('Form submitted:', formData)
    alert('Subscription successful! Your information has been submitted.') // Alert message in English
    // In a real application, you would:
    // 1. Send formData to your backend API
    // 2. Handle success/error responses
    // 3. Redirect to a confirmation page or show a success message
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
      plan: selectedPlanSlug,
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
                label="Full Name" // Label in English
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
                label="Phone Number" // Label in English
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
                label="Email" // Label in English
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
                label="Address" // Label in English
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
              Confirm Subscription Information {/* Step title in English */}
          </Typography>
          <Typography variant="subtitle1" fontWeight="bold">Personal Information:</Typography> {/* Subtitle in English */}
          <Typography variant="body1">Full Name: {formData.fullName}</Typography> {/* Label in English */}
          <Typography variant="body1">Phone Number: {formData.phone}</Typography> {/* Label in English */}
          <Typography variant="body1">Email: {formData.email}</Typography> {/* Label in English */}
          <Typography variant="body1">Address: {formData.address}</Typography> {/* Label in English */}

          <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>Selected Service Plan:</Typography> {/* Subtitle in English */}
          {selectedPlan && (
            <>
              <Typography variant="body1">Plan Name: {selectedPlan.name}</Typography> {/* Label in English */}
              <Typography variant="body1">Security Deposit: {selectedPlan.securityDeposit}</Typography> {/* Label in English */}
            </>
          )}
          <Typography variant="body1" sx={{ mt: 2 }}>
              Please double-check your information before confirming your subscription. {/* Text in English */}
          </Typography>
        </Card>
      )
    case 2:
      // eslint-disable-next-line no-case-declarations
      const selectedPlanForPayment = selectedPlan.find(plan => plan.slug === formData.plan)
      return (
        <Card sx={{ p: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
              Security Deposit Payment {/* Step title in English */}
          </Typography>
          {selectedPlanForPayment && (
            <>
              <Typography variant="body1" gutterBottom>
                  Service Plan: <Typography component="span" fontWeight="bold">{selectedPlanForPayment.name}</Typography> {/* Label in English */}
              </Typography>
              <Typography variant="body1" gutterBottom>
                  Security Deposit Amount: <Typography component="span" fontWeight="bold" color="secondary">{selectedPlanForPayment.securityDeposit}</Typography> {/* Label in English */}
              </Typography>
            </>
          )}

          <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
              Select Payment Method: (Placeholder - Payment Gateway Integration needed here) {/* Text in English */}
          </Typography>

          {/* Placeholder for Payment Gateway integration - In real app, add payment form here */}
          <Box sx={{ textAlign: 'center' }}>
            <Button variant="contained" color="success" size="large" disabled>
                Pay (Not Available) {/* Button label in English */}
            </Button>
            <Typography variant="caption" display="block" mt={1} color="text.secondary">
                Payment feature is under development. {/* Text in English */}
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
          NEXUS Service Subscription {/* Page title in English */}
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
            Back {/* Button label in English */}
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Complete Subscription {/* Button label in English */}
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