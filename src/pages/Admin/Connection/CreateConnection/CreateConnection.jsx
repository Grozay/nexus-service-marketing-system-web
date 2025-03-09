import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { createConnectionAPI, getAllOrdersAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { useSelector } from 'react-redux'
import Autocomplete from '@mui/material/Autocomplete'

const CreateConnection = () => {
  const currentUser = useSelector(selectCurrentUser)
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      connectionName: '',
      connectionDescription: '',
      connectionStatus: 'Active',
      employeeId: currentUser?.employeeId || '',
      orderId: '',
      isConnected: 'true'
    }
  })
  const navigate = useNavigate()
  const [orderList, setOrderList] = useState([])

  useEffect(() => {
    const fetchOrderList = async () => {
      try {
        const response = await getAllOrdersAPI()
        if (Array.isArray(response)) {
          setOrderList(response)
        } else {
          toast.error('Invalid order list data')
        }
      } catch {
        toast.error('Failed to load order list')
      }
    }
    fetchOrderList()
  }, [])

  const onSubmit = async (data) => {
    try {
      const { connectionName, connectionDescription, connectionStatus, orderId, isConnected } = data

      if (!connectionName?.trim() || !connectionDescription?.trim() || !connectionStatus || !orderId?.trim()) {
        toast.error('Please fill in all required fields')
        return
      }

      const connectionData = {
        connectionName: connectionName.trim(),
        connectionDescription: connectionDescription.trim(),
        connectionStatus,
        employeeId: currentUser?.userId,
        orderId: orderId.trim(),
        isConnected: isConnected === 'true'
      }

      await toast.promise(
        createConnectionAPI(connectionData),
        {
          pending: 'Creating connection...',
          success: {
            render({ data: res }) {
              if (res && !res.error) {
                navigate('/management/connection/list')
                return 'Create connection successfully'
              }
              return res?.message || 'Cannot create connection'
            }
          },
          error: {
            render({ data: error }) {
              if (error?.errors) {
                const errorMessages = Object.values(error.errors).flat()
                return errorMessages.join(', ') || 'Create connection failed'
              }
              return error.message || 'Create connection failed'
            }
          }
        }
      )
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant='h5' component='h1' sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
          Create New Connection
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                label='Connection Name'
                fullWidth
                variant='outlined'
                {...register('connectionName', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.connectionName}
                helperText={errors.connectionName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label='Description'
                fullWidth
                variant='outlined'
                multiline
                rows={3}
                {...register('connectionDescription', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.connectionDescription}
                helperText={errors.connectionDescription?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Status'
                fullWidth
                select
                variant='outlined'
                {...register('connectionStatus', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.connectionStatus}
                helperText={errors.connectionStatus?.message}
              >
                <MenuItem value='Active'>Active</MenuItem>
                <MenuItem value='Inactive'>Inactive</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Employee'
                fullWidth
                variant='outlined'
                disabled
                value={`${currentUser?.userName} (${currentUser?.userId})`}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="orderId"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field, fieldState: { error } }) => (
                  <Autocomplete
                    options={orderList}
                    getOptionLabel={(option) => `${option.orderId} - ${option.orderStatus}`}
                    value={orderList.find(option => option.orderId === field.value) || null}
                    onChange={(_, newValue) => field.onChange(newValue ? newValue.orderId : '')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Search Order"
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error?.message}
                      />
                    )}
                    noOptionsText="No orders available"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Connection Status'
                fullWidth
                select
                variant='outlined'
                {...register('isConnected', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.isConnected}
                helperText={errors.isConnected?.message}
              >
                <MenuItem value='true'>Connected</MenuItem>
                <MenuItem value='false'>Disconnected</MenuItem>
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
                Create Connection
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateConnection