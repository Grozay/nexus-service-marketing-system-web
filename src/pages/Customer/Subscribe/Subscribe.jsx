import { useState, useEffect } from 'react'
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
import { connectionsPlans } from '~/apis/connections-plans'

const steps = ['Personal Information', 'Confirm Subscription', 'Payment']

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
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const findPlan = () => {
      for (const connection of connectionsPlans) {
        const plan = connection.plans.find(p => p.slug === slug)
        if (plan) {
          setSelectedPlan({
            ...plan,
            connectionName: connection.connectionName
          })
          setFormData(prev => ({
            ...prev,
            deposit: plan.planPrice
          }))
          break
        }
      }
      setLoading(false)
    }

    findPlan()
  }, [slug])

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
    const selectedPlan = connectionsPlans.find(plan => plan.slug === selectedPlanSlug)
    setFormData({
      ...formData,
      plan: selectedPlan,
      deposit: selectedPlan ? selectedPlan.planPrice : 0
    })
  }

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={!!formErrors.fullName}
            />
            {formErrors.fullName && <FormHelperText error>{formErrors.fullName}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={!!formErrors.phone}
            />
            {formErrors.phone && <FormHelperText error>{formErrors.phone}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!formErrors.email}
            />
            {formErrors.email && <FormHelperText error>{formErrors.email}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Address"
              name="address"
              multiline
              rows={3}
              value={formData.address}
              onChange={handleInputChange}
              error={!!formErrors.address}
            />
            {formErrors.address && <FormHelperText error>{formErrors.address}</FormHelperText>}
          </FormControl>
        </Card>
      )
    case 1:
      return (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Confirm Subscription
          </Typography>
          {selectedPlan && (
            <>
              <Typography variant="body1" gutterBottom>
                Plan Name: {selectedPlan.planName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Connection Type: {selectedPlan.connectionName}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Price: ${selectedPlan.planPrice}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Validity: {selectedPlan.planValidity}
              </Typography>
            </>
          )}
        </Card>
      )
    case 2:
      return (
        <Card sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Payment
          </Typography>
          {selectedPlan && (
            <>
              <Typography variant="body1" gutterBottom>
                Total Amount: <Typography component="span" fontWeight="bold" color="secondary">${selectedPlan.planPrice}</Typography>
              </Typography>
            </>
          )}
        </Card>
      )
    default:
      return 'Unknown step'
    }
  }

  if (loading) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Loading plan details...</Typography>
        </Container>
      </Box>
    )
  }

  if (!selectedPlan) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Plan not found</Typography>
        </Container>
      </Box>
    )
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