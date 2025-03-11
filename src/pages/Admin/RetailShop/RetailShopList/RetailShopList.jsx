import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
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
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { getAllRetailShopsAPI, updateRetailShopAPI, deleteRetailShopAPI } from '~/apis'
import Chip from '@mui/material/Chip'
import { useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'
// Function to transform store data from API
const transformStoreData = (stores) => {
  if (!Array.isArray(stores)) return []
  return stores
    .filter(store => store.storeStatus !== 'Deleted')
    .map(store => ({
      id: store.storeId,
      storeName: store.storeName,
      storeAddress: store.storeAddress,
      storeCity: store.storeCity,
      storePhone: store.storePhone,
      storeLatitude: store.storeLatitude,
      storeLongitude: store.storeLongitude,
      storeOpenHours: `${store.storeOpenAt} - ${store.storeCloseAt}`,
      storeStatus: store.storeStatus === 'Active'
    }))
}

// Fetch all stores from API
const getAllStores = async () => {
  try {
    const response = await getAllRetailShopsAPI()
    return transformStoreData(response)
  } catch (error) {
    throw new Error('Error fetching stores:', error)
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

export default function RetailShopManagement() {
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
        const stores = await getAllStores()
        setRows(stores)
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

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } })
  }

  const handleDeleteClick = (id) => async () => {
    try {
      const { confirmed } = await confirmUpdate({
        title: 'Confirm Delete',
        description: 'Are you sure you want to delete this store?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await deleteRetailShopAPI(id)
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Store deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete store')
    }
  }

  const handleEditClick = (id) => () => {
    const row = rows.find((row) => row.id === id)
    setPreviousRow(row)
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } })
  }

  const handleActivateClick = (id) => async () => {
    await updateRetailShopAPI({ storeId: id, storeStatus: 'Active' })
    toast.success('Store activated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, storeStatus: true } : row)))
  }

  const handleDeactivateClick = (id) => async () => {
    await updateRetailShopAPI({ storeId: id, storeStatus: 'Inactive' })
    toast.success('Store deactivated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, storeStatus: false } : row)))
  }

  const handleViewDetail = (id) => () => {
    return () => navigate(`/management/retail-shop/${id}`)
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
      if (!newRow.storeName || !newRow.storeAddress || !newRow.storePhone) {
        throw new Error('Please fill in all required fields')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, storeName, storeAddress, storeCity, storePhone } = updatedRow
      const [storeOpenAt, storeCloseAt] = updatedRow.storeOpenHours.split(' - ')

      const payload = {
        storeId: id,
        storeName,
        storeAddress,
        storeCity,
        storePhone,
        storeOpenAt,
        storeCloseAt
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this store?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateRetailShopAPI(payload)
        toast.success('Store updated successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      toast.error(error.message || 'Failed to update store')
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
    { field: 'storeName', headerName: 'Name', width: 250, editable: true },
    { field: 'storeAddress', headerName: 'Address', width: 300, editable: true },
    { field: 'storeCity', headerName: 'City', width: 250, editable: true },
    { field: 'storePhone', headerName: 'Phone', width: 200, editable: true },
    { field: 'storeOpenHours', headerName: 'Open Hours', width: 250, editable: true },
    {
      field: 'storeStatus',
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
        Retail Shop Management
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Retail Shops Map</Typography>
        <MapContainer
          center={[21.0278, 105.8342]}
          zoom={14}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?lang=en"
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {rows.map((shop) => {
            return (
              <Marker
                key={shop.id}
                position={[parseFloat(shop.storeLatitude), parseFloat(shop.storeLongitude)]}
              >
                <Popup>
                  <Box>
                    <Typography variant="subtitle1">{shop.storeName}</Typography>
                    <Typography variant="body2">{shop.storeAddress}</Typography>
                    <Typography variant="body2">{shop.storeOpenHours}</Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: shop.storeStatus === true ? 'success.main' : 'error.main',
                        fontWeight: 'bold'
                      }}
                    >
                      {shop.storeStatus === true ? 'Active' : 'Inactive'}
                    </Typography>
                  </Box>
                </Popup>
              </Marker>
            )})}
        </MapContainer>
      </Paper>

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
        {rows.find((row) => row.id === selectedId)?.storeStatus === false ? (
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