import Box from '@mui/material/Box'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useState, useEffect } from 'react'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid'
import { getAllVendorsAPI, updateVendorAPI, deleteVendorAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { formatDate } from '~/utils/formatter'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
// Function to transform vendor data from API
const transformVendorData = (vendors) => {
  if (!Array.isArray(vendors)) return []
  return vendors
    .filter(vendor => !vendor.isDeleted)
    .map(vendor => ({
      id: vendor.vendorId,
      name: vendor.vendorName,
      address: vendor.vendorAddress,
      description: vendor.vendorDescription,
      phone: vendor.vendorPhone,
      email: vendor.vendorEmail,
      startDate: new Date(vendor.vendorStartFrom),
      endDate: new Date(vendor.vendorEndTo),
      status: vendor.vendorStatus === 'Active'
    }))
}

// Fetch all vendors from API
const getAllVendors = async () => {
  try {
    const response = await getAllVendorsAPI()
    return transformVendorData(response)
  } catch (error) {
    throw new Error('Error fetching vendors: ' + error.message)
  }
}

function EditToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default function VendorList() {
  const navigate = useNavigate()
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vendors = await getAllVendors()
        setRows(vendors)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchData()
  }, [])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => async () => {
    try {
      const { confirmed } = await confirmUpdate({
        title: 'Confirm Delete',
        description: 'Are you sure you want to delete this vendor?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await deleteVendorAPI(id)
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Vendor deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete vendor')
    }
  }

  const handleEditClick = (id) => () => {
    const row = rows.find((row) => row.id === id)
    setPreviousRow(row)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    } else {
      setRows(rows.map((row) => (row.id === id ? previousRow : row)))
    }
    setPreviousRow(null)
  }

  const processRowUpdate = async (newRow) => {
    try {
      if (!newRow.name || !newRow.email || !newRow.phone) {
        throw new Error('Please fill in all required fields')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, name, address, description, phone, email, startDate, endDate } = updatedRow

      if (phone.length !== 10) {
        throw new Error('Phone number must be 10 digits')
      }
      const payload = {
        vendorId: id,
        vendorName: name,
        vendorAddress: address,
        vendorDescription: description,
        vendorPhone: phone,
        vendorEmail: email,
        vendorStartFrom: formatDate(startDate),
        vendorEndTo: formatDate(endDate),
        vendorStatus: updatedRow.status ? 'Active' : 'Inactive'
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this vendor?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateVendorAPI(payload)
        toast.success('Vendor updated successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      toast.error(error.message || 'Failed to update vendor')
      throw error
    }
  }

  const handleActivateClick = (id) => async () => {
    try {
      await updateVendorAPI({ vendorId: id, vendorStatus: 'Active' })
      toast.success('Vendor activated successfully')
      setRows(rows.map((row) => (row.id === id ? { ...row, status: true } : row)))
    } catch (error) {
      toast.error(error.message || 'Failed to activate vendor')
    }
  }

  const handleDeactivateClick = (id) => async () => {
    try {
      await updateVendorAPI({ vendorId: id, vendorStatus: 'Inactive' })
      toast.success('Vendor deactivated successfully')
      setRows(rows.map((row) => (row.id === id ? { ...row, status: false } : row)))
    } catch (error) {
      toast.error(error.message || 'Failed to deactivate vendor')
    }
  }

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel)
  }

  const handleMoreClick = (id) => (event) => {
    setAnchorEl(event.currentTarget)
    setSelectedId(id)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
    setSelectedId(null)
  }

  const handleViewDetail = (id) => () => {
    return () => navigate(`/management/vendor/${id}`)
  }

  const columns = [
    { field: 'name', headerName: 'Name', width: 250, editable: true },
    { field: 'address', headerName: 'Address', width: 300, editable: true },
    { field: 'phone', headerName: 'Phone', width: 200, editable: true },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 250,
      editable: false,
      type: 'date'
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 250,
      editable: true,
      type: 'date'
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false,
      type: 'boolean',
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'error'}
          variant="outlined"
          size="small"
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit
        const isAnyRowInEditMode = Object.values(rowModesModel).some(
          (model) => model.mode === GridRowModes.Edit
        )

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />
          ]
        }

        return [
          <GridActionsCellItem
            key={id}
            icon={<MoreHorizIcon />}
            label="More"
            className="textPrimary"
            onClick={handleMoreClick(id)}
            color="inherit"
            disabled={isAnyRowInEditMode}
          />
        ]
      }
    }
  ]

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        p: 3,
        '& .actions': { color: 'text.secondary' },
        '& .textPrimary': { color: 'text.primary' }
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 3, fontWeight: 'bold' }}
      >
        Vendor Management
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{ toolbar: { setRows, setRowModesModel } }}
        sx={{
          height: 'calc(100vh - 200px)',
          boxShadow: 2,
          border: 1,
          borderColor: 'divider',
          borderRadius: 2
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            handleEditClick(selectedId)()
            handleCloseMenu()
          }}
        >
          <EditIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
            Edit
        </MenuItem>
        {rows.find((row) => row.id === selectedId)?.status === false ? (
          <MenuItem
            onClick={() => {
              handleActivateClick(selectedId)()
              handleCloseMenu()
            }}
          >
            <DoneAllIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
            Activate
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleDeactivateClick(selectedId)()
              handleCloseMenu()
            }}
          >
            <BlockIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
            Deactivate
          </MenuItem>
        )}
        <MenuItem onClick={handleViewDetail(selectedId)()}>
          <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          View Detail
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleDeleteClick(selectedId)()
            handleCloseMenu()
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}