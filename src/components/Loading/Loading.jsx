import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function Loading() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        backgroundColor: 'background.default',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  )
}

export default Loading