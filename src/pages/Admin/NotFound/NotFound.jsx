import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { Link } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'

const NotFound = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box>
      {/* <AppBar /> */}

      <Container
        maxWidth="md"
        sx={{
          mt: 8,
          mb: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px - 60px)',
          textAlign: 'center',
          padding: 3
        }}
      >
        <Grid size={{ xs: 12, md: 6 }} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
          <Typography variant="h1" component="h1" sx={{
            fontSize: isMobile ? '6rem' : '8rem',
            fontWeight: 700,
            color: 'primary.main',
            mb: 2
          }}>
              404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
              Oops! Page not found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              The page you are looking for might have been removed, renamed, or is temporarily unavailable.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/"
            sx={{ mt: 2 }}
          >
              Back to Homepage
          </Button>
        </Grid>

      </Container>

      {/* <Footer /> */}
    </Box>
  )
}

export default NotFound
