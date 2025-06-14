import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { Navigate } from 'react-router-dom'
function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/management/login'
  // const isRegister = location.pathname === '/register'
  const currentEmployee = useSelector(selectCurrentUser)
  if (currentEmployee) {
    return <Navigate to='/management/' replace={true} />
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