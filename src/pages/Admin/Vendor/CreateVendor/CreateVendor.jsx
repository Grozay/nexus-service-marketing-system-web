import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createVendorAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import {
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE
} from '~/utils/validators'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'

const CreateVendor = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      vendorName: '',
      vendorAddress: '',
      vendorDescription: '',
      vendorPhone: '',
      vendorEmail: '',
      vendorStartFrom: null,
      vendorEndTo: null,
      vendorStatus: 'Active'
    }
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const vendorStartFrom = watch('vendorStartFrom')

  const onCreateVendor = async (data) => {
    try {
      setLoading(true)
      const formattedData = {
        vendorName: data.vendorName.trim(),
        vendorAddress: data.vendorAddress.trim(),
        vendorDescription: data.vendorDescription.trim(),
        vendorPhone: data.vendorPhone.trim(),
        vendorEmail: data.vendorEmail.trim(),
        vendorStartFrom: data.vendorStartFrom ? dayjs(data.vendorStartFrom).format('YYYY-MM-DD') : null,
        vendorEndTo: data.vendorEndTo ? dayjs(data.vendorEndTo).format('YYYY-MM-DD') : null,
        vendorStatus: data.vendorStatus
      }

      await toast.promise(
        createVendorAPI(formattedData),
        {
          pending: 'Creating vendor...',
          success: {
            render() {
              navigate('/management/vendor/list')
              return 'Vendor created successfully!'
            }
          },
          error: {
            render({ data: error }) {
              return error?.response?.data?.title || 'Failed to create vendor'
            }
          }
        }
      )
    } catch (error) {
      throw Error(error)
    } finally {
      setLoading(false)
    }
  }

  // Hàm kiểm tra ngày hợp lệ
  const isValidDate = (date) => {
    return date && dayjs(date).isValid() && !isNaN(dayjs(date).valueOf())
  }

  // Validation rules cho ngày
  const validateStartDate = (value) => {
    if (!isValidDate(value)) return 'Please enter a valid date'
    if (dayjs(value).isBefore(dayjs(), 'day')) return 'Start date cannot be in the past'
    return true
  }

  const validateEndDate = (value) => {
    if (!isValidDate(value)) return 'Please enter a valid date'
    if (!vendorStartFrom) return true // Nếu chưa chọn start date thì không validate
    if (dayjs(value).isBefore(dayjs(vendorStartFrom), 'day')) return 'End date must be after start date'
    if (dayjs(value).diff(dayjs(vendorStartFrom), 'year') > 10) return 'End date cannot be more than 10 years from start date'
    return true
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Create New Vendor
        </Typography>

        <form onSubmit={handleSubmit(onCreateVendor)}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Vendor Name"
                  disabled={loading}
                  {...register('vendorName', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.vendorName}
                  helperText={errors.vendorName?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Address"
                  multiline
                  rows={2}
                  disabled={loading}
                  {...register('vendorAddress', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.vendorAddress}
                  helperText={errors.vendorAddress?.message}
                />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Description"
                  multiline
                  rows={4}
                  disabled={loading}
                  {...register('vendorDescription', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.vendorDescription}
                  helperText={errors.vendorDescription?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Phone Number"
                  disabled={loading}
                  {...register('vendorPhone', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.vendorPhone}
                  helperText={errors.vendorPhone?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  type="email"
                  disabled={loading}
                  {...register('vendorEmail', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                  })}
                  error={!!errors.vendorEmail}
                  helperText={errors.vendorEmail?.message}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <DesktopDatePicker
                  label="Start Date"
                  value={null}
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null
                    setValue('vendorStartFrom', formattedDate, { shouldValidate: true })
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      disabled: loading,
                      error: !!errors.vendorStartFrom,
                      helperText: errors.vendorStartFrom?.message,
                      inputProps: {
                        ...register('vendorStartFrom', {
                          required: FIELD_REQUIRED_MESSAGE,
                          validate: validateStartDate
                        })
                      }
                    }
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <DesktopDatePicker
                  label="End Date"
                  value={null}
                  onChange={(newValue) => {
                    const formattedDate = newValue ? dayjs(newValue).format('YYYY-MM-DD') : null
                    setValue('vendorEndTo', formattedDate, { shouldValidate: true })
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      disabled: loading,
                      error: !!errors.vendorEndTo,
                      helperText: errors.vendorEndTo?.message,
                      inputProps: {
                        ...register('vendorEndTo', {
                          required: FIELD_REQUIRED_MESSAGE,
                          validate: validateEndDate
                        })
                      }
                    }
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 12 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Status"
                  select
                  disabled={loading}
                  {...register('vendorStatus', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.vendorStatus}
                  helperText={errors.vendorStatus?.message}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    px: 5,
                    py: 1.5,
                    bgcolor: 'primary.main',
                    '&:hover': { bgcolor: 'primary.dark' },
                    borderRadius: 2
                  }}
                >
                  {loading ? 'Creating...' : 'Create Vendor'}
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateVendor