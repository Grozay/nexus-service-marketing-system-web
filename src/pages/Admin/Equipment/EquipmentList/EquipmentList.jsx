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
import image from '~/assets/equipment1.png'
import { useForm, Controller } from 'react-hook-form'
import { getAllEquipmentsAPI, updateEquipmentAPI } from '~/apis'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  DOB_RULE,
  DOB_RULE_MESSAGE
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
  const itemsPerPage = 6
  const confirmUpdate = useConfirm()
  const { register, handleSubmit, formState: { errors }, setValue, control } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipment = await getAllEquipmentsAPI()
        setEquipment(equipment)
      } catch (error) {
        toast.error('Failed to fetch equipment data')
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

  const handleDelete = (id) => {
    setEquipment(equipment.filter(e => e.equipmentId !== id))
    setSnackbar({ open: true, message: 'Equipment deleted successfully', severity: 'success' })
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
        const { equipmentId, equipmentName, equipmentDescription, vendorId, equipmentCost, equipmentInventory, equipmentPhoto, equipmentType, equipmentStatus } = updatedEquipment
        await updateEquipmentAPI({
          equipmentId,
          equipmentName,
          equipmentDescription,
          vendorId,
          equipmentCost,
          equipmentInventory,
          equipmentPhoto,
          equipmentType,
          equipmentStatus
        })
        setOpenDialog(false)
        toast.success('Update equipment successfully')
      } else {
        throw new Error('Update equipment cancelled by user')
      }
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update equipment failed')
      } else {
        toast.error(error.message || 'Update equipment failed')
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
              // image={eq.equipmentPhoto}
              image={image}
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
                  startIcon={<Delete />}
                  color="error"
                  onClick={() => handleDelete(eq.equipmentId)}
                  sx={{ flex: 1 }}
                >
                  Delete
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
                  // Prevent negative sign input
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
                  value: /^\d*\.?\d*$/, // Only allow numbers and decimal points
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
                  // Prevent negative sign input
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
            <TextField
              margin="dense"
              label="Photo URL"
              // type='file'
              fullWidth
              {...register('equipmentPhoto', { required: FIELD_REQUIRED_MESSAGE })}
              error={!!errors.equipmentPhoto}
              helperText={errors.equipmentPhoto?.message}
            />
            <FormControl fullWidth margin="dense">
              <InputLabel id="equipment-type-label">Type</InputLabel>
              <Controller
                name="equipmentType"
                control={control} // control từ useForm
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field }) => (
                  <Select
                    labelId="equipment-type-label"
                    label="Type"
                    {...field}
                    value={field.value || ''} // Giá trị mặc định là chuỗi rỗng nếu không có
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
                    value={field.value || ''} // Giá trị mặc định là chuỗi rỗng nếu không có
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