import React, { useState } from 'react'
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarExport } from '@mui/x-data-grid'
import { Order } from '~/apis/mock-data'
import { Box } from '@mui/material'

const columns = [
  { field: 'orderId', headerName: 'Order ID', width: 150 },
  { field: 'orderName', headerName: 'Order Name', width: 200 },
  { field: 'orderDescription', headerName: 'Description', width: 300 },
  { field: 'orderAmount', headerName: 'Amount', width: 100 },
  { field: 'orderStatus', headerName: 'Status', width: 120 }
]

function EditToolbar(props) {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  )
}

const OrderList = () => {
  const [rows, setRows] = useState(Order)

  return (
    <Box sx={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.orderId}
        slots={{ toolbar: EditToolbar }}
      />
    </Box>
  )
}

export default OrderList