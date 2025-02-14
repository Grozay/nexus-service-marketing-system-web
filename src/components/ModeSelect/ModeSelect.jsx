import { useColorScheme } from '@mui/material'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import Tooltip from '@mui/material/Tooltip'
function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const toggleMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  return (
    <Box>
      <Tooltip title={`${mode === 'light' ? 'dark' : 'light'}`}>
        <IconButton 
          onClick={toggleMode}
          sx={{ color: 'white' }}
          aria-label="toggle dark/light mode"
        >
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ModeSelect
