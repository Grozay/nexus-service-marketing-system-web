import { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Pagination,
  Skeleton
} from '@mui/material'
import { Edit, Delete, Visibility } from '@mui/icons-material'
import routerPhoto from '~/assets/router.png'
import cablePhoto from '~/assets/cable.jpg'
import modemPhoto from '~/assets/modem.jpg'
import switchPhoto from '~/assets/switch.jpg'
import { useForm, Controller } from 'react-hook-form'
import { getAllEquipmentsAPI, updateEquipmentAPI } from '~/apis'
import {
  FIELD_REQUIRED_MESSAGE
} from '~/utils/validators'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { Search } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const EquipmentManagement = () => {
  const navigate = useNavigate()
  const [equipment, setEquipment] = useState([])
  const [openDialog, setOpenDialog] = useState(false)
  const [currentEquipment, setCurrentEquipment] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 8
  const confirmUpdate = useConfirm()
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipment = await getAllEquipmentsAPI()
        setEquipment(equipment)
      } catch (error) {
        throw Error(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (currentEquipment) {
      setValue('equipmentName', currentEquipment.equipmentName)
      setValue('equipmentDescription', currentEquipment.equipmentDescription)
      setValue('equipmentCost', currentEquipment.equipmentCost)
      setValue('equipmentInventory', currentEquipment.equipmentInventory)
      setValue('equipmentPhoto', currentEquipment.equipmentPhoto)
      setValue('equipmentType', currentEquipment.equipmentType)
      setValue('equipmentStatus', currentEquipment.equipmentStatus)
    }
  }, [currentEquipment, setValue])

  const handleEdit = (equipment) => {
    setCurrentEquipment(equipment)
    setOpenDialog(true)
  }

  const handleViewDetail = (id) => () => {
    return () => navigate(`/management/equipment/${id}`)
  }

  const handleDelete = (id) => async () => {
    try {
      const { confirmed } = await confirmUpdate({
        title: 'Confirm Delete',
        description: 'Are you sure you want to delete this equipment?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        setEquipment(equipment.filter(e => e.equipmentId !== id))
        toast.success('Equipment deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete equipment')
    }
  }

  const handleSave = async (data) => {
    if (Object.keys(errors).length > 0) {
      setSnackbar({ open: true, message: 'Please fix all errors before saving', severity: 'error' })
      return
    }

    const updatedEquipment = {
      ...currentEquipment,
      ...data
    }

    try {
      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this equipment?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        const {
          equipmentId,
          equipmentName,
          equipmentDescription,
          vendorId,
          equipmentCost,
          equipmentInventory,
          equipmentType,
          equipmentStatus
        } = updatedEquipment

        let photo = ''
        if (equipmentType === 'Router') {
          photo = routerPhoto
        } else if (equipmentType === 'Cable') {
          photo = cablePhoto
        } else if (equipmentType === 'Modem') {
          photo = modemPhoto
        } else if (equipmentType === 'Switch') {
          photo = switchPhoto
        }

        // Send data as a flat object
        const payload = {
          equipmentId,
          equipmentName,
          equipmentDescription,
          vendorId,
          equipmentCost,
          equipmentInventory,
          equipmentType,
          equipmentStatus,
          equipmentPhoto: photo
        }

        if (!payload.equipmentName) {
          throw new Error('Equipment Name is required')
        }

        console.log('Payload being sent:', JSON.stringify(payload, null, 2))
        await updateEquipmentAPI(payload)
        setOpenDialog(false)
        toast.success('Equipment updated successfully')
      } else {
        throw new Error('Equipment update cancelled by user')
      }
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Failed to update equipment')
      } else {
        toast.error(error.message || 'Failed to update equipment')
      }
      throw error
    }
    setEquipment(equipment.map(e =>
      e.equipmentId === currentEquipment.equipmentId ? updatedEquipment : e
    ))
    setOpenDialog(false)
  }

  const filteredEquipment = equipment.filter(eq =>
    eq.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.equipmentDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    eq.equipmentType.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = filteredEquipment.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Skeleton variant="text" width={300} height={50} />
          <Skeleton variant="rectangular" width={300} height={40} />
        </Box>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 3
        }}>
          {Array.from(new Array(6)).map((_, index) => (
            <Card key={index}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
                <Skeleton variant="text" height={20} />
              </CardContent>
              <CardActions sx={{ p: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={40} />
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    )
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Equipment Management
        </Typography>
        <TextField
          label="Search Equipment"
          variant="outlined"
          size="small"
          endIcon={<Search />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 3
      }}>
        {paginatedData.map((eq) => (
          <Card key={eq.equipmentId} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image={
                eq.equipmentType === 'Router' ? routerPhoto :
                  eq.equipmentType === 'Cable' ? cablePhoto :
                    eq.equipmentType === 'Modem' ? modemPhoto :
                      eq.equipmentType === 'Switch' ? switchPhoto : ''
              }
              alt={eq.equipmentName}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {eq.equipmentName}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {eq.equipmentDescription}
              </Typography>
              <Typography variant="body2">
                Type: {eq.equipmentType}
              </Typography>
              <Typography variant="body2">
                Status: {eq.equipmentStatus}
              </Typography>
              <Typography variant="body2">
                Vendor: {eq?.vendorDetails?.vendorName}
              </Typography>
              <Typography variant="body2">
                Inventory: {eq.equipmentInventory}
              </Typography>
              <Typography variant="body2">
                Cost: ${eq.equipmentCost}
              </Typography>
            </CardContent>
            <CardActions sx={{ mt: 'auto', p: 2 }}>
              <Box sx={{ display: 'flex', width: '100%' }}>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => handleEdit(eq)}
                  sx={{ flex: 1, mr: 1 }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={handleViewDetail(eq.equipmentId)()}
                  sx={{ flex: 1 }}
                >
                  View
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(filteredEquipment.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentEquipment?.equipmentId && 'Edit Equipment'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleSave)}>
            <TextField
              margin="dense"
              label="Equipment Name"
              fullWidth
              {...register('equipmentName', {
                required: FIELD_REQUIRED_MESSAGE,
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters'
                }
              })}
              error={!!errors.equipmentName}
              helperText={errors.equipmentName?.message}
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              {...register('equipmentDescription', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.equipmentDescription}
              helperText={errors.equipmentDescription?.message}
            />
            <TextField
              margin="dense"
              label="Cost"
              type="number"
              fullWidth
              inputProps={{
                step: '0.01',
                min: '0',
                onKeyDown: (e) => {
                  if (e.key === '-') {
                    e.preventDefault()
                  }
                }
              }}
              {...register('equipmentCost', {
                required: FIELD_REQUIRED_MESSAGE,
                min: {
                  value: 0,
                  message: 'Cost must be greater than or equal to 0'
                },
                pattern: {
                  value: /^\d*\.?\d*$/,
                  message: 'Please enter a valid number'
                }
              })}
              error={!!errors.equipmentCost}
              helperText={errors.equipmentCost?.message}
            />
            <TextField
              margin="dense"
              label="Inventory"
              type="number"
              fullWidth
              inputProps={{
                step: '0.01',
                min: '0',
                onKeyDown: (e) => {
                  if (e.key === '-') {
                    e.preventDefault()
                  }
                }
              }}
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
            <FormControl fullWidth margin="dense">
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

            <FormControl fullWidth margin="dense">
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
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}

export default EquipmentManagement