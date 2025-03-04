import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createAccountAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import MenuItem from '@mui/material/MenuItem'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  DOB_RULE,
  DOB_RULE_MESSAGE
} from '~/utils/validators'

const CreateCustomer = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    const { customerId, customerName, customerEmail, customerPhone, customerAddress, cityCodeId, customerDOB, customerGender } = data
    toast.promise(
      createAccountAPI({ customerId, customerName, customerEmail, customerPhone, customerAddress, cityCodeId, customerDOB, customerGender }), {
        pending: 'Creating customer...'
      }
    ).then(res => {
      if (!res.error) {
        navigate('/admin/customer/list')
      }
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 'bold' }}>
        Create New Customer
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Customer ID"
              fullWidth
              {...register('customerId', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.customerId}
              helperText={errors.customerId?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Full Name"
              fullWidth
              {...register('customerName', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.customerName}
              helperText={errors.customerName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register('customerEmail', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
              error={!!errors.customerEmail}
              helperText={errors.customerEmail?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone"
              fullWidth
              {...register('customerPhone', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.customerPhone}
              helperText={errors.customerPhone?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Address"
              fullWidth
              multiline
              rows={3}
              {...register('customerAddress', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.customerAddress}
              helperText={errors.customerAddress?.message}
            />
          </Grid>

          {/* <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Category"
              fullWidth
              select
              {...register('categoryId', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.categoryId}
              helperText={errors.categoryId?.message}
            >
              <MenuItem value="1">VIP</MenuItem>
              <MenuItem value="2">Normal</MenuItem>
            </TextField>
          </Grid> */}

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="City"
              fullWidth
              select
              {...register('cityCodeId', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.cityCodeId}
              helperText={errors.cityCodeId?.message}
            >
              <MenuItem value="HCM">Ho Chi Minh</MenuItem>
              <MenuItem value="HNN">Ha Noi</MenuItem>
              <MenuItem value="DAD">Da Nang</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label=""
              type="date"
              fullWidth
              {...register('employeeDOB', {
                required: FIELD_REQUIRED_MESSAGE,
                validate: {
                  validDate: (value) => DOB_RULE(value) || DOB_RULE_MESSAGE
                }
              })}
              error={!!errors.employeeDOB}
              helperText={errors.employeeDOB?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Gender"
              fullWidth
              select
              {...register('accountGender', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.accountGender}
              helperText={errors.accountGender?.message}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
            //   disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              Create Customer
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateCustomer