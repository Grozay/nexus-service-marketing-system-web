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
  PASSWORD_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  ACCOUNT_ID_RULE,
  ACCOUNT_ID_RULE_MESSAGE
} from '~/utils/validators'
import { useDispatch } from 'react-redux'
import { loginAccountApi } from '~/redux/user/accountSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const submitLogIn = (data) => {
    const { userId, userPassword } = data
    toast.promise(
      dispatch(loginAccountApi({ userId, userPassword })), {
        pending: 'Logging in...',
        error: 'Login failed'
      }
    ).then(res => {
      //Đoạn này phải kiểm tra không có lỗi mới redirect về route /
      if (res.error) {
        toast.error('Login failed, Please check your account id and password')
      } else {
        navigate('/')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)} >
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        <MuiCard sx={{ minWidth: 380, maxWidth: 380, marginTop: '1em' }}>
          <Box sx={{
            margin: '1em',
            display: 'flex',
            justifyContent: 'center',
            gap: 1
          }}>
            <Typography variant="h4" align="center">Login</Typography>
          </Box>
          <Box sx={{ padding: '0 1em 1em 1em' }}>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                // autoComplete="nope"
                autoFocus
                fullWidth
                label="Enter Account Id..."
                type="text"
                variant="outlined"
                {...register('userId', { required: FIELD_REQUIRED_MESSAGE, pattern: ACCOUNT_ID_RULE })}
                error={!!errors.userId}
                helperText={errors.userId?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.userId?.type === 'pattern' ? ACCOUNT_ID_RULE_MESSAGE : ''}
              />
            </Box>
            <Box sx={{ marginTop: '1em' }}>
              <TextField
                fullWidth
                label="Enter Password..."
                type="password"
                variant="outlined"
                {...register('userPassword', { required: FIELD_REQUIRED_MESSAGE, pattern: PASSWORD_RULE })}
                error={!!errors.userPassword}
                helperText={errors.userPassword?.type === 'required' ? FIELD_REQUIRED_MESSAGE : errors.userPassword?.type === 'pattern' ? PASSWORD_RULE_MESSAGE : ''}
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
              Login
            </Button>
          </CardActions>
          {/* <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>New to Nexus Service Marketing System?</Typography>
            <Link to="/register" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>Create account!</Typography>
            </Link>
          </Box> */}
          <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
            <Typography>Forgot Password?</Typography>
            <Link to="/account/reset-password" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}> Reset Password</Typography>
            </Link>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm
