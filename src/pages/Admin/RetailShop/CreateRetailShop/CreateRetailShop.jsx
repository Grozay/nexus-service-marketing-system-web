import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createRetailShopAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import { FIELD_REQUIRED_MESSAGE, PHONE_NUMBER_RULE, PHONE_NUMBER_RULE_MESSAGE, LATITUDE_RULE, LATITUDE_RULE_MESSAGE, LONGITUDE_RULE, LONGITUDE_RULE_MESSAGE } from '~/utils/validators'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import dayjs from 'dayjs'

const CreateRetailShop = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      storeName: '',
      storeAddress: '',
      storeCity: '',
      storePhone: '',
      storeLatitude: '',
      storeLongitude: '',
      storeOpenAt: null,
      storeCloseAt: null,
      storeStatus: ''
    }
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const storeOpenAt = watch('storeOpenAt')
  const storeCloseAt = watch('storeCloseAt')

  const onCreateStore = async (data) => {
    try {
      setLoading(true)

      // Kiểm tra giờ mở và đóng
      if (data.storeOpenAt && data.storeCloseAt && dayjs(data.storeCloseAt).isBefore(dayjs(data.storeOpenAt))) {
        setLoading(false)
        return toast.error('Close time must be after open time')
      }

      // Payload khớp với model BE (camelCase)
      const formattedData = {
        storeName: data.storeName.trim(),
        storeAddress: data.storeAddress.trim(),
        storeCity: data.storeCity.trim(),
        storePhone: data.storePhone.trim(),
        storeLatitude: data.storeLatitude.trim(), // Giữ nguyên chuỗi
        storeLongitude: data.storeLongitude.trim(), // Giữ nguyên chuỗi
        storeOpenAt: data.storeOpenAt ? dayjs(data.storeOpenAt).format('HH:mm') : null,
        storeCloseAt: data.storeCloseAt ? dayjs(data.storeCloseAt).format('HH:mm') : null,
        storeStatus: data.storeStatus
      }

      // Log payload để debug
      await toast.promise(
        createRetailShopAPI(formattedData),
        {
          pending: 'Creating store...',
          success: {
            render() {
              navigate('/management/retail-shop/list')
              return 'Store created successfully!'
            }
          },
          error: {
            render({ data: error }) {
              return error?.response?.data?.title || 'Failed to create store'
            }
          }
        }
      )
    } catch (error) {
      toast.error(error?.response?.data?.title || 'Failed to create store')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Create New Retail Shop
        </Typography>

        <form onSubmit={handleSubmit(onCreateStore)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Store Name"
                disabled={loading}
                {...register('storeName', { required: FIELD_REQUIRED_MESSAGE, maxLength: { value: 100, message: 'Store name must not exceed 100 characters' } })}
                error={!!errors.storeName}
                helperText={errors.storeName?.message}
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
                {...register('storeAddress', { required: FIELD_REQUIRED_MESSAGE, maxLength: { value: 255, message: 'Address must not exceed 255 characters' } })}
                error={!!errors.storeAddress}
                helperText={errors.storeAddress?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="City"
                disabled={loading}
                {...register('storeCity', { required: FIELD_REQUIRED_MESSAGE, maxLength: { value: 100, message: 'City must not exceed 100 characters' } })}
                error={!!errors.storeCity}
                helperText={errors.storeCity?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Phone Number"
                disabled={loading}
                {...register('storePhone', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: PHONE_NUMBER_RULE, message: PHONE_NUMBER_RULE_MESSAGE },
                  maxLength: { value: 20, message: 'Phone number must not exceed 20 characters' }
                })}
                error={!!errors.storePhone}
                helperText={errors.storePhone?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Latitude"
                disabled={loading}
                {...register('storeLatitude', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: LATITUDE_RULE, message: LATITUDE_RULE_MESSAGE },
                  maxLength: { value: 255, message: 'Latitude must not exceed 255 characters' }
                })}
                error={!!errors.storeLatitude}
                helperText={errors.storeLatitude?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Longitude"
                disabled={loading}
                {...register('storeLongitude', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: LONGITUDE_RULE, message: LONGITUDE_RULE_MESSAGE },
                  maxLength: { value: 255, message: 'Longitude must not exceed 255 characters' }
                })}
                error={!!errors.storeLongitude}
                helperText={errors.storeLongitude?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Open At"
                  value={storeOpenAt}
                  onChange={(newValue) => setValue('storeOpenAt', newValue, { shouldValidate: true })}
                  disabled={loading}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors.storeOpenAt,
                      helperText: errors.storeOpenAt?.message,
                      ...register('storeOpenAt', { required: FIELD_REQUIRED_MESSAGE })
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  label="Close At"
                  value={storeCloseAt}
                  onChange={(newValue) => setValue('storeCloseAt', newValue, { shouldValidate: true })}
                  disabled={loading}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors.storeCloseAt,
                      helperText: errors.storeCloseAt?.message,
                      ...register('storeCloseAt', { required: FIELD_REQUIRED_MESSAGE })
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                variant="outlined"
                label="Status"
                select
                disabled={loading}
                {...register('storeStatus', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.storeStatus}
                helperText={errors.storeStatus?.message}
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
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    Creating...
                  </>
                ) : (
                  'Create Retail Shop'
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateRetailShop