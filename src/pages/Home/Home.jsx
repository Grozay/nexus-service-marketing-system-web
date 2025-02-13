import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import Typography from '@mui/material/Typography'
function Home() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#7f8c8d' : '#ffffff'
      }}
    >
      <AppBar />
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <Typography variant="h1">Home</Typography>
      </Box>
    </Box>
  )
}

export default Home
