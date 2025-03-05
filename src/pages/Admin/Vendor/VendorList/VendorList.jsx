import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
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
import { getAllVendorsAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { updateVendorAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Modal from '@mui/material/Modal'
import { getVendorByIdAPI } from '~/apis'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'

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
      status: vendor.vendorStatus
    }))
}

// Fetch all vendors from API
const getAllVendors = async () => {
  try {
    const response = await getAllVendorsAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformVendorData(response)
  } catch (error) {
    throw new Error('Error fetching vendors:', error)
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
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()
  const [selectedVendor, setSelectedVendor] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Fetch vendors on component mount
  useEffect(() => {
    const fetchData = async () => {
      const vendors = await getAllVendors()
      setRows(vendors)
    }
    fetchData()
  }, [])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id) => () => {
    const row = rows.find((row) => row.id === id)
    setPreviousRow(row)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
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
        await updateVendorAPI({
          vendorId: id,
          isDeleted: true
        })
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Vendor deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete vendor')
    }
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

      const payload = {
        vendorId: id,
        vendorName: name,
        vendorAddress: address,
        vendorDescription: description,
        vendorPhone: phone,
        vendorEmail: email,
        vendorStartFrom: formatDate(startDate),
        vendorEndTo: formatDate(endDate),
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this vendor?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateVendorAPI(payload)
        toast.success('Update vendor successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update vendor failed')
      } else {
        toast.error(error.message || 'Update vendor failed')
      }
      throw error
    }
  }

  const handleActivateClick = (id) => async () => {
    await updateVendorAPI({ vendorId: id, vendorStatus: 'Active' })
    toast.success('Employee activated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, status: true } : row)))
  }

  const handleDeactivateClick = (id) => async () => {
    await updateVendorAPI({ vendorId: id, vendorStatus: 'Inactive' })
    toast.success('Employee deactivated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, status: false } : row)))
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

  const handleViewDetail = (id) => async () => {
    try {
      const vendor = await getVendorByIdAPI(id)
      setSelectedVendor(vendor)
      setIsDetailModalOpen(true)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch vendor details')
    }
  }

  const renderDetailModal = () => (
    <Modal
      open={isDetailModalOpen}
      onClose={() => setIsDetailModalOpen(false)}
      aria-labelledby="vendor-detail-modal"
      aria-describedby="vendor-detail-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2
      }}>
        {selectedVendor && (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Vendor Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <DetailItem label="Vendor ID" value={selectedVendor.vendorId} />
              <DetailItem label="Name" value={selectedVendor.vendorName} />
              <DetailItem label="Address" value={selectedVendor.vendorAddress} />
              <DetailItem label="Description" value={selectedVendor.vendorDescription} />
              <DetailItem label="Phone" value={selectedVendor.vendorPhone} />
              <DetailItem label="Email" value={selectedVendor.vendorEmail} />
              <DetailItem label="Start Date" value={formatDate(selectedVendor.vendorStartFrom)} />
              <DetailItem label="End Date" value={formatDate(selectedVendor.vendorEndTo)} />
              <DetailItem label="Status" value={selectedVendor.vendorStatus} />
            </Box>
          </>
        )}
      </Box>
    </Modal>
  )

  const DetailItem = ({ label, value }) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body1">
        {value || 'N/A'}
      </Typography>
    </Box>
  )

  const columns = [
    { field: 'id', headerName: 'Vendor ID', width: 150, editable: false },
    { field: 'name', headerName: 'Vendor Name', width: 200, editable: true, type: 'string' },
    { field: 'address', headerName: 'Vendor Address', width: 250, editable: true, type: 'string' },
    { field: 'description', headerName: 'Vendor Description', width: 300, editable: true, type: 'string' },
    { field: 'phone', headerName: 'Vendor Phone', width: 150, editable: true, type: 'string' },
    { field: 'email', headerName: 'Vendor Email', width: 200, editable: true, type: 'string' },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 150,
      editable: true,
      type: 'date'
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 150,
      editable: true,
      type: 'date'
    },
    {
      field: 'status',
      headerName: 'Vendor Status',
      width: 120,
      editable: false,
      type: 'string',
      renderCell: (params) => (
        <Chip
          label={params.value === 'Active' ? 'Active' : 'Inactive'}
          color={params.value === 'Active' ? 'success' : 'error'}
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
              sx={{
                color: 'primary.main'
              }}
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
        '& .actions': {
          color: 'text.secondary'
        },
        '& .textPrimary': {
          color: 'text.primary'
        }
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 3,
          fontWeight: 'bold'
        }}
      >
        Employee Management
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
        slotProps={{
          toolbar: { setRows, setRowModesModel }
        }}
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
        <MenuItem onClick={() => {
          handleEditClick(selectedId)()
          handleCloseMenu()
        }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        {
          rows.find((row) => row.id === selectedId)?.status === false ? (
            <MenuItem onClick={() => {
              handleActivateClick(selectedId)()
              handleCloseMenu()
            }}>
              <DoneAllIcon fontSize="small" sx={{ mr: 1 }} />
              Activate
            </MenuItem>
          ) : (
            <MenuItem onClick={() => {
              handleDeactivateClick(selectedId)()
              handleCloseMenu()
            }}>
              <BlockIcon fontSize="small" sx={{ mr: 1 }} />
              Deactivate
            </MenuItem>
          )
        }
        <MenuItem onClick={() => {
          handleDeleteClick(selectedId)()
          handleCloseMenu()
        }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
        <MenuItem onClick={() => {
          handleViewDetail(selectedId)()
          handleCloseMenu()
        }}>
          <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
          View Detail
        </MenuItem>
      </Menu>
      {renderDetailModal()}
    </Box>
  )
}