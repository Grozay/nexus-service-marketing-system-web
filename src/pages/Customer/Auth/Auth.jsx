import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import AppBar from '~/components/AppBar/AppBar'
import ResetPw from './ResetPw'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'
  const isResetPassword = location.pathname === '/reset-password'

  return (
    <Box>
      <AppBar />
      <Box sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
      }}>
        {isLogin && <LoginForm />}
        {isResetPassword && <ResetPw />}

      </Box>
    </Box>
  )
}

export default Auth