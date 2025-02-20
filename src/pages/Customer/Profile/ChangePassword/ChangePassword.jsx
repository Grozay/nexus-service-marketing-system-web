import React from 'react'
import { Box, Button, Typography, TextField, Card, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Zoom } from '@mui/material'
import {
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE
} from '~/utils/validators'

const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm()

  const onSubmit = (data) => {
    console.log('Password changed:', data)
    // Handle password change logic here
  }

  return (
    <Box>
      <AppBar />
      <Zoom in={true}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
          <Card sx={{ minWidth: 380, maxWidth: 380 }}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" align="center" gutterBottom>
              Change Password
              </Typography>

              <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Current Password"
                  type="password"
                  {...register('currentPassword', { required: FIELD_REQUIRED_MESSAGE })}
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
                  Change Password
                  </Button>
                </CardActions>
              </Box>
            </Box>
          </Card>
        </Box>
      </Zoom>

      <Footer />
    </Box>
  )
}

export default ChangePassword