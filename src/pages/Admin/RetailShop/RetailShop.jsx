import * as React from 'react'
import { Box, Button, Typography, Paper } from '@mui/material'
import { Add, Edit, DeleteOutlined, Save, Close } from '@mui/icons-material'
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
import marker from 'leaflet/dist/images/marker-icon.png';
import marker2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Mock data for retail shops
const initialRows = [
  {
    id: 1,
    storeName: 'Main Store',
    storeAddress: '123 Main St',
    storeCity: 'New York',
    storeLatitude: '40.7128',
    storeLongitude: '-74.0060',
    storeOpenHours: '9:00 AM - 9:00 PM',
    storePhone: '123-456-7890',
    storeStatus: 'Active'
  },
  {
    id: 2,
    storeName: 'Downtown Store',
    storeAddress: '456 Elm St',
    storeCity: 'Los Angeles',
    storeLatitude: '34.0522',
    storeLongitude: '-118.2437',
    storeOpenHours: '10:00 AM - 8:00 PM',
    storePhone: '987-654-3210',
    storeStatus: 'Inactive'
  }
]

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x,
  iconUrl: marker,
  shadowUrl: markerShadow
})

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props

  const handleAddClick = () => {
    const id = initialRows.length + 1
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        storeName: '',
        storeAddress: '',
        storeCity: '',
        storeLatitude: '',
        storeLongitude: '',
        storeOpenHours: '',
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
  const [rows, setRows] = React.useState(initialRows)
  const [rowModesModel, setRowModesModel] = React.useState({})
  const [selectedShop, setSelectedShop] = React.useState(null)

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

  const handleMarkerClick = (shop) => {
    setSelectedShop(shop)
  }

  const ShopDetails = ({ shop }) => {
    if (!shop) return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6">Select a shop to view details</Typography>
      </Paper>
    )

    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Shop Details</Typography>
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
              icon={<Save />}
              label="Save"
              sx={{
                color: 'primary.main'
              }}
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
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={id}
            icon={<DeleteOutlined />}
            label="Delete"
            onClick={handleDeleteClick(id)}
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
              center={[37.7749, -122.4194]} 
              zoom={4} 
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
        <Box sx={{ height: 400, width: '100%' }}>
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
        </Box>
      </Paper>
    </Box>
  )
}

export default RetailShopManagement
