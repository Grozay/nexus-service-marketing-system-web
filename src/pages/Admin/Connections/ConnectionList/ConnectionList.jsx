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
import { getPlanListAPI } from '~/apis' // Assuming this API fetches plan list
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { updateAccountAPI } from '~/apis' // Keep for now, might need to change to plan update API
import { formatDate } from '~/utils/formatter'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Modal from '@mui/material/Modal'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'
import { useNavigate } from 'react-router-dom'
// Function to transform plan data from API
const transformPlanData = (plans) => {
  if (!Array.isArray(plans)) return []
  return plans
    .filter(plan => plan) // Assuming no isDeleted equivalent for plans, remove filter if needed
    .map(plan => ({
      id: plan.planId,
      name: plan.planName,
      type: plan.planType,
      price: plan.planPrice, // Changed from deposit to price
      validity: plan.planValidity, // Changed from Validity to validity
      status: plan.planIsActive,
      slug: plan.planSlug
    }))
}

// Fetch all plans from API
const getAllPlans = async () => {
  try {
    const response = await getPlanListAPI() // Using getPlanListAPI
    if (!Array.isArray(response)) {
      return []
    }
    return transformPlanData(response)
  } catch (error) {
    throw new Error('Error fetching plans:', error)
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

export default function ConnectionList() { // Renamed from CustomerList to ConnectionList
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()
  const [selectedPlan, setSelectedPlan] = useState(null) // Changed from selectedCustomer to selectedPlan
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const navigate = useNavigate()
  // Fetch plans on component mount
  useEffect(() => {
    const fetchData = async () => {
      const plans = await getAllPlans() // Using getAllPlans
      console.log('🚀 ~ fetchData ~ plans:', plans)
      setRows(plans)
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
        description: 'Are you sure you want to delete this plan?', // Updated description
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        // Call API to soft delete - Assuming plan API is similar to account API for delete
        await updateAccountAPI({ // Keep updateAccountAPI for now, might need to change
          accountId: id, // Assuming planId can be used as accountId for now, adjust if needed
          isDeleted: true
        })
        // Update local state
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Plan deleted successfully') // Updated message
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete plan') // Updated message
    }
  }

  //   const handleActivateClick = (id) => async () => {
  //     await activateAccountAPI({ accountId: id, accountIsActive: true }) // Keep activateAccountAPI for now, might need to change
  //     toast.success('Plan activated successfully') // Updated message
  //     setRows(rows.map((row) => (row.id === id ? { ...row, status: true } : row)))
  //   }

  //   const handleDeactivateClick = (id) => async () => {
  //     await activateAccountAPI({ accountId: id, accountIsActive: false }) // Keep deactivateAccountAPI for now, might need to change
  //     toast.success('Plan deactivated successfully') // Updated message
  //     setRows(rows.map((row) => (row.id === id ? { ...row, status: false } : row)))
  //   }

  //   const handleViewDetail = (id) => async () => {
  //     try {
  //       const plan = await getAccountByIdAPI(id) // Keep getAccountByIdAPI for now, might need to change to getPlanByIdAPI
  //       setSelectedPlan(plan) // Changed from setSelectedCustomer to setSelectedPlan
  //       setIsDetailModalOpen(true)
  //     } catch (error) {
  //       toast.error(error.message || 'Failed to fetch plan details') // Updated message
  //     }
  //   }

  const handleViewDetail = (slug) => () => {
    return () => navigate(`/management/connection-plans/${slug}`)
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
      // Validate required fields - Adjust validation based on plan fields
      if (!newRow.name || !newRow.type || !newRow.price) { // Adjusted fields based on plan data
        throw new Error('Please fill in all required fields')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, name, validity, price, type } = updatedRow // Adjusted fields based on plan data

      // Format date properly - Remove date formatting as plan data example doesn't have date
      // const formattedDOB = formatDate(dob)

      const payload = {
        planId: id,
        planName: name,
        planType: type,
        planValidity: validity,
        planPrice: price
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this plan?', // Updated description
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateAccountAPI(payload) // Keep updateAccountAPI for now, might need to change to plan update API
        toast.success('Update plan successfully') // Updated message
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update plan failed') // Updated message
      } else {
        toast.error(error.message || 'Update plan failed') // Updated message
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
    { field: 'id', headerName: 'Plan ID', width: 150, editable: false }, // Updated headerName
    { field: 'name', headerName: 'Plan Name', width: 150, editable: true }, // Updated headerName
    { field: 'type', headerName: 'Plan Type', width: 200, editable: true }, // Updated headerName
    { field: 'price', headerName: 'Price', width: 150, editable: true }, // Updated headerName and field
    { field: 'validity', headerName: 'Validity', width: 200, editable: true }, // Updated headerName and field
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
    // Removed joinDate column as plan data example doesn't have join date
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
      aria-labelledby="plan-detail-modal" // Updated aria-labelledby
      aria-describedby="plan-detail-modal-description" // Updated aria-describedby
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
        {selectedPlan && ( // Changed from selectedCustomer to selectedPlan
          <>
            <Typography variant="h6" component="h2" gutterBottom>
              Plan Details {/* Updated title */}
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
              <DetailItem label="ID" value={selectedPlan?.planId} /> {/* Updated value */}
              <DetailItem label="Name" value={selectedPlan?.planName} /> {/* Updated value */}
              <DetailItem label="Type" value={selectedPlan?.planType} /> {/* Updated value */}
              <DetailItem label="Price" value={selectedPlan?.planPrice} /> {/* Updated value */}
              <DetailItem label="Validity" value={selectedPlan?.planValidity} /> {/* Updated value */}
              {/* Removed customer specific detail items, add plan specific details if available in API response */}
              {/* Example if plan details include category: */}
              {/* <DetailItem label="Category" value={selectedPlan?.plan_Category?.categoryName} /> */}
              <DetailItem label="Status" value={selectedPlan?.planIsActive ? 'Active' : 'Inactive'} /> {/* Updated value */}
              {/* Removed Joined Date as plan data example doesn't have join date */}
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
        Connection Plan Management {/* Updated title */}
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
          rows.find((row) => row.id === selectedId)?.status === false ? (
            <MenuItem onClick={() => {
            //   handleActivateClick(selectedId)()
              handleCloseMenu()
            }}>
              <DoneAllIcon fontSize="small" sx={{ mr: 1 }} />
              Activate
            </MenuItem>
          ) : (
            <MenuItem onClick={() => {
            //   handleDeactivateClick(selectedId)()
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
          const selectedPlan = rows.find(row => row.id === selectedId)
          console.log('🚀 ~ ConnectionList ~ selectedPlan:', selectedPlan.planSlug)
          handleViewDetail(selectedPlan?.planSlug)()
        }}>
          <RemoveRedEyeIcon fontSize="small" sx={{ mr: 1 }} />
          View Detail
        </MenuItem>
      </Menu>
      {renderDetailModal()}
    </Box>
  )
}