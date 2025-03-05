import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE
} from '~/utils/validators'
import { createVendorAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateVendor = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      vendorStatus: 'Active' // Đặt giá trị mặc định là 'Active'
    }
  })
  const navigate = useNavigate()

  const onCreateVendor = (data) => {
    const { vendorName, vendorAddress, vendorDescription, vendorPhone, vendorEmail, vendorStartFrom, vendorEndTo, vendorStatus } = data
    toast.promise(
      createVendorAPI({
        vendorName,
        vendorAddress,
        vendorDescription,
        vendorPhone,
        vendorEmail,
        vendorStartFrom,
        vendorEndTo,
        vendorStatus
      }), {
        pending: 'Creating vendor...'
      }
    ).then(res => {
      if (!res.error) {
        navigate('/admin/vendor')
      }
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Vendor
      </Typography>

      <form onSubmit={handleSubmit(onCreateVendor)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Vendor Name"
              fullWidth
              {...register('vendorName', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorName}
              helperText={errors.vendorName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Address"
              fullWidth
              {...register('vendorAddress', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorAddress}
              helperText={errors.vendorAddress?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              {...register('vendorDescription', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorDescription}
              helperText={errors.vendorDescription?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone Number"
              fullWidth
              {...register('vendorPhone', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorPhone}
              helperText={errors.vendorPhone?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Email"
              type="text"
              fullWidth
              {...register('vendorEmail', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: EMAIL_RULE,
                  message: EMAIL_RULE_MESSAGE
                }
              })}
              error={!!errors.vendorEmail}
              helperText={errors.vendorEmail?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Start Date"
              type="date"
              fullWidth
              {...register('vendorStartFrom', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorStartFrom}
              helperText={errors.vendorStartFrom?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="End Date"
              type="date"
              fullWidth
              {...register('vendorEndTo', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorEndTo}
              helperText={errors.vendorEndTo?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              select
              label="Status"
              fullWidth
              value={control._formValues.vendorStatus || 'Active'}
              {...register('vendorStatus', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.vendorStatus}
              helperText={errors.vendorStatus?.message}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
              >
                Create Vendor
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateVendor