import { useState, useEffect } from 'react'
import {
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  TextField
} from '@mui/material'
import Grid from '@mui/material/Grid2'
import { useForm, Controller } from 'react-hook-form'
import { getAllRetailShopsAPI, getPlanListAPI } from '~/apis'
import { toast } from 'react-toastify'

const SelectPlan = ({ onNext, setPlanData, setStoreData }) => {
  const { control, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      planId: '',
      storeId: '',
      startDate: '',
      endDate: ''
    }
  })
  const [allPlans, setAllPlans] = useState([])
  const [allStores, setAllStores] = useState([])

  // Fetch plans and stores data
  useEffect(() => {
    // Fetch plans data
    getPlanListAPI()
      .then(data => setAllPlans(data))
      .catch(() => toast.error('Error fetching plans'))

    // Fetch stores data
    getAllRetailShopsAPI()
      .then(data => {
        setAllStores(data)
      })
      .catch(() => toast.error('Error fetching stores'))
  }, [])

  // Validate date range using native Date methods
  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) {
      toast.error('Please select both start and end dates')
      return false
    }

    // Parse dates and handle timezone issues
    const start = new Date(startDate + 'T00:00:00')
    const end = new Date(endDate + 'T00:00:00')

    // Check if dates are valid
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      toast.error('Invalid date format')
      return false
    }

    // Check if end date is before start date
    if (end < start) {
      toast.error('End date cannot be before start date')
      return false
    }

    // Check if duration is reasonable (not more than 2 years)
    const maxEndDate = new Date(start)
    maxEndDate.setFullYear(maxEndDate.getFullYear() + 2)
    if (end > maxEndDate) {
      toast.error('Plan duration cannot exceed 2 years')
      return false
    }

    return true
  }

  const onSubmit = (data) => {
    const { planId, storeId, startDate, endDate } = data
    // Validate required fields
    if (!planId || !storeId) {
      toast.error('Please select a plan and store')
      return
    }
    // Validate dates
    if (!validateDates(startDate, endDate)) return

    // Find selected plan and store
    const selectedPlanData = allPlans.find(plan => plan.planId === planId)
    const selectedStoreData = allStores.find(store => store.storeId === storeId)

    // Pass data to parent component
    if (selectedPlanData && selectedStoreData) {
      setPlanData({
        ...selectedPlanData,
        startDate: new Date(startDate),
        endDate: new Date(endDate)
      })
      setStoreData(selectedStoreData)
      onNext()
    } else {
      toast.error('Plan or store not found')
    }
  }

  const startDateValue = watch('startDate')

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select Plan
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.planId}>
                <InputLabel id="plan-label">Plan</InputLabel>
                <Controller
                  name="planId"
                  control={control}
                  rules={{ required: 'Please select a plan' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        labelId="plan-label"
                        label="Plan"
                        fullWidth
                        margin="normal"
                      >
                        {allPlans.map((plan) => (
                          <MenuItem key={plan.planId} value={plan.planId}>
                            {plan.planName} - {plan.planPrice} VND
                          </MenuItem>
                        ))}
                      </Select>
                      {error && <Typography color="error" variant="caption">{error.message}</Typography>}
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.storeId}>
                <InputLabel id="store-label">Store</InputLabel>
                <Controller
                  name="storeId"
                  control={control}
                  rules={{ required: 'Please select a store' }}
                  render={({ field, fieldState: { error } }) => {
                    return (
                      <>
                        <Select
                          {...field}
                          labelId="store-label"
                          label="Store"
                          fullWidth
                          margin="normal"
                        >
                          {allStores.map((store) => (
                            <MenuItem key={store.storeId} value={store.storeId}>
                              {store.storeName} - {store.storeCity}
                            </MenuItem>
                          ))}
                        </Select>
                        {error && <Typography color="error" variant="caption">{error.message}</Typography>}
                      </>
                    );
                  }}
                />
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: 'Please select a start date' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    key={field.value}
                    label=""
                    type="date"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    inputProps={{
                      min: new Date().toISOString().split('T')[0]
                    }}
                  />
                )}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: 'Please select an end date' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    key={field.value}
                    label=""
                    type="date"
                    fullWidth
                    error={!!error}
                    helperText={error?.message}
                    inputProps={{
                      min: startDateValue || new Date().toISOString().split('T')[0]
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Tiếp Theo
        </Button>
      </form>
    </Box>
  )
}

export default SelectPlan