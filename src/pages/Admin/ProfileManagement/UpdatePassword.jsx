import { Box, Button, Typography, TextField, Card, CardActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { updateEmployeePasswordAPI } from '~/apis'
import {
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE
} from '~/utils/validators'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { useNavigate } from 'react-router-dom'

const UpdatePassword = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const onSubmit = async (data) => {
    const { currentPassword, newPassword } = data
    const payload = {
      UserId: currentUser.userId,
      OldPassword: currentPassword,
      NewPassword: newPassword
    }
    try {
      await toast.promise(
        updateEmployeePasswordAPI(payload),
        {
          pending: 'Updating password...',
          success: 'Password updated successfully!',
          error: 'Failed to update password.'
        }
      )
      navigate('/management/profile')
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update employee failed')
      } else {
        toast.error(error.message || 'Update employee failed')
      }
      throw error
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <Card sx={{ minWidth: 400, maxWidth: 400 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Update Password
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Current Password"
              type="password"
              {...register('currentPassword', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              error={!!errors.currentPassword}
              helperText={errors.currentPassword?.message}
            />

            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              type="password"
              {...register('newPassword', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: PASSWORD_RULE
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.type === 'required' ?
                FIELD_REQUIRED_MESSAGE :
                errors.newPassword?.type === 'pattern' ?
                  PASSWORD_RULE_MESSAGE : ''
              }
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm New Password"
              type="password"
              {...register('confirmPassword', {
                required: FIELD_REQUIRED_MESSAGE,
                validate: (value) => {
                  if (value === watch('newPassword')) return true
                  return 'Passwords do not match'
                }
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <CardActions sx={{ p: 0, mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
              >
                Update Password
              </Button>
            </CardActions>
          </Box>
        </Box>
      </Card>
    </Box>
  )
}

export default UpdatePassword
