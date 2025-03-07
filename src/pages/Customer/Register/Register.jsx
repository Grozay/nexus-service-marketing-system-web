import { useState, useEffect } from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlansDetailsAPI, selectCurrentPlan } from '~/redux/plans/planSlice'
import { createPreOrderAPI } from '~/apis'
import { toast } from 'react-toastify'

const steps = ['Personal Information', 'Confirm Subscription', 'Total Cost Summary']

const Register = () => {
  const { slug } = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({
    preOrderName: '',
    preOrderPhone: '',
    preOrderEmail: '',
    preOrderAddress: '',
    preOrderCity: '',
    preOrderPlan: slug
  })
  const [formErrors, setFormErrors] = useState({})
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentPlan = useSelector(selectCurrentPlan)

  useEffect(() => {
    dispatch(fetchPlansDetailsAPI(slug)).then(() => {
      setLoading(false)
    }).catch((error) => {
      error.response.data.message
      // console.error('Error fetching plan details:', error)
      setLoading(false)
    })
  }, [dispatch, slug])

  const handleNext = () => {
    let errors = {}
    if (activeStep === 0) {
      if (!formData.preOrderName) errors.preOrderName = 'Please enter your Full Name'
      if (!formData.preOrderPhone) errors.preOrderPhone = 'Please enter your Phone Number'
      if (!formData.preOrderEmail) errors.preOrderEmail = 'Please enter your Email'
      if (!formData.preOrderAddress) errors.preOrderAddress = 'Please enter your Address'
      if (!formData.preOrderCity) errors.preOrderCity = 'Please enter your City'
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
    toast.promise(
      createPreOrderAPI(formData),
      {
        pending: 'Submitting...',
        success: 'Registered successfully!',
        error: 'Error registering'
      }
    ).then((res) => {
      if (!res.error) {
        navigate('/services')
      }
    })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
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
              name="preOrderName"
              value={formData.preOrderName}
              onChange={handleInputChange}
              error={!!formErrors.preOrderName}
            />
            {formErrors.preOrderName && <FormHelperText error>{formErrors.preOrderName}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Phone Number"
              name="preOrderPhone"
              value={formData.preOrderPhone}
              onChange={handleInputChange}
              error={!!formErrors.preOrderPhone}
            />
            {formErrors.preOrderPhone && <FormHelperText error>{formErrors.preOrderPhone}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Email"
              name="preOrderEmail"
              type="email"
              value={formData.preOrderEmail}
              onChange={handleInputChange}
              error={!!formErrors.preOrderEmail}
            />
            {formErrors.preOrderEmail && <FormHelperText error>{formErrors.preOrderEmail}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Address"
              name="preOrderAddress"
              multiline
              rows={3}
              value={formData.preOrderAddress}
              onChange={handleInputChange}
              error={!!formErrors.preOrderAddress}
            />
            {formErrors.preOrderAddress && <FormHelperText error>{formErrors.preOrderAddress}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="City"
              name="preOrderCity"
              value={formData.preOrderCity}
              onChange={handleInputChange}
              error={!!formErrors.preOrderCity}
            />
            {formErrors.preOrderCity && <FormHelperText error>{formErrors.preOrderCity}</FormHelperText>}
          </FormControl>
        </Card>
      )
    case 1:
      return (
        <Card sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1" gutterBottom>
              Full Name: {formData.preOrderName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Phone Number: {formData.preOrderPhone}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Email: {formData.preOrderEmail}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Address: {formData.preOrderAddress}
            </Typography>
            <Typography variant="body1" gutterBottom>
              City: {formData.preOrderCity}
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
              Service Details
            </Typography>
            {currentPlan && (
              <>
                <Typography variant="body1" gutterBottom>
                  Plan Name: {currentPlan.planName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Connection Type: {currentPlan.plan_Category.categoryName}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Price: ${currentPlan.planPrice}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Validity: {currentPlan.planValidity}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Description: {currentPlan.planDescription}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Deposit: ${currentPlan.plan_Category.categoryDeposit}
                </Typography>
              </>
            )}
          </Box>
        </Card>
      )
    case 2:
      return (
        <Card sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            TOTAL COST SUMMARY
          </Typography>
          {currentPlan && (
            <>
              <Typography variant="body1" gutterBottom>
                Plan Price:{' '}
                <Typography component="span" fontWeight="bold" color="secondary">
                  ${currentPlan.planPrice}
                </Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Deposit:{' '}
                <Typography component="span" fontWeight="bold" color="secondary">
                  ${currentPlan.plan_Category.categoryDeposit}
                </Typography>
              </Typography>
              <Typography variant="body1" gutterBottom>
                Total Amount:{' '}
                <Typography component="span" fontWeight="bold" color="secondary">
                  ${currentPlan.planPrice + currentPlan.plan_Category.categoryDeposit}
                </Typography>
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

  if (!currentPlan) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
          <Typography variant="h6">Plan not found</Typography>
          <Link to="/service">
            <Button>Back to Services</Button>
          </Link>
        </Container>
      </Box>
    )
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 5, mb: 7 }}>
        <Typography variant="h4" component="h1" gutterBottom textAlign="center" fontWeight="bold">
          NEXUS Service Registration
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3, mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mb: 3 }}>{getStepContent(activeStep)}</Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={handleBack} variant="contained" color="grey">
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Complete Subscription
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Register