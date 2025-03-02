import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { Navigate } from 'react-router-dom'
function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/admin/login'
  // const isRegister = location.pathname === '/register'
  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to='/admin/' replace={true} />
  }
  return (
    <Box>
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
        {/* {isRegister && <RegisterForm />} */}
      </Box>
    </Box>
  )
}

export default Auth