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
import { getAllAccountsAPI, activateAccountAPI, deleteAccountAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { updateAccountAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'
import { useNavigate } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'

// Function to transform customer data from API
const transformCustomerData = (customers) => {
  if (!Array.isArray(customers)) return []
  return customers
    .filter(customer => !customer.isDeleted)
    .map(customer => ({
      id: customer.accountId,
      name: customer.accountName,
      email: customer.accountEmail,
      phone: customer.accountPhone,
      address: customer.accountAddress,
      status: customer.accountIsActive,
      joinDate: new Date(customer.accountCreatedAt),
      dob: new Date(customer.accountDOB)
    }))
}

// Fetch all customers from API
const getAllCustomers = async () => {
  try {
    const response = await getAllAccountsAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformCustomerData(response)
  } catch (error) {
    throw new Error('Error fetching customers:', error)
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

export default function CustomerList() {
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()
  const navigate = useNavigate()
  // Fetch customers on component mount
  useEffect(() => {
    const fetchData = async () => {
      const customers = await getAllCustomers()
      setRows(customers)
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
        description: 'Are you sure you want to delete this customer?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        // Call API to soft delete
        await deleteAccountAPI(id)
        // Update local state
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Customer deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete customer')
    }
  }

  const handleActivateClick = (id) => async () => {
    await activateAccountAPI({ accountId: id, accountIsActive: true })
    toast.success('Customer activated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, status: true } : row)))
  }

  const handleDeactivateClick = (id) => async () => {
    await activateAccountAPI({ accountId: id, accountIsActive: false })
    toast.success('Customer deactivated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, status: false } : row)))
  }

  const handleViewDetail = (id) => () => {
    return () => navigate(`/management/customer/${id}`)
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
      // Validate required fields
      if (!newRow.name || !newRow.email || !newRow.phone) {
        throw new Error('Please fill in all required fields')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, name, address, dob, phone, email } = updatedRow

      // Format date properly
      const formattedDOB = formatDate(dob)

      const payload = {
        accountId: id,
        accountName: name,
        accountAddress: address,
        accountDOB: formattedDOB,
        accountPhone: phone,
        accountEmail: email
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this customer?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateAccountAPI(payload)
        toast.success('Update customer successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update customer failed')
      } else {
        toast.error(error.message || 'Update customer failed')
      }
      throw error
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

  const columns = [
    { field: 'id', headerName: 'Customer ID', width: 150, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 200, editable: false },
    { field: 'phone', headerName: 'Phone', width: 150, editable: false },
    { field: 'address', headerName: 'Address', width: 200, editable: false },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
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
        Customer Management
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row?.id || Math.random().toString(36).slice(2, 11)}
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
        {
          rows.find((row) => row.id === selectedId)?.status === false ? (
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
          )
        }
        <MenuItem
          onClick={handleViewDetail(selectedId)()}
        >
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