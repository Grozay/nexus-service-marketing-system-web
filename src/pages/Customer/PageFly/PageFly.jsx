import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import CloseIcon from '@mui/icons-material/Close'
import Fade from '@mui/material/Fade'
import { Link, useLocation } from 'react-router-dom'

const PageFly = () => {
  const [isVisible, setIsVisible] = useState(true)
  const location = useLocation() // Lấy thông tin đường dẫn hiện tại

  // Kiểm tra đường dẫn mỗi khi location thay đổi
  useEffect(() => {
    // Nếu đường dẫn chứa "domain/management", ẩn component
    if (location.pathname.includes('management')) {
      setIsVisible(false)
    } else {
      setIsVisible(true) // Hiển thị ở các trang khác
    }
  }, [location]) // Chạy lại khi location thay đổi

  return (
    <Fade in={isVisible} timeout={2000}>
      <Box sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-start'
      }}>
        <Button
          component={Link}
          to="/services"
          variant="contained"
          sx={{
            backgroundColor: '#1976d2',
            color: '#fff',
            borderRadius: 20,
            px: 3,
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            position: 'relative',
            '&:hover': {
              backgroundColor: '#1565c0',
              transform: 'scale(1.05)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.3)'
            }
          }}
        >
          <HowToRegIcon sx={{ fontSize: '1.5rem' }} />
          <Typography variant="body1">
            Register Now
          </Typography>
          <IconButton
            onClick={() => {
              setIsVisible(false)
            }}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              backgroundColor: '#fff',
              color: '#666',
              width: 20,
              height: 20,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: '#f0f0f0',
                color: '#333'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: '1rem' }} />
          </IconButton>
        </Button>
      </Box>
    </Fade>
  )
}

export default PageFly