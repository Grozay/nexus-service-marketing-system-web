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
import { getAllOrdersAPI, getOrderByIdAPI, updateOrderAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { formatDate } from '~/utils/formatter'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Modal from '@mui/material/Modal'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'

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
      storeId: order.storeId, // Add storeId here
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
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Fetch orders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllOrders()
        setRows(orders)
      } catch (error) {
        toast.error('Failed to fetch orders')
      }
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
        description: 'Are you sure you want to delete this order?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateOrderAPI({
          orderId: id,
          isDeleted: true
        })
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Order deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete order')
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

  const handleViewDetail = (id) => async () => {
    try {
      const order = await getOrderByIdAPI(id)
      setSelectedOrder(order)
      setIsDetailModalOpen(true)
    } catch (error) {
      toast.error(error.message || 'Failed to fetch order details')
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
    { field: 'id', headerName: 'Order ID', width: 150, editable: false },
    { field: 'name', headerName: 'Order Name', width: 200, editable: true },
    { field: 'description', headerName: 'Description', width: 250, editable: true },
    { field: 'amount', headerName: 'Amount', width: 100, editable: true, type: 'number' },
    { field: 'status', headerName: 'Status', width: 120, editable: false },
    { field: 'plan', headerName: 'Plan', width: 150, editable: false },
    { field: 'employee', headerName: 'Employee', width: 150, editable: false },
    { field: 'store', headerName: 'Store', width: 150, editable: false },
    { field: 'storeId', headerName: 'Store ID', width: 100, editable: false }, // Add this for debugging
    { field: 'accountEmail', headerName: 'Account Email', width: 200, editable: true },
    { field: 'accountPhone', headerName: 'Account Phone', width: 150, editable: true },
    { field: 'accountAddress', headerName: 'Account Address', width: 200, editable: true },
    {
      field: 'isActive',
      headerName: 'Feasible',
      width: 120,
      editable: false,
      type: 'boolean',
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Yes' : 'No'}
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

  const renderDetailModal = () => (
    <Modal
      open={isDetailModalOpen}
      onClose={() => setIsDetailModalOpen(false)}
      aria-labelledby="order-detail-modal"
      aria-describedby="order-detail-modal-description"
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
        {selectedOrder && (
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Order Details
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <DetailItem label="Order ID" value={selectedOrder?.orderId} />
              <DetailItem label="Order Name" value={selectedOrder?.orderName} />
              <DetailItem label="Description" value={selectedOrder?.orderDescription} />
              <DetailItem label="Order Amount" value={selectedOrder?.orderAmount} />
              <DetailItem label="Order Status" value={selectedOrder?.orderStatus} />
              <DetailItem label="Plan" value={selectedOrder?.planDetails?.planName} />
              <DetailItem label="Employee" value={selectedOrder?.employeeDetails?.employeeName} />
              <DetailItem label="Store" value={selectedOrder?.storeDetails?.storeName} />
              <DetailItem label="Feasible" value={selectedOrder?.orderIsFeasible ? 'Yes' : 'No'} />
              <DetailItem label="Created At" value={formatDate(selectedOrder?.orderCreatedAt)} />
              <DetailItem label="Account Email" value={selectedOrder?.accountDetails?.accountEmail} />
              <DetailItem label="Account Phone" value={selectedOrder?.accountDetails?.accountPhone} />
              <DetailItem label="Account Address" value={selectedOrder?.accountDetails?.accountAddress} />
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
        <MenuItem onClick={() => {
          handleEditClick(selectedId)()
          handleCloseMenu()
        }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        {
          rows.find((row) => row.id === selectedId)?.isActive === false ? (
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

export default OrderList
