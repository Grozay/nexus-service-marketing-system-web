import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Add from '@mui/icons-material/Add'
import Save from '@mui/icons-material/Save'
import Close from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector
} from '@mui/x-data-grid'
import { useState } from 'react'
import { connectionsPlans } from '~/apis/connections-plans'
import Chip from '@mui/material/Chip'

// Transform data from connections-plans.js to match Plans schema
const transformPlansData = (connectionsPlans) => {
  return connectionsPlans.flatMap(connection =>
    connection.plans.map(plan => ({
      id: plan.planId,
      planId: plan.planId,
      categoryId: connection.connectionId,
      planName: plan.planName,
      planDetails: plan.planDetails,
      planType: plan.planType,
      planPrice: plan.planPrice,
      planValidity: plan.planValidity,
      planLocalCallCharge: plan.planLocalCallCharge,
      planSTDCallCharge: plan.planSTDCallCharge,
      planMessagingCharge: plan.planMessagingCharge,
      planDescription: plan.planDescription,
      planIsActive: plan.planIsActive,
      slug: plan.slug
    }))
  )
}

// Usage
const initialPlans = transformPlansData(connectionsPlans)

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleAddClick = () => {
    const id = `CONN${String(initialPlans.length + 1).padStart(3, '0')}`
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: '',
        slug: '',
        plansCount: 0,
        status: 'Active',
        isNew: true
      }
    ])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add Connection Plan
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

export default function ConnectionPlanManagement() {
  const [rows, setRows] = useState(initialPlans)
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true
    }
  }

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    })

    const editedRow = rows.find((row) => row.id === id)
    if (editedRow?.isNew) {
      setRows(rows.filter((row) => row.id !== id))
    }
  }

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
    return updatedRow
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
    { field: 'planId', headerName: 'Plan ID', width: 150, editable: false },
    { field: 'planName', headerName: 'Plan Name', width: 200, editable: true },
    { field: 'planType', headerName: 'Type', width: 120, editable: true },
    { field: 'planPrice', headerName: 'Price', width: 100, type: 'number', editable: true },
    { field: 'planValidity', headerName: 'Validity', width: 120, editable: true },
    {
      field: 'planIsActive',
      headerName: 'Status',
      width: 120,
      editable: true,
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

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={id}
              icon={<Save />}
              label="Save"
              sx={{ color: 'primary.main' }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={id}
              icon={<Close />}
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
          />
        ]
      }
    }
  ]

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.planId}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel }
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
        <MenuItem onClick={() => {
          handleDeleteClick(selectedId)()
          handleCloseMenu()
        }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  )
}