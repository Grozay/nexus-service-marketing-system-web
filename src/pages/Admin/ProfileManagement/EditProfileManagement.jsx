import { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { updateEmployeeAPI, getEmployeeByIdAPI } from '~/apis'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { styled } from '@mui/material/styles'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PHONE_NUMBER_RULE,
  PHONE_NUMBER_RULE_MESSAGE
} from '~/utils/validators'
import { useEffect } from 'react'
// Styled components
const EditProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[3],
  backgroundColor: theme.palette.background.paper
}))

const EditProfile = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const confirmUpdate = useConfirm()

  const [employeeData, setEmployeeData] = useState(null)

  const fetchEmployeeData = async () => {
    const employeeData = await getEmployeeByIdAPI(currentUser.userId)
    setEmployeeData(employeeData)
  }

  useEffect(() => {
    fetchEmployeeData()
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    defaultValues: {
      employeeName: employeeData?.employeeName || '',
      employeeEmail: employeeData?.employeeEmail || '',
      employeePhone: employeeData?.employeePhone || '',
      employeeAddress: employeeData?.employeeAddress || '',
      employeeGender: employeeData?.employeeGender || '',
      employeeDOB: employeeData?.employeeDOB ? dayjs(employeeData.employeeDOB) : null
    }
  })

  useEffect(() => {
    if (employeeData) {
      setValue('employeeName', employeeData.employeeName)
      setValue('employeeEmail', employeeData.employeeEmail)
      setValue('employeePhone', employeeData.employeePhone)
      setValue('employeeAddress', employeeData.employeeAddress)
      setValue('employeeGender', employeeData.employeeGender)
      setValue('employeeDOB', employeeData.employeeDOB ? dayjs(employeeData.employeeDOB) : null)
    }
  }, [employeeData, setValue])

  const employeeDOB = watch('employeeDOB')
  const [loading, setLoading] = useState(false)

  const handleDateChange = (date) => {
    setValue('employeeDOB', date, { shouldValidate: true })
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      const employeeData = {
        employeeId: currentUser?.userId,
        employeeName: data.employeeName.trim(),
        employeeEmail: data.employeeEmail.trim(),
        employeePhone: data.employeePhone.replace(/-/g, '').trim(),
        employeeAddress: data.employeeAddress.trim(),
        employeeGender: data.employeeGender,
        employeeDOB: data.employeeDOB ? dayjs(data.employeeDOB).format('YYYY-MM-DD') : null,
        employeeIsActive: currentUser?.employeeIsActive || true
      }

      await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update your profile?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      await toast.promise(
        updateEmployeeAPI(employeeData),
        {
          pending: 'Updating profile...',
          success: {
            render() {
              navigate('/management/profile')
              return 'Profile updated successfully'
            }
          },
          error: {
            render({ data: error }) {
              return error?.message || 'Failed to update profile'
            }
          }
        }
      )
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update employee failed')
      } else {
        toast.error(error.message || 'Update employee failed')
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate('/management/profile')
  }

  return (
    <Container maxWidth="md">
      <EditProfilePaper elevation={3}>
        <Typography variant="h4" gutterBottom>
          Edit Profile
        </Typography>
        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                {...register('employeeName', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeName}
                helperText={errors.employeeName?.message}
                variant="outlined"
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register('employeeEmail', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: EMAIL_RULE, message: EMAIL_RULE_MESSAGE }
                })}
                error={!!errors.employeeEmail}
                helperText={errors.employeeEmail?.message}
                variant="outlined"
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                {...register('employeePhone', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: { value: PHONE_NUMBER_RULE, message: PHONE_NUMBER_RULE_MESSAGE }
                })}
                error={!!errors.employeePhone}
                helperText={errors.employeePhone?.message}
                variant="outlined"
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth variant="outlined" disabled={loading}>
                <InputLabel shrink={true}>Gender</InputLabel>
                <Select
                  label="Gender"
                  {...register('employeeGender', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.employeeGender}
                  value={watch('employeeGender')}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={watch('employeeDOB')}
                  onChange={handleDateChange}
                  maxDate={dayjs()}
                  disabled={loading}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      variant: 'outlined',
                      required: true,
                      error: !!errors.employeeDOB,
                      helperText: errors.employeeDOB?.message,
                      InputLabelProps: { shrink: true }
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                multiline
                rows={2}
                {...register('employeeAddress', { required: FIELD_REQUIRED_MESSAGE })}
                error={!!errors.employeeAddress}
                helperText={errors.employeeAddress?.message}
                variant="outlined"
                disabled={loading}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </EditProfilePaper>
    </Container>
  )
}

export default EditProfile