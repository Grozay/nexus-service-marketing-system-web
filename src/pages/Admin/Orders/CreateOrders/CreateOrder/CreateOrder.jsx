import { useState } from 'react'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import SelectPlan from '~/pages/Admin/Orders/CreateOrders/SelectPlan/SelectPlan'
import ConfirmOrder from '~/pages/Admin/Orders/CreateOrders/ConfirmOrder/ConfirmOrder'
import { toast } from 'react-toastify'

const steps = ['Select Plan', 'Confirm Order']

const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [planData, setPlanData] = useState(null)
  const [storeData, setStoreData] = useState(null)
  const [accountData, setAccountData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setError(null)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setError(null)
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      setError(null)
      // Giả lập gọi API (thay bằng API thật của bạn)
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('Order created successfully')
      setActiveStep(0) // Reset về bước đầu
      setPlanData(null)
      setStoreData(null)
      setAccountData(null)
    } catch (err) {
      throw new Error('Failed to create order. Please try again.', err)
    } finally {
      setIsLoading(false)
    }
  }

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <SelectPlan onNext={handleNext} setPlanData={setPlanData} setStoreData={setStoreData} setAccountData={setAccountData} />
    case 1:
      return <ConfirmOrder planData={planData} store={storeData} accountData={accountData} onSubmit={handleSubmit} />
    default:
      return <Typography>Unknown step</Typography>
    }
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create Order
      </Typography>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 3 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {getStepContent(activeStep)}
              {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {error}
                </Typography>
              )}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mr: 1 }} disabled={isLoading}>
                    Back
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  )
}

export default CreateOrder