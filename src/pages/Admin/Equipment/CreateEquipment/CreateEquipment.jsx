import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid2'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  PASSWORD_RULE,
  DOB_RULE_MESSAGE,
  DOB_RULE,
  Rule_Phone_Number_Message
} from '~/utils/validators'
import { createEquipmentAPI } from '~/apis'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { Controller } from 'react-hook-form'

const CreateEquipment = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      equipmentType: '',
      equipmentStatus: ''
    }
  })

  const navigate = useNavigate()

  const onCreateEquipment = (data) => {
    const { equipmentName, vendorId, equipmentDescription, equipmentCost,
      equipmentInventory, equipmentPhoto, equipmentType, equipmentStatus } = data
    toast.promise(
      createEquipmentAPI({ equipmentName, vendorId, equipmentDescription, equipmentCost,
        equipmentInventory, equipmentPhoto, equipmentType, equipmentStatus }), {
        pending: 'Creating equipment...'
      }
    ).then(res => {
      if (!res.error) {
        navigate('/admin/equipment/list')
      }
    })
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Create New Equipment
      </Typography>

      <form onSubmit={handleSubmit(onCreateEquipment)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              label="Equipment Name"
              fullWidth
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
            <TextField
              label="Vendor ID"
              type="number"
              fullWidth
              {...register('vendorId', { 
                required: FIELD_REQUIRED_MESSAGE,
                min: {
                  value: 1,
                  message: 'Vendor ID must be greater than 0'
                }
              })}
              error={!!errors.vendorId}
              helperText={errors.vendorId?.message}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Description"
              fullWidth
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

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              // type="file"
              fullWidth
              {...register('equipmentPhoto', {
                pattern: {
                  value: /\.(jpe?g|png|gif)$/i,
                  message: 'Please upload a valid image file (jpg, png, gif)'
                }
              })}
              error={!!errors.equipmentPhoto}
              helperText={errors.equipmentPhoto?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <FormControl fullWidth margin="dense">
              <InputLabel id="equipment-type-label">Type</InputLabel>
              <Controller
                name="equipmentType"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                defaultValue=""
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
                    <MenuItem value="VoIP Phone">VoIP Phone</MenuItem>
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
            <FormControl fullWidth margin="dense">
              <InputLabel id="equipment-status-label">Status</InputLabel>
              <Controller
                name="equipmentStatus"
                control={control}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                defaultValue="" 
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

          <Grid size={{ xs: 12 }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={Object.keys(errors).length > 0}
              >
                Create Equipment
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default CreateEquipment