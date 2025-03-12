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
import { getAllOrdersAPI, updateOrderAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'
import { useNavigate } from 'react-router-dom'
// Transform order data from API
const transformOrderData = (orders) => {
  if (!Array.isArray(orders)) return []
  return orders
    .filter(order => !order.isDeleted)
    .map(order => ({
      id: order.orderId,
      name: order.orderName,
      description: order.orderDescription,
      amount: order.orderAmount,
      status: order.orderStatus,
      plan: order.planDetails?.planName,
      employee: order.employeeDetails?.employeeName,
      store: order.storeDetails?.storeName,
      storeId: order.storeId,
      createdAt: new Date(order.orderCreatedAt),
      isActive: order.orderIsFeasible,
      accountEmail: order.accountDetails?.accountEmail,
      accountPhone: order.accountDetails?.accountPhone,
      accountAddress: order.accountDetails?.accountAddress
    }))
}

// Fetch all orders from API
const getAllOrders = async () => {
  try {
    const response = await getAllOrdersAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformOrderData(response)
  } catch (error) {
    throw new Error('Error fetching orders:', error)
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

function OrderList() {
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const navigate = useNavigate()
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()

  // Fetch orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllOrders()
        setRows(orders)
      } catch (error) {
        throw new Error(error)
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

  const handleCancelOrder = (id) => async () => {
    try {
      const { confirmed } = await confirmUpdate({
        title: 'Confirm Cancel Order',
        description: 'Are you sure you want to cancel this order?',
        confirmationText: 'Cancel Order',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateOrderAPI({
          orderId: id,
          orderStatus: 'Canceled'
        })
        setRows(rows.map((row) =>
          row.id === id ? { ...row, orderStatus: 'Canceled' } : row
        ))
        toast.success('Order canceled successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to cancel order')
    }
  }

  const handleActivateClick = (id) => async () => {
    await updateOrderAPI({ orderId: id, orderIsFeasible: true })
    toast.success('Order activated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, isActive: true } : row)))
  }

  const handleDeactivateClick = (id) => async () => {
    await updateOrderAPI({ orderId: id, orderIsFeasible: false })
    toast.success('Order deactivated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, isActive: false } : row)))
  }

  const handleViewDetail = (id) => () => {
    navigate(`/management/orders/${id}`)
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
      if (!newRow.name || !newRow.amount) {
        throw new Error('Please fill in all required fields (Name and Amount)')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, name, description, amount } = updatedRow

      // Retrieve the original row to get the storeId
      const originalRow = rows.find((row) => row.id === id)
      if (!originalRow.storeId) {
        throw new Error('Store ID is missing in the original order data')
      }

      const payload = {
        orderId: id,
        orderName: name,
        orderDescription: description,
        orderAmount: amount,
        storeId: originalRow.storeId // Include the original storeId in the payload
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this order?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateOrderAPI(payload)
        toast.success('Order updated successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      // Handle specific error messages from the backend
      if (error.message.includes('FOREIGN KEY constraint')) {
        toast.error('Update failed: Invalid store ID. Please ensure the store exists.')
      } else {
        toast.error(error.message || 'Update order failed')
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
    { field: 'id', headerName: 'Order ID', width: 200, editable: false },
    { field: 'amount', headerName: 'Amount', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 200, editable: false },
    { field: 'accountPhone', headerName: 'Account Phone', width: 200, editable: true },
    { field: 'accountAddress', headerName: 'Account Address', width: 350, editable: true },
    {
      field: 'isActive',
      headerName: 'Feasible',
      width: 150,
      editable: false,
      type: 'boolean',
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Feasible' : 'Infeasible'}
          color={params.value ? 'success' : 'error'}
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
        Order Management
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
          rows.find((row) => row.id === selectedId)?.isActive === false ? (
            <MenuItem
              onClick={() => {
                handleActivateClick(selectedId)()
                handleCloseMenu()
              }}
            >
              <DoneAllIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
              Feasible
            </MenuItem>
          ) : (
            <MenuItem
              onClick={() => {
                handleDeactivateClick(selectedId)()
                handleCloseMenu()
              }}
            >
              <BlockIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
              Infeasible
            </MenuItem>
          )
        }
        <MenuItem
          onClick={handleViewDetail(selectedId)}
        >
          <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
          View Detail
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCancelOrder(selectedId)()
            handleCloseMenu()
          }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1, color: 'error.main' }} />
          Cancel
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default OrderList
