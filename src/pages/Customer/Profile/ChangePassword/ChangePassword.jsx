import { Box, Button, Typography, TextField, Card, CardActions, Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Zoom } from '@mui/material'
import {
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE
} from '~/utils/validators'
import { updateAccountPasswordAPI } from '~/apis'
import { toast } from 'react-toastify'
import { selectCurrentAccount } from '~/redux/user/accountSlice'
import { useSelector, useDispatch } from 'react-redux'
import { logoutAccountApi } from '~/redux/user/accountSlice'
import { useConfirm } from 'material-ui-confirm'

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentAccount = useSelector(selectCurrentAccount)
  const userId = currentAccount?.userId
  const confirmChangePassword = useConfirm()

  // const handleChangePassword = async () => {
  //   const { confirmed } = await confirmChangePassword({
  //     title: 'Are you sure you want to change your password?',
  //     cancellationText: 'Cancel',
  //     confirmationText: 'Confirm'
  //   })

  //   if (confirmed) {
  //     toast.promise(
  //       dispatch(logoutAccountApi()), {
  //         pending: 'Logging out...'
  //       }
  //     ).then((res) => {
  //       if (!res.error) {
  //         navigate('/account/login')
  //       }
  //     })
  //   }
  // }

  const onSubmit = async (data) => {
    const { confirmed } = await confirmChangePassword({
      title: 'Are you sure you want to change your password?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })
    if (!confirmed) return
    const { oldPassword, newPassword } = data
    if (!userId) {
      toast.error('User ID is missing. Please log in again.')
      return
    }
    try {
      const payload = { userId, oldPassword, newPassword }
      toast.promise(updateAccountPasswordAPI(payload), {
        pending: 'Changing password...'
      }).then((response) => {
        if (!response.error) {
          toast.success('Password changed successfully!')
          toast.promise(dispatch(logoutAccountApi()), {
            pending: 'Logging out...'
          }).then(() => {
            navigate('/account/login')
            toast.success('Please login again!')
          })
        }
      })
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar />
      <Zoom in={true}>
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            py: 4
          }}
        >
          <Card
            sx={{
              minWidth: 400,
              maxWidth: 400,
              boxShadow: 3,
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Box sx={{ bgcolor: 'primary.main', color: 'white', p: 2 }}>
              <Typography variant="h5" align="center" fontWeight="bold">
                CHANGE YOUR PASSWORD
              </Typography>
            </Box>
            <Box sx={{ p: 3 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{ mb: 2 }}
              >
                Enter your current password and new password
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Current Password"
                  type="password"
                  variant="outlined"
                  {...register('oldPassword', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.oldPassword}
                  helperText={errors.oldPassword?.message}
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  {...register('newPassword', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: PASSWORD_RULE
                  })}
                  error={!!errors.newPassword}
                  helperText={
                    errors.newPassword?.type === 'required'
                      ? FIELD_REQUIRED_MESSAGE
                      : errors.newPassword?.type === 'pattern'
                        ? PASSWORD_RULE_MESSAGE : ''
                  }
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm New Password"
                  type="password"
                  variant="outlined"
                  {...register('confirmPassword', {
                    required: FIELD_REQUIRED_MESSAGE,
                    validate: (value) =>
                      value === watch('newPassword') || 'Passwords do not match'
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  sx={{ mb: 2 }}
                />

                <CardActions sx={{ flexDirection: 'column', gap: 2, p: 0 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{ borderRadius: 1 }}
                  >
                    CHANGE PASSWORD
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    size="large"
                    onClick={() => navigate('/account/profile')}
                    sx={{ borderRadius: 1 }}
                  >
                    Back to Profile
                  </Button>
                </CardActions>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Need help? Contact{' '}
                <Box
                  component="a"
                  href="mailto:support@example.com"
                  sx={{ color: 'primary.main', textDecoration: 'none' }}
                >
                  support@example.com
                </Box>
              </Typography>
            </Box>
          </Card>
        </Box>
      </Zoom>
      <Footer />
    </Box>
  )
}

export default ChangePassword