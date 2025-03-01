import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Payment } from '~/apis/mock-data'
import { Box } from '@mui/material'
const columns = [
  { field: 'paymentId', headerName: 'Payment ID', width: 120 },
  { field: 'billingId', headerName: 'Billing ID', width: 150 },
  { field: 'orderId', headerName: 'Order ID', width: 150 },
  { field: 'paymentMethod', headerName: 'Payment Method', width: 150 },
  { field: 'paymentAmount', headerName: 'Amount', width: 120, type: 'number' },
  { field: 'paymentNote', headerName: 'Note', width: 200 },
  { field: 'paymentStatus', headerName: 'Status', width: 120 },
  { field: 'paymentCreatedAt', headerName: 'Created date', width: 150 }
]

export default function PaymentPage() {
  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={Payment}
        columns={columns}
        getRowId={(row) => row.paymentId}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  )
}