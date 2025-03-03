import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import { useForm } from 'react-hook-form'
import {
  FIELD_REQUIRED_MESSAGE,
  ACCOUNT_ID_RULE,
  ACCOUNT_ID_RULE_MESSAGE
} from '~/utils/validators'
import { useDispatch } from 'react-redux'
import { loginAccountApi } from '~/redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function AccountForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitLogIn = (data) => {
    const { accountId, password } = data
    toast.promise(
      dispatch(loginAccountApi({ accountId, password })), {
        pending: 'Logging in...'
      }
    ).then(res => {
      // console.log(res)
      //Đoạn này phải kiểm tra không có lỗi mới redirect về route /
      if (!res.error) {
        navigate('/')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)} >
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 480, maxWidth: 480, marginTop: '1em' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 1
          }}>
            <Typography variant="h4" align="center">YOUR ACCOUNT ID</Typography>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Please enter your Account id..."
                type="text"
                variant="outlined"
                {...register('accountId', { required: FIELD_REQUIRED_MESSAGE, pattern: ACCOUNT_ID_RULE })}
                error={!!errors.accountId}
                helperText={errors.accountId?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.accountId?.type === 'pattern' ? ACCOUNT_ID_RULE_MESSAGE : ''}
              />
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
              Proceed
            </Button>
          </CardActions>
          {/* <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New to Nexus Service Marketing System?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Create account!</Typography>
            </Link>
          </Box> */}
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}> Back to Login</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default AccountForm
