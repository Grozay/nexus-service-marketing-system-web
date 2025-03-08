import Box from '@mui/material/Box'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import SaveIcon from '@mui/icons-material/Save'
import CancelIcon from '@mui/icons-material/Close'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Select from '@mui/material/Select'
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
import { getAllEmployeesAPI, activateEmployeeAPI, updateEmployeeAPI, deleteEmployeeAPI } from '~/apis'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { formatDate } from '~/utils/formatter'
import Chip from '@mui/material/Chip'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import Typography from '@mui/material/Typography'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DoneAllIcon from '@mui/icons-material/DoneAll'
import BlockIcon from '@mui/icons-material/Block'
import { useNavigate } from 'react-router-dom'

// Function to transform employee data from API
const transformEmployeeData = (employees) => {
  if (!Array.isArray(employees)) return []
  const roleMap = {
    'css': 'Retail Staff',
    'acs': 'Accountant Staff',
    'tes': 'Technical Staff',
    'admin': 'Admin'
  }

  return employees
    .filter(employee => !employee.isDeleted)
    .map(employee => ({
      id: employee.employeeId,
      name: employee.employeeName,
      email: employee.employeeEmail,
      phone: employee.employeePhone,
      role: employee.employeeRole || '', // Ensure role is always defined
      displayRole: roleMap[employee.employeeRole] || employee.employeeRole || '', // Fallback to original value or empty string
      status: employee.employeeIsActive,
      joinDate: new Date(employee.employeeCreatedAt),
      gender: employee.employeeGender,
      address: employee.employeeAddress,
      dob: new Date(employee.employeeDOB)
    }))
}

// Fetch all employees from API
const getAllEmployees = async () => {
  try {
    const response = await getAllEmployeesAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return transformEmployeeData(response)
  } catch (error) {
    throw new Error('Error fetching employees:', error)
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

export default function EmployeeList() {
  const [rows, setRows] = useState([])
  const [rowModesModel, setRowModesModel] = useState({})
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [previousRow, setPreviousRow] = useState(null)
  const confirmUpdate = useConfirm()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getAllEmployees()
      setRows(employees)
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
        description: 'Are you sure you want to delete this employee?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await deleteEmployeeAPI(id)
        setRows(rows.filter((row) => row.id !== id))
        toast.success('Employee deleted successfully')
      }
    } catch (error) {
      toast.error(error.message || 'Failed to delete employee')
    }
  }

  const handleActivateClick = (id) => async () => {
    await activateEmployeeAPI({ employeeId: id, employeeIsActive: true })
    toast.success('Employee activated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, status: true } : row)))
  }

  const handleDeactivateClick = (id) => async () => {
    await activateEmployeeAPI({ employeeId: id, employeeIsActive: false })
    toast.success('Employee deactivated successfully')
    setRows(rows.map((row) => (row.id === id ? { ...row, status: false } : row)))
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
      if (!newRow.name || !newRow.email || !newRow.phone) {
        throw new Error('Please fill in all required fields')
      }

      const updatedRow = { ...newRow, isNew: false }
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))

      const { id, name, role, dob, gender, address, phone, email } = updatedRow

      const formattedDOB = formatDate(dob)

      if (role === 'admin') {
        throw new Error('Cannot edit to admin role')
      }

      const payload = {
        employeeId: id,
        employeeName: name,
        employeeRole: role,
        employeeDOB: formattedDOB,
        employeeGender: gender,
        employeeAddress: address,
        employeePhone: phone,
        employeeEmail: email
      }

      const { confirmed } = await confirmUpdate({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this employee?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      if (confirmed) {
        await updateEmployeeAPI(payload)
        toast.success('Update employee successfully')
      } else {
        throw new Error('Update cancelled by user')
      }
      return updatedRow
    } catch (error) {
      if (error?.errors) {
        const errorMessages = Object.values(error.errors).flat()
        toast.error(errorMessages.join(', ') || 'Update employee failed')
      } else {
        toast.error(error.message || 'Update employee failed')
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

  const handleViewDetail = (id) => {
    return () => navigate(`/management/employee/${id}`)
  }

  const columns = [
    { field: 'id', headerName: 'Employee ID', width: 150, editable: false },
    { field: 'name', headerName: 'Name', width: 150, editable: true },
    { field: 'email', headerName: 'Email', width: 200, editable: true },
    { field: 'phone', headerName: 'Phone', width: 150, editable: true },
    {
      field: 'role',
      headerName: 'Role',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: [
        { value: 'css', label: 'Retail Staff' },
        { value: 'acs', label: 'Accountant Staff' },
        { value: 'tes', label: 'Technical Staff' }
      ],
      valueGetter: (params) => params.row?.role || '',
      renderCell: (params) => params.row?.displayRole || params.row?.role || '',
      renderEditCell: (params) => (
        <Select
          value={params.value || ''}
          onChange={(e) => {
            params.api.setEditCellValue({
              id: params.id,
              field: params.field,
              value: e.target.value
            })
          }}
          size="small"
          fullWidth
          native
        >
          <option value="css">Retail Staff</option>
          <option value="acs">Accountant Staff</option>
          <option value="tes">Technical Staff</option>
        </Select>
      )
    },
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
        Employee Management
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
        <MenuItem
          onClick={() => {
            handleEditClick(selectedId)()
            handleCloseMenu()
          }}
          disabled={rows.find((row) => row.id === selectedId)?.role === 'admin'}
        >
          <EditIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
          Edit
        </MenuItem>
        {
          rows.find((row) => row.id === selectedId)?.status === false ? (
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