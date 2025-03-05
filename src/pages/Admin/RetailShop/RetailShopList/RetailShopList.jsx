import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Add from '@mui/icons-material/Add'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
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
import L from 'leaflet'
import marker from 'leaflet/dist/images/marker-icon.png'
import marker2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import { getAllRetailShopsAPI, updateRetailShopAPI, getRetailShopByIdAPI } from '~/apis'

// Function to transform store data from API
const transformStoreData = (stores) => {
  if (!Array.isArray(stores)) return []
  return stores.map(store => ({
    id: store.storeId,
    storeName: store.storeName,
    storeAddress: store.storeAddress,
    storeCity: store.storeCity,
    storePhone: store.storePhone,
    storeLatitude: store.storeLatitude,
    storeLongitude: store.storeLongitude,
    storeOpenHours: `${store.storeOpenAt} - ${store.storeCloseAt}`,
    storeStatus: store.storeStatus
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

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleAddClick = () => {
    const id = Date.now() // Use timestamp for unique ID
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        storeName: '',
        storeAddress: '',
        storeCity: '',
        storeLatitude: '',
        storeLongitude: '',
        storeOpenHours: '08:00 - 22:00',
        storePhone: '',
        storeStatus: 'Active',
        isNew: true
      }
    ])
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'storeName' }
    }))
  }

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<Add />} onClick={handleAddClick}>
        Add Retail Shop
      </Button>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

function RetailShopManagement() {
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedShop, setSelectedShop] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()

  // Fetch stores on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stores = await getAllStores()
        setRows(stores)
      } catch (error) {
        toast.error('Failed to fetch stores')
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
        description: 'Are you sure you want to delete this store?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateRetailShopAPI({
          storeId: id,
          storeStatus: 'Deleted'
        })
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Store deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete store')
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
      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, storeName, storeAddress, storeCity, storePhone, storeLatitude, storeLongitude, storeStatus } = updatedRow
      const [storeOpenAt, storeCloseAt] = updatedRow.storeOpenHours.split(' - ')

      const payload = {
        storeId: id,
        storeName,
        storeAddress,
        storeCity,
        storePhone,
        storeLatitude,
        storeLongitude,
        storeOpenAt,
        storeCloseAt,
        storeStatus
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

  const handleMarkerClick = (shop) => {
    setSelectedShop(shop)
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
      const store = await getRetailShopByIdAPI(id)
      setSelectedShop(store)
    } catch (error) {
      toast.error('Failed to fetch store details')
    }
  }

  const ShopDetails = ({ shop }) => {
    if (!shop) return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">Select a store to view details</Typography>
      </Paper>
    )

    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Store Details</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <DetailItem label="Name" value={shop.storeName} />
          <DetailItem label="Address" value={shop.storeAddress} />
          <DetailItem label="City" value={shop.storeCity} />
          <DetailItem label="Coordinates" value={`${shop.storeLatitude}, ${shop.storeLongitude}`} />
          <DetailItem label="Open Hours" value={shop.storeOpenHours} />
          <DetailItem label="Phone" value={shop.storePhone} />
          <DetailItem label="Status" value={shop.storeStatus} />
        </Box>
      </Paper>
    )
  }

  const DetailItem = ({ label, value }) => (
    <Box>
      <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
      <Typography variant="body1">{value}</Typography>
    </Box>
  )

  const columns = [
    { field: 'storeName', headerName: 'Store Name', width: 200, editable: true, filterable: true },
    { field: 'storeAddress', headerName: 'Address', width: 250, editable: true, filterable: true },
    { field: 'storeCity', headerName: 'City', width: 150, editable: true, filterable: true },
    { field: 'storeLatitude', headerName: 'Latitude', width: 120, editable: true, filterable: true },
    { field: 'storeLongitude', headerName: 'Longitude', width: 120, editable: true, filterable: true },
    { field: 'storeOpenHours', headerName: 'Open Hours', width: 150, editable: true, filterable: true },
    { field: 'storePhone', headerName: 'Phone', width: 150, editable: true, filterable: true },
    {
      field: 'storeStatus',
      headerName: 'Status',
      width: 120,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Active', 'Inactive'],
      filterable: true
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
          />
        ]
      }
    }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" gutterBottom>Retail Shop Management</Typography>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ flex: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Retail Shops Map</Typography>
            <MapContainer
              center={[21.0278, 105.8342]}
              zoom={7}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {rows.map((shop) => (
                <Marker
                  key={shop.id}
                  position={[parseFloat(shop.storeLatitude), parseFloat(shop.storeLongitude)]}
                  eventHandlers={{
                    click: () => handleMarkerClick(shop)
                  }}
                >
                  <Popup>
                    <Box>
                      <Typography variant="subtitle1">{shop.storeName}</Typography>
                      <Typography variant="body2">{shop.storeAddress}</Typography>
                    </Box>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </Paper>
        </Box>

        <Box sx={{ flex: 1 }}>
          <ShopDetails shop={selectedShop} />
        </Box>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Retail Shops List</Typography>
        <Box sx={{ height: '100vh', width: '100%' }}>
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
      </Paper>
    </Box>
  )
}

export default RetailShopManagement
