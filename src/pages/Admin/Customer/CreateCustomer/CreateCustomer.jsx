import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { createAccountAPI, getCityCodeAPI, getCategoryPlanAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import Paper from '@mui/material/Paper'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  DOB_RULE,
  DOB_RULE_MESSAGE
} from '~/utils/validators'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs' // Thêm dayjs để xử lý ngày tháng

const CreateCustomer = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      customerDOB: null // Giá trị mặc định cho customerDOB
    }
  })
  const navigate = useNavigate()
  const [cityCodes, setCityCodes] = useState([])
  const [planList, setPlanList] = useState([])

  useEffect(() => {
    const fetchCityCodes = async () => {
      try {
        const response = await getCityCodeAPI()
        setCityCodes(response)
      } catch {
        toast.error('Failed to load city list')
      }
    }
    fetchCityCodes()
  }, [])

  useEffect(() => {
    const fetchPlanList = async () => {
      try {
        const response = await getCategoryPlanAPI()
        setPlanList(response)
      } catch {
        toast.error('Failed to load service plans')
      }
    }
    fetchPlanList()
  }, [])

  const onSubmit = async (data) => {
    const { customerName, customerEmail, customerPhone, customerAddress, cityCodeId, customerDOB, customerGender, categoryId, customerIdentity } = data
    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !cityCodeId || !customerDOB || !customerGender || !categoryId || !customerIdentity ) {
      toast.error('Please fill in all required fields')
      return
    }

    const accountData = {
      accountName: customerName.trim(),
      accountEmail: customerEmail.trim(),
      accountPhone: customerPhone.trim(),
      accountAddress: customerAddress.trim(),
      cityCodeId: cityCodeId.trim(),
      accountDOB: customerDOB,
      accountGender: customerGender,
      categoryId: categoryId.trim(),
      accountIdentity: customerIdentity.trim()
    }

    toast.promise(
      createAccountAPI(accountData),
      {
        pending: 'Creating customer...',
        success: {
          render({ data: res }) {
            if (res && !res.error) {
              navigate('/management/customer/list')
              return 'Create customer successfully'
            }
            return res?.message || 'Cannot create customer'
          }
        },
        error: {
          render({ data: error }) {
            if (error?.errors) {
              const errorMessages = Object.values(error.errors).flat()
              return errorMessages.join(', ') || 'Create customer failed'
            }
            return error.message || 'Create customer failed'
          }
        }
      }
    ).catch(() => {})
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant='h5' component='h1' sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Create New Customer
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Full Name'
                fullWidth
                variant='outlined'
                {...register('customerName', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Email'
                type='email'
                fullWidth
                variant='outlined'
                {...register('customerEmail', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
                error={!!errors.customerEmail}
                helperText={errors.customerEmail?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Identity'
                fullWidth
                variant='outlined'
                {...register('customerIdentity', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.customerIdentity}
                helperText={errors.customerIdentity?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Phone Number'
                fullWidth
                variant='outlined'
                {...register('customerPhone', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.customerPhone}
                helperText={errors.customerPhone?.message}
              />
            </Grid>

            {/* Date of Birth */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <DesktopDatePicker
                  label='Date of Birth'
                  value={null} // Giá trị ban đầu là null
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null
                    setValue('customerDOB', formattedDate, { shouldValidate: true })
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.customerDOB,
                      helperText: errors.customerDOB?.message,
                      inputProps: {
                        ...register('customerDOB', {
                          required: FIELD_REQUIRED_MESSAGE,
                          validate: {
                            validDate: (value) => DOB_RULE(value) || DOB_RULE_MESSAGE
                          }
                        })
                      }
                    }
                  }}
                />
              </Grid>
            </LocalizationProvider>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Gender'
                fullWidth
                select
                variant='outlined'
                {...register('customerGender', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.customerGender}
                helperText={errors.customerGender?.message}
              >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label='Address'
                fullWidth
                variant='outlined'
                multiline
                rows={2}
                {...register('customerAddress', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.customerAddress}
                helperText={errors.customerAddress?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='City'
                fullWidth
                select
                variant='outlined'
                {...register('cityCodeId', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.cityCodeId}
                helperText={errors.cityCodeId?.message}
              >
                {cityCodes.map((option) => (
                  <MenuItem key={option?.cityCodeId} value={option?.cityCodeId}>
                    {option?.cityName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Service Plan'
                fullWidth
                select
                variant='outlined'
                {...register('categoryId', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.categoryId}
                helperText={errors.categoryId?.message}
              >
                {planList.map((option) => (
                  <MenuItem key={option?.categoryId} value={option?.categoryId}>
                    {option?.categoryName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                type='submit'
                variant='contained'
                size='large'
                sx={{
                  px: 5,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                  borderRadius: 2
                }}
              >
                Create Customer
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateCustomer