import Box from '@mui/material/Box'
import AppBar from '~/components/AppBar/AppBar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
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
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Box>
    </Box>
  )
}

export default Home
