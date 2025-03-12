import { useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid2'
import { useForm, Controller } from 'react-hook-form'
import { getAllRetailShopsAPI, getPlanListAPI, getAllAccountsAPI } from '~/apis'
import { toast } from 'react-toastify'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'

const SelectPlan = ({ onNext, setPlanData, setStoreData, setAccountData }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      planId: '',
      storeId: '',
      startDate: '',
      endDate: '',
      accountId: ''
    }
  })

  const [allPlans, setAllPlans] = useState([])
  const [allStores, setAllStores] = useState([])
  const [accountList, setAccountList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const startDateValue = watch('startDate')
  const planIdValue = watch('planId')
  const accountIdValue = watch('accountId')

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [plans, stores, accounts] = await Promise.all([
          getPlanListAPI(),
          getAllRetailShopsAPI(),
          getAllAccountsAPI()
        ])
        setAllPlans(plans || [])
        setAllStores(stores || [])
        setAccountList(accounts || [])
      } catch (error) {
        toast.error('Error fetching data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Lọc plans dựa trên category của account đã chọn
  const selectedAccount = accountList.find(account => account.accountId === accountIdValue)
  const availablePlans = allPlans.filter(plan =>
    plan?.plan_Category?.categoryKey === selectedAccount?.categoryDetails?.categoryKey
  )

  const onSubmit = (data) => {
    const { planId, storeId, startDate, endDate, accountId } = data

    const selectedPlanData = allPlans.find(plan => plan.planId === planId)
    const selectedStoreData = allStores.find(store => store.storeId === storeId)
    const selectedAccountData = accountList.find(account => account.accountId === accountId)

    if (!selectedPlanData || !selectedStoreData || !selectedAccountData) {
      toast.error('Selected plan, store, or account not found')
      return
    }

    const start = dayjs(startDate)
    const end = dayjs(endDate)

    if (!start.isValid() || !end.isValid()) {
      toast.error('Invalid date format')
      return
    }

    // Kiểm tra category match
    const isValidPlan = selectedPlanData?.plan_Category?.categoryKey ===
      selectedAccountData?.categoryDetails?.categoryKey

    if (!isValidPlan) {
      toast.error('Selected plan is not available for this customer category')
      return
    }

    setPlanData({
      ...selectedPlanData,
      startDate: start.toDate(),
      endDate: end.toDate(),
      depositAmount: selectedPlanData.plan_Category.categoryDeposit
    })
    setStoreData({
      ...selectedStoreData,
      account: selectedAccountData
    })
    setAccountData(selectedAccountData)
    onNext()
  }

  const selectedPlan = allPlans.find(plan => plan.planId === planIdValue)

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ mt: 3 }}>
        <Box sx={{ margin: '1em', display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Typography variant="h4">Select Plan</Typography>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <Controller
                  name="accountId"
                  control={control}
                  rules={{ required: 'Please select an account' }}
                  render={({ field, fieldState: { error } }) => (
                    <Autocomplete
                      options={accountList}
                      getOptionLabel={(option) => `${option.accountName} (${option.accountId})`}
                      value={accountList.find(option => option.accountId === field.value) || null}
                      onChange={(_, newValue) => field.onChange(newValue ? newValue.accountId : '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search Account"
                          variant="outlined"
                          fullWidth
                          margin="normal"
                          error={!!error}
                          helperText={error?.message}
                        />
                      )}
                      noOptionsText="No accounts found"
                      sx={{ minWidth: 300 }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth error={!!errors.planId}>
                  <InputLabel id="plan-label">Plan</InputLabel>
                  <Controller
                    name="planId"
                    control={control}
                    rules={{ required: 'Please select a plan' }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="plan-label"
                        label="Plan"
                        fullWidth
                        margin="normal"
                        disabled={!accountIdValue} // Disable nếu chưa chọn account
                      >
                        {availablePlans.map((plan) => (
                          <MenuItem key={plan.planId} value={plan.planId}>
                            {plan.planName} - {plan.planPrice} $
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.planId && <Typography color="error" variant="caption">{errors.planId.message}</Typography>}
                  {!accountIdValue && (
                    <Typography color="textSecondary" variant="caption">
                      Please select an account first
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth error={!!errors.storeId}>
                  <InputLabel id="store-label">Store</InputLabel>
                  <Controller
                    name="storeId"
                    control={control}
                    rules={{ required: 'Please select a store' }}
                    render={({ field }) => (
                      <Select {...field} labelId="store-label" label="Store" fullWidth margin="normal">
                        {allStores.map((store) => (
                          <MenuItem key={store.storeId} value={store.storeId}>
                            {store.storeName} - {store.storeCity}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.storeId && <Typography color="error" variant="caption">{errors.storeId.message}</Typography>}
                </FormControl>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{
                    required: 'Please select a start date',
                    validate: (value) =>
                      dayjs(value).isValid() && !dayjs(value).isBefore(dayjs(), 'day') ||
                      'Start date cannot be in the past'
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <DesktopDatePicker
                      label="Start Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                          inputProps: { min: dayjs().format('YYYY-MM-DD') }
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Controller
                  name="endDate"
                  control={control}
                  rules={{
                    required: 'Please select an end date',
                    validate: (value) => {
                      const start = dayjs(startDateValue)
                      const end = dayjs(value)
                      if (!end.isValid()) return 'Invalid end date'
                      if (end.isBefore(start)) return 'End date cannot be before start date'
                      if (end.diff(start, 'year', true) > 2) return 'Plan duration cannot exceed 2 years'
                      return true
                    }
                  }}
                  render={({ field, fieldState: { error } }) => (
                    <DesktopDatePicker
                      label="End Date"
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(newValue) => field.onChange(newValue ? newValue.format('YYYY-MM-DD') : null)}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!error,
                          helperText: error?.message,
                          inputProps: { min: startDateValue || dayjs().format('YYYY-MM-DD') }
                        }
                      }}
                    />
                  )}
                />
              </Grid>

              {planIdValue && (
                <>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                      label="Plan Amount $"
                      value={selectedPlan ? selectedPlan.planPrice : ''}
                      fullWidth
                      margin="normal"
                      disabled
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, md: 12 }}>
                    <TextField
                      label="Deposit Amount $"
                      value={selectedPlan ? selectedPlan.plan_Category.categoryDeposit : ''}
                      fullWidth
                      margin="normal"
                      disabled
                      InputProps={{
                        readOnly: true
                      }}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em', mt: 2 }}>
            <Button type="submit" variant="contained" fullWidth disabled={isLoading}>
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </LocalizationProvider>
  )
}

export default SelectPlan