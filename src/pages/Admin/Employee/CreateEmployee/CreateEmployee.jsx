import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createEmployeeAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  DOB_RULE_MESSAGE,
  PHONE_NUMBER_RULE,
  PHONE_NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import dayjs from 'dayjs'

const CreateEmployee = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      employeeName: '',
      employeeEmail: '',
      employeePassword: '',
      employeePhone: '',
      employeeDOB: null,
      employeeGender: '',
      employeeAddress: '',
      employeeIdentity: '',
      employeeRole: ''
    }
  })

  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onCreateEmployee = async (data) => {
    try {
      setLoading(true)
      const employeeData = {
        employeeName: data.employeeName.trim(),
        employeeEmail: data.employeeEmail.trim(),
        employeePhone: data.employeePhone.trim(),
        employeeDOB: dayjs(data.employeeDOB).format('YYYY-MM-DD'),
        employeeGender: data.employeeGender,
        employeeAddress: data.employeeAddress.trim(),
        employeeIdentity: data.employeeIdentity.trim(),
        employeeRole: data.employeeRole
      }

      await toast.promise(
        createEmployeeAPI(employeeData),
        {
          pending: 'Creating employee...',
          success: {
            // eslint-disable-next-line no-unused-vars
            render({ data: res }) {
              navigate('/management/employee/list')
              return 'Employee created successfully'
            }
          },
          error: {
            render({ data: error }) {
              return error?.message || 'Failed to create employee'
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

  const employeeDOB = watch('employeeDOB')

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant='h5'
          component='h1'
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Create New Employee
        </Typography>

        <form onSubmit={handleSubmit(onCreateEmployee)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Full Name'
                disabled={loading}
                {...register('employeeName', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeName}
                helperText={errors.employeeName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Identity'
                disabled={loading}
                {...register('employeeIdentity', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeIdentity}
                helperText={errors.employeeIdentity?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Email'
                type='email'
                disabled={loading}
                {...register('employeeEmail', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
                error={!!errors.employeeEmail}
                helperText={errors.employeeEmail?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Phone Number'
                disabled={loading}
                {...register('employeePhone', { required: FIELD_REQUIRED_MESSAGE, pattern: { value: PHONE_NUMBER_RULE, message: PHONE_NUMBER_RULE_MESSAGE } })}
                error={!!errors.employeePhone}
                helperText={errors.employeePhone?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Date of Birth"
                  value={employeeDOB ? dayjs(employeeDOB, 'YYYY-MM-DD', true) : null}
                  disabled={loading}
                  onChange={(newValue) => {
                    const formattedValue = newValue && dayjs(newValue).isValid()
                      ? dayjs(newValue).format('YYYY-MM-DD')
                      : null
                    setValue('employeeDOB', formattedValue, { shouldValidate: true })
                  }}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      error: !!errors.employeeDOB,
                      helperText: errors.employeeDOB?.message
                    }
                  }}
                />
              </LocalizationProvider>
              <input
                type="hidden"
                {...register('employeeDOB', {
                  required: FIELD_REQUIRED_MESSAGE,
                  validate: (value) =>
                    !value || (dayjs(value, 'YYYY-MM-DD', true).isValid() && dayjs(value).isBefore(dayjs())) || DOB_RULE_MESSAGE
                })}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Gender'
                select
                disabled={loading}
                {...register('employeeGender', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeGender}
                helperText={errors.employeeGender?.message}
              >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Address'
                multiline
                rows={2}
                disabled={loading}
                {...register('employeeAddress', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeAddress}
                helperText={errors.employeeAddress?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 12 }}>
              <TextField
                fullWidth
                variant='outlined'
                label='Role'
                select
                disabled={loading}
                {...register('employeeRole', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeRole}
                helperText={errors.employeeRole?.message}
              >
                <MenuItem value='acs'>Account Staff</MenuItem>
                <MenuItem value='css'>Retail Staff</MenuItem>
                <MenuItem value='tes'>Technical Staff</MenuItem>
              </TextField>
            </Grid>


            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                type='submit'
                variant='contained'
                size='large'
                disabled={loading}
                sx={{
                  px: 5,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                  borderRadius: 2
                }}
              >
                {loading ? 'Creating...' : 'Create Employee'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateEmployee