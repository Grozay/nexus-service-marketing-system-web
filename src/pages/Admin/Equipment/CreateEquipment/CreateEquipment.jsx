import { useForm, Controller } from 'react-hook-form'
import { createEquipmentAPI, getAllVendorsAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'


const CreateEquipment = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      equipmentName: '',
      vendorId: '',
      equipmentDescription: '',
      equipmentCost: '',
      equipmentInventory: '',
      equipmentPhoto: '',
      equipmentType: '',
      equipmentStatus: ''
    }
  })

  const navigate = useNavigate()
  const [vendorList, setVendorList] = useState([])

  useEffect(() => {
    getAllVendorsAPI()
      .then(data => {
        setVendorList(data)
      })
      .catch(() => toast.error('Error fetching vendor list'))
  }, [])

  const onCreateEquipment = async (data) => {
    const { equipmentName, vendorId, equipmentDescription, equipmentCost,
      equipmentInventory, equipmentPhoto, equipmentType, equipmentStatus } = data

    const formattedData = {
      equipmentName: equipmentName.trim(),
      vendorId: Number(vendorId),
      equipmentDescription: equipmentDescription.trim(),
      equipmentCost: Number(equipmentCost),
      equipmentInventory: Number(equipmentInventory),
      equipmentPhoto: equipmentPhoto.trim(),
      equipmentType,
      equipmentStatus
    }

    await toast.promise(
      createEquipmentAPI(formattedData),
      {
        pending: 'Creating equipment...',
        success: {
          render() {
            navigate('/management/equipment/list')
            return 'Equipment created successfully!'
          }
        },
        error: {
          render({ data: error }) {
            return error?.response?.data?.title || 'Failed to create equipment'
          }
        }
      }
    ).catch(() => {})
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          component="h1"
          sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}
        >
          Create New Equipment
        </Typography>

        <form onSubmit={handleSubmit(onCreateEquipment)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Equipment Name"
                fullWidth
                variant="outlined"
                {...register('equipmentName', {
                  required: FIELD_REQUIRED_MESSAGE,
                  minLength: {
                    value: 3,
                    message: 'Equipment name must be at least 3 characters'
                  },
                  maxLength: {
                    value: 50,
                    message: 'Equipment name must be less than 50 characters'
                  }
                })}
                error={!!errors.equipmentName}
                helperText={errors.equipmentName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth error={!!errors.vendorId}>
                <InputLabel id="vendor-label">Vendor</InputLabel>
                <Controller
                  name="vendorId"
                  control={control}
                  rules={{ required: 'Please select a vendor' }}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <Select
                        {...field}
                        labelId="vendor-label"
                        label="Vendor"
                        fullWidth
                        margin="normal"
                      >
                        {vendorList.map((vendor) => (
                          <MenuItem key={vendor.vendorId} value={vendor.vendorId}>
                            {vendor.vendorName}
                          </MenuItem>
                        ))}
                      </Select>
                      {error && <Typography color="error" variant="caption">{error.message}</Typography>}
                    </>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                {...register('equipmentDescription', {
                  maxLength: {
                    value: 500,
                    message: 'Description must be less than 500 characters'
                  }
                })}
                error={!!errors.equipmentDescription}
                helperText={errors.equipmentDescription?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Cost"
                type="number"
                fullWidth
                variant="outlined"
                {...register('equipmentCost', {
                  required: FIELD_REQUIRED_MESSAGE,
                  min: {
                    value: 0,
                    message: 'Cost must be greater than or equal to 0'
                  }
                })}
                error={!!errors.equipmentCost}
                helperText={errors.equipmentCost?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Inventory"
                type="number"
                fullWidth
                variant="outlined"
                {...register('equipmentInventory', {
                  required: FIELD_REQUIRED_MESSAGE,
                  min: {
                    value: 0,
                    message: 'Inventory must be greater than or equal to 0'
                  }
                })}
                error={!!errors.equipmentInventory}
                helperText={errors.equipmentInventory?.message}
              />
            </Grid>

            {/* Uncomment and improve this if you want to handle file upload */}
            {/* <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                label="Equipment Photo"
                type="text"
                fullWidth
                variant="outlined"
                {...register('equipmentPhoto', {
                  pattern: {
                    value: /\.(jpe?g|png|gif)$/i,
                    message: 'Please provide a valid image URL (jpg, png, gif)'
                  }
                })}
                error={!!errors.equipmentPhoto}
                helperText={errors.equipmentPhoto?.message || 'Enter image URL'}
              />
            </Grid> */}

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="equipment-type-label">Type</InputLabel>
                <Controller
                  name="equipmentType"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      labelId="equipment-type-label"
                      label="Type"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      error={!!errors.equipmentType}
                    >
                      <MenuItem value="Router">Router</MenuItem>
                      <MenuItem value="Cable">Cable</MenuItem>
                      <MenuItem value="Modem">Modem</MenuItem>
                      <MenuItem value="Switch">Switch</MenuItem>
                    </Select>
                  )}
                />
                {errors.equipmentType && (
                  <Typography color="error" variant="caption">
                    {errors.equipmentType.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="equipment-status-label">Status</InputLabel>
                <Controller
                  name="equipmentStatus"
                  control={control}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      labelId="equipment-status-label"
                      label="Status"
                      {...field}
                      value={field.value || ''}
                      onChange={(e) => field.onChange(e.target.value)}
                      error={!!errors.equipmentStatus}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Available">Available</MenuItem>
                      <MenuItem value="Low Stock">Low Stock</MenuItem>
                    </Select>
                  )}
                />
                {errors.equipmentStatus && (
                  <Typography color="error" variant="caption">
                    {errors.equipmentStatus.message}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ textAlign: 'center', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{
                  px: 5,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': { bgcolor: 'primary.dark' },
                  borderRadius: 2
                }}
              >
                Create Equipment
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateEquipment