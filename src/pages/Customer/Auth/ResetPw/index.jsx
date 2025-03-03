import { useState } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import ResetPwForm from './ResetPwForm'
import OtpForm from './OtpForm'
import AccountForm from './AccountForm'
const steps = ['Account', 'OTP', 'New Password']

const ResetPw = () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = () => {
    // Gọi API để tạo đơn hàng
    toast.success('Reset password successfully')
  }

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <AccountForm onNext={handleNext}/>
    case 1:
      return <OtpForm onNext={handleNext} />
    case 2:
      return <ResetPwForm onSubmit={handleSubmit} />
    default:
      return 'Unknown step'
    }
  }

  return (
    <Container maxWidth="md" sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}>
      <Typography variant="h4" gutterBottom>
        Reset Password
      </Typography>
      <Box>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
              </Button>
            )}
            {activeStep !== steps.length - 1 && (
              <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ResetPw