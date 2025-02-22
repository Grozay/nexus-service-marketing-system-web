import React, { useState } from 'react'
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
  Pagination
} from '@mui/material'
import { Add, Edit, Delete } from '@mui/icons-material'
import { Vendors } from '~/apis/mock-data'
import image from '~/assets/equipment1.png'

// Mock data for equipment
const initialEquipment = [
  {
    equipmentId: 'EQP001',
    vendorId: 1,
    equipmentName: 'Router A',
    equipmentDescription: 'High-speed Wi-Fi router',
    equipmentCost: 149.99,
    equipmentInventory: 10,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-10-01'),
    equipmentStatus: 'Active'
  },
  {
    equipmentId: 'EQP002',
    vendorId: 1,
    equipmentName: 'Modem B',
    equipmentDescription: 'ADSL2+ Modem',
    equipmentCost: 89.99,
    equipmentInventory: 5,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-09-15'),
    equipmentStatus: 'Inactive'
  },
  {
    equipmentId: 'EQP003',
    vendorId: 2,
    equipmentName: 'Switch C',
    equipmentDescription: '10-port Gigabit switch',
    equipmentCost: 49.99,
    equipmentInventory: 15,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-08-20'),
    equipmentStatus: 'Active'
  },
  {
    equipmentId: 'EQP004',
    vendorId: 3,
    equipmentName: 'Router D',
    equipmentDescription: 'High-speed Wi-Fi router',
    equipmentCost: 199.99,
    equipmentInventory: 8,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-07-10'),
    equipmentStatus: 'Inactive'
  },
  {
    equipmentId: 'EQP005',
    vendorId: 4,
    equipmentName: 'Router E',
    equipmentDescription: 'High-speed Wi-Fi router',
    equipmentCost: 199.99,
    equipmentInventory: 8,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-07-10'),
    equipmentStatus: 'Inactive'
  },
  {
    equipmentId: 'EQP006',
    vendorId: 5,
    equipmentName: 'Router F',
    equipmentDescription: 'High-speed Wi-Fi router',
    equipmentCost: 199.99,
    equipmentInventory: 8,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-07-10'),
    equipmentStatus: 'Inactive'
  },
  {
    equipmentId: 'EQP007',
    vendorId: 6,
    equipmentName: 'Router G',
    equipmentDescription: 'High-speed Wi-Fi router',
    equipmentCost: 199.99,
    equipmentInventory: 8,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-07-10'),
    equipmentStatus: 'Inactive'
  },
  {
    equipmentId: 'EQP008',
    vendorId: 7,
    equipmentName: 'Router H',
    equipmentDescription: 'High-speed Wi-Fi router',
    equipmentCost: 199.99,
    equipmentInventory: 8,
    equipmentPhoto: image,
    equipmentType: 'Network',
    equipmentCreatedAt: new Date('2023-07-10'),
    equipmentStatus: 'Inactive'
  }
]

const EquipmentManagement = () => {
  const [equipment, setEquipment] = useState(initialEquipment)
  const [openDialog, setOpenDialog] = useState(false)
  const [currentEquipment, setCurrentEquipment] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })
  const [page, setPage] = useState(1)
  const itemsPerPage = 6

  const handleAdd = () => {
    setCurrentEquipment({
      equipmentId: '',
      vendorId: '',
      equipmentName: '',
      equipmentDescription: '',
      equipmentCost: 0,
      equipmentInventory: 0,
      equipmentPhoto: '',
      equipmentType: '',
      equipmentStatus: 'Active'
    })
    setOpenDialog(true)
  }

  const handleEdit = (equipment) => {
    setCurrentEquipment(equipment)
    setOpenDialog(true)
  }

  const handleDelete = (id) => {
    setEquipment(equipment.filter(e => e.equipmentId !== id))
    setSnackbar({ open: true, message: 'Equipment deleted successfully', severity: 'success' })
  }

  const handleSave = () => {
    if (currentEquipment.equipmentId) {
      // Update existing equipment
      setEquipment(equipment.map(e =>
        e.equipmentId === currentEquipment.equipmentId ? currentEquipment : e
      ))
    } else {
      // Add new equipment
      const newId = `EQP${String(equipment.length + 1).padStart(3, '0')}`
      setEquipment([...equipment, { ...currentEquipment, equipmentId: newId }])
    }
    setOpenDialog(false)
    setSnackbar({ open: true, message: 'Equipment saved successfully', severity: 'success' })
  }

  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedData = equipment.slice(startIndex, endIndex)

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Equipment Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={handleAdd}
        sx={{ mb: 3 }}
      >
        Add Equipment
      </Button>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 3
      }}>
        {paginatedData.map((eq) => (
          <Card key={eq.equipmentId}>
            <CardMedia
              component="img"
              height="200"
              image={eq.equipmentPhoto}
              alt={eq.equipmentName}
            />
            <CardContent>
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
                Inventory: {eq.equipmentInventory}
              </Typography>
              <Typography variant="body2">
                Cost: ${eq.equipmentCost.toFixed(2)}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                startIcon={<Edit />}
                onClick={() => handleEdit(eq)}
              >
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<Delete />}
                color="error"
                onClick={() => handleDelete(eq.equipmentId)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={Math.ceil(equipment.length / itemsPerPage)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentEquipment?.equipmentId ? 'Edit Equipment' : 'Add Equipment'}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Equipment Name"
            fullWidth
            value={currentEquipment?.equipmentName || ''}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentName: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={currentEquipment?.equipmentDescription || ''}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentDescription: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Cost"
            type="number"
            fullWidth
            value={currentEquipment?.equipmentCost || 0}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentCost: parseFloat(e.target.value)
            })}
          />
          <TextField
            margin="dense"
            label="Inventory"
            type="number"
            fullWidth
            value={currentEquipment?.equipmentInventory || 0}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentInventory: parseInt(e.target.value)
            })}
          />
          <TextField
            margin="dense"
            label="Photo URL"
            fullWidth
            value={currentEquipment?.equipmentPhoto || ''}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentPhoto: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Type"
            fullWidth
            value={currentEquipment?.equipmentType || ''}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentType: e.target.value
            })}
          />
          <TextField
            margin="dense"
            label="Status"
            select
            fullWidth
            value={currentEquipment?.equipmentStatus || 'Active'}
            onChange={(e) => setCurrentEquipment({
              ...currentEquipment,
              equipmentStatus: e.target.value
            })}
            SelectProps={{
              native: true
            }}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
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