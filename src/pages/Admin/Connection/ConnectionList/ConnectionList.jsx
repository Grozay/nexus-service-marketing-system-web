import Box from '@mui/material/Box'
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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import { useNavigate } from 'react-router-dom'
import { getAllConnectionsAPI, updateStatusConnectionAPI } from '~/apis'

// Transform connection data from API
const transformConnectionData = (connections) => {
  if (!Array.isArray(connections)) return []
  return connections.map(connection => ({
    id: connection.connectionId,
    name: connection.connectionName,
    employeeId: connection.employeeId,
    orderId: connection.orderId,
    description: connection.connectionDescription || '',
    status: connection.connectionStatus || 'Pending',
    createdAt: new Date(connection.connectionCreatedAt),
    orderName: connection.orderDetails?.orderName || '',
    accountName: connection.orderDetails?.accountDetails?.accountName || '',
    storeName: connection.orderDetails?.storeDetails?.storeName || ''
  }))
}

// Fetch all connections from API
const getAllConnections = async () => {
  try {
    const response = await getAllConnectionsAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformConnectionData(response)
  } catch (error) {
    throw new Error('Error fetching connections:', error)
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

function ConnectionList() {
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const connections = await getAllConnections()
        setRows(connections)
      } catch (error) {
        toast.error(error.message || 'Error fetching connections')
      }
    }
    fetchData()
  }, [])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  // const handleEditClick = (id) => () => {
  //   const row = rows.find((row) => row.id === id)
  //   setPreviousRow(row)
  //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  // }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
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

  const handleActivateClick = (id) => async () => {
    try {
      await updateStatusConnectionAPI({ connectionId: id, connectionStatus: 'Connected' })
      toast.success('Connection activated successfully')
      setRows(rows.map((row) => (row.id === id ? { ...row, status: 'Connected' } : row)))
    } catch (error) {
      toast.error(error.message || 'Failed to activate connection')
    }
  }

  const handleDeactivateClick = (id) => async () => {
    try {
      await updateStatusConnectionAPI({ connectionId: id, connectionStatus: 'Pending' })
      toast.success('Connection deactivated successfully')
      setRows(rows.map((row) => (row.id === id ? { ...row, status: 'Pending' } : row)))
    } catch (error) {
      toast.error(error.message || 'Failed to deactivate connection')
    }
  }

  const handleViewDetail = (id) => () => {
    navigate(`/management/connection/${id}`)
  }

  const processRowUpdate = async (newRow) => {
    try {
      if (!newRow.name) {
        throw new Error('Connection name is required')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      // const { id, name, description } = updatedRow

      // const payload = {
      //   connectionId: id,
      //   connectionName: name,
      //   connectionDescription: description
      // }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this connection?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        // await updateConnectionAPI(payload)
        toast.success('Connection updated successfully')
        return updatedRow
      } else {
        throw new Error('Update cancelled by user')
      }
    } catch (error) {
      toast.error(error.message || 'Update connection failed')
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
    { field: 'id', headerName: 'Connection ID', width: 150, editable: false },
    { field: 'orderId', headerName: 'Order ID', width: 200, editable: false },
    { field: 'orderName', headerName: 'Order Name', width: 250, editable: false },
    { field: 'accountName', headerName: 'Account Name', width: 250, editable: false },
    { field: 'storeName', headerName: 'Store Name', width: 250, editable: false },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      editable: false,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Connected' ? 'success' :
              params.value === 'Pending' ? 'warning' : 'default'
          }
          variant="outlined"
          size="small"
        />
      )
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      editable: false,
      type: 'date'
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
        Connection Management
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
        {rows.find((row) => row.id === selectedId)?.status === 'Pending' ? (
          <MenuItem
            onClick={() => {
              handleActivateClick(selectedId)()
              handleCloseMenu()
            }}
          >
            <CheckCircleOutlineIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
            Connected
          </MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              handleDeactivateClick(selectedId)()
              handleCloseMenu()
            }}
          >
            <PendingActionsIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
            Pending
          </MenuItem>
        )}
        <MenuItem onClick={handleViewDetail(selectedId)}>
          <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          View Detail
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default ConnectionList