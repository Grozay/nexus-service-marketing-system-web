import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import LoginForm from './LoginForm'
import AppBar from '~/components/AppBar/AppBar'
// import AccountForm from './ResetPw/AccountForm'
// import OtpForm from './ResetPw/OtpForm'
// import ResetPwForm from './ResetPw/ResetPwForm'
import ResetPw from './ResetPw'
import bgImage from '~/assets/images/Account-login-bg.jpg'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/account/login'
  // const isAccountForm = location.pathname === '/account/reset-password/account'
  // const isOtpForm = location.pathname === '/account/reset-password/otp'
  // const isResetPwForm = location.pathname === '/account/reset-password/new-password'
  const isResetPw = location.pathname === '/account/reset-password'

  return (
    <Box>
      <AppBar />
      <Box sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '90vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${bgImage})`,
        backgroundBlendMode: 'overlay',
        backgroundColor: 'rgba(46, 33, 46, 0.55)',
        boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.2)'
      }}>
        {isLogin && <LoginForm />}
        {/* {isAccountForm && <AccountForm />}
        {isOtpForm && <OtpForm />}
        {isResetPwForm && <ResetPwForm />} */}
        {isResetPw && <ResetPw />}


      </Box>
    </Box>
  )
}

export default Auth