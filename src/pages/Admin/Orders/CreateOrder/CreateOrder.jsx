import React, { useState } from 'react'
import { Stepper, Step, StepLabel, Box, Button, Container, Typography } from '@mui/material'
import CreateAccount from '~/pages/Admin/Orders/CreateAccount/CreateAccount'
import SelectPlan from '~/pages/Admin/Orders/SelectPlan/SelectPlan'
import ConfirmOrder from '~/pages/Admin/Orders/ConfirmOrder/ConfirmOrder'
import { toast } from 'react-toastify'
const steps = ['Create Account', 'Select Plan', 'Confirm Order']

const CreateOrder = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [accountData, setAccountData] = useState(null)
  const [planData, setPlanData] = useState(null)
  const [storeData, setStoreData] = useState(null)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSubmit = () => {
    // Gọi API để tạo đơn hàng
    console.log('Order created:', { accountData, planData, storeData })
    toast.success('Order created successfully')
  }

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <CreateAccount onNext={handleNext} setAccountData={setAccountData} />
    case 1:
      return <SelectPlan onNext={handleNext} setPlanData={setPlanData} setStoreData={setStoreData} />
    case 2:
      return <ConfirmOrder accountData={accountData} planData={planData} store={storeData} onSubmit={handleSubmit} />
    default:
      return 'Unknown step'
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
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default CreateOrder