// TrungQuanDev: https://youtube.com/@trungquandev
import React from 'react'
import { TextField, Button, Box, Typography, Card as MuiCard, CardActions } from '@mui/material'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'
import Zoom from '@mui/material/Zoom'

const CreateAccount = ({ onNext, setAccountData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const handleCreateAccount = (data) => {
    setAccountData(data)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(handleCreateAccount)}>
      <Box sx={{
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
        gap: 1
      }}>
        <Typography variant="h4">Create Account</Typography>
      </Box>
      <Box sx={{ padding: '0 1em 1em 1em' }}>
        <Box sx={{ marginTop: '1em' }}>
          <TextField
            autoFocus
            fullWidth
            label="Full Name"
            variant="outlined"
            {...register('fullName', { required: FIELD_REQUIRED_MESSAGE })}
            error={!!errors.fullName}
            helperText={errors.fullName?.type === 'required' ? FIELD_REQUIRED_MESSAGE : ''}
          />
        </Box>
        <Box sx={{ marginTop: '1em' }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            {...register('email', { required: FIELD_REQUIRED_MESSAGE, pattern: EMAIL_RULE })}
            error={!!errors.email}
            helperText={errors.email?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.email?.type === 'pattern' ? EMAIL_RULE_MESSAGE : ''}
          />
        </Box>
        <Box sx={{ marginTop: '1em' }}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            {...register('phone', { required: FIELD_REQUIRED_MESSAGE })}
            error={!!errors.phone}
            helperText={errors.phone?.type === 'required' ? FIELD_REQUIRED_MESSAGE : ''}
          />
        </Box>
        <Box sx={{ marginTop: '1em' }}>
          <TextField
            fullWidth
            label="Address"
            variant="outlined"
            multiline
            rows={3}
            {...register('address', { required: FIELD_REQUIRED_MESSAGE })}
            error={!!errors.address}
            helperText={errors.address?.type === 'required' ? FIELD_REQUIRED_MESSAGE : ''}
          />
        </Box>
      </Box>
      <CardActions sx={{ padding: '0 1em 1em 1em' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
              Next
        </Button>
      </CardActions>
    </form>
  )
}

export default CreateAccount
