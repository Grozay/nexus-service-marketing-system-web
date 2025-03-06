import { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Box,
  Typography,
  Card as MuiCard,
  CardActions,
  Autocomplete
} from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'
import { getAllAccountsAPI } from '~/apis'
import { toast } from 'react-toastify'
import Grid from '@mui/material/Grid2'

const CreateAccount = ({ onNext, setAccountData }) => {
  const [accountList, setAccountList] = useState([])

  // Khởi tạo useForm với giá trị mặc định
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      accountId: ''
    }
  })

  const handleCreateAccount = (data) => {
    // Kiểm tra nếu không có accountId được chọn
    if (!data.accountId) {
      toast.error('Please select an account')
      return
    }

    const selectedAccount = accountList.find(acc => acc.accountId === data.accountId)
    if (!selectedAccount) {
      toast.error('Selected account not found')
      return
    }

    setAccountData(selectedAccount)
    onNext()
  }

  useEffect(() => {
    getAllAccountsAPI()
      .then(data => {
        setAccountList(data)
      })
      .catch(() => toast.error('Error fetching account list'))
  }, [])

  return (
    <form onSubmit={handleSubmit(handleCreateAccount)}>
      <Box sx={{
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
        gap: 1
      }}>
        <Typography variant="h4">Choose Account</Typography>
      </Box>
      <Box sx={{ padding: '0 1em 1em 1em' }}>
        <Box sx={{ marginTop: '1em' }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Controller
              name="accountId"
              control={control}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field, fieldState: { error } }) => (
                <Autocomplete
                  options={accountList}
                  getOptionLabel={(option) => `${option.accountName} (${option.accountId})`}
                  value={accountList.find(option => option.accountId === field.value) || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue ? newValue.accountId : '')
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search Account"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                  noOptionsText="No accounts found"
                  sx={{ minWidth: 300 }}
                />
              )}
            />
          </Grid>
        </Box>
      </Box>
      <CardActions sx={{ padding: '0 1em 1em 1em' }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Next
        </Button>
      </CardActions>
    </form>
  )
}

export default CreateAccount