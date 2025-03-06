import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import { useForm } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { createRetailShopAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateRetailShop = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onCreateStore = (data) => {
    const { storeName, storeAddress, storeCity, storePhone, storeLatitude, storeLongitude, storeOpenAt, storeCloseAt, storeStatus } = data
    toast.promise(
      createRetailShopAPI({
        storeName,
        storeAddress,
        storeCity,
        storePhone,
        storeLatitude,
        storeLongitude,
        storeOpenAt,
        storeCloseAt,
        storeStatus
      }), {
        pending: 'Creating store...'
      }
    ).then(res => {
      if (!res.error) {
        navigate('/management/retail-shop')
      }
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Retail Shop
      </Typography>

      <form onSubmit={handleSubmit(onCreateStore)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Store Name"
              fullWidth
              {...register('storeName', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeName}
              helperText={errors.storeName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Address"
              fullWidth
              {...register('storeAddress', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeAddress}
              helperText={errors.storeAddress?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="City"
              fullWidth
              {...register('storeCity', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeCity}
              helperText={errors.storeCity?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Phone Number"
              fullWidth
              {...register('storePhone', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storePhone}
              helperText={errors.storePhone?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Latitude"
              fullWidth
              {...register('storeLatitude', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeLatitude}
              helperText={errors.storeLatitude?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Longitude"
              fullWidth
              {...register('storeLongitude', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeLongitude}
              helperText={errors.storeLongitude?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Open At"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('storeOpenAt', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeOpenAt}
              helperText={errors.storeOpenAt?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Close At"
              type="time"
              fullWidth
              InputLabelProps={{ shrink: true }}
              {...register('storeCloseAt', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeCloseAt}
              helperText={errors.storeCloseAt?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              select
              label="Status"
              fullWidth
              {...register('storeStatus', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.storeStatus}
              helperText={errors.storeStatus?.message}
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
                Create Retail Shop
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateRetailShop