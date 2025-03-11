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
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import { useNavigate } from 'react-router-dom'
import { getAllFeedbacksAPI, deleteFeedbackAPI, updateFeedbackAPI } from '~/apis'

// Transform feedback data
const transformFeedbackData = (feedbacks) => {
  if (!Array.isArray(feedbacks)) return []
  return feedbacks.map(feedback => ({
    id: feedback.feedbackId,
    orderId: feedback.orderId,
    subject: feedback.feedbackSubject,
    message: feedback.feedbackMessage.substring(0, 50) + '...', // Truncate long message
    rating: feedback.feedbackRating,
    status: feedback.feedbackStatus,
    createdAt: new Date(feedback.feedbackCreatedAt),
    customerName: feedback.orderDetails.accountDetails.accountName,
    customerEmail: feedback.orderDetails.accountDetails.accountEmail
  }))
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

export default function FeedbackList() {
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
        const feedbacks = await getAllFeedbacksAPI()
        setRows(transformFeedbackData(feedbacks))
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
        description: 'Are you sure you want to delete this feedback?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await deleteFeedbackAPI(id)
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Feedback deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete feedback')
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
      if (!newRow.subject || !newRow.message) {
        throw new Error('Please fill in all required fields')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const payload = {
        feedbackId: updatedRow.id,
        feedbackSubject: updatedRow.subject,
        feedbackMessage: updatedRow.message,
        feedbackStatus: updatedRow.status
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this feedback?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateFeedbackAPI(payload)
        toast.success('Feedback updated successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      toast.error(error.message || 'Failed to update feedback')
      throw error
    }
  }

  const handleResolveClick = (id) => async () => {
    try {
      await updateFeedbackAPI({ feedbackId: id, feedbackStatus: 'Resolved' })
      toast.success('Feedback resolved successfully')
      setRows(rows.map((row) => (row.id === id ? { ...row, status: 'Resolved' } : row)))
    } catch (error) {
      toast.error(error.message || 'Failed to resolve feedback')
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
    const order = rows.find((row) => row.id === id)
    return () => navigate(`/management/feedbacks/${order.orderId}`)
  }

  const columns = [
    { field: 'orderId', headerName: 'Order ID', width: 150, editable: false },
    { field: 'subject', headerName: 'Subject', width: 300, editable: false },
    { field: 'message', headerName: 'Message', width: 350, editable: false },
    { field: 'rating', headerName: 'Rating', width: 120, editable: false },
    { field: 'customerName', headerName: 'Customer', width: 200, editable: false },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      type: 'date',
      editable: false
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={
            params.value === 'Resolved' ? 'success' :
              params.value === 'Processing' ? 'warning' :
                params.value === 'Reviewed' ? 'info' :
                  'secondary'
          }
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
        Feedback Management
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
        {['Processing', 'Reviewed'].includes(rows.find((row) => row.id === selectedId)?.status) && (
          <MenuItem
            onClick={() => {
              handleResolveClick(selectedId)()
              handleCloseMenu()
            }}
          >
            <DoneAllIcon fontSize="small" sx={{ mr: 1, color: 'success.main' }} />
            Resolve
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
