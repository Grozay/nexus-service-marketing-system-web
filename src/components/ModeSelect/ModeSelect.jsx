import { Typography, useColorScheme } from '@mui/material'
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
      <Tooltip title={`${mode === 'light' ? 'Change to Dark Mode' : 'Change to Light Mode'}`}>
        <IconButton
          onClick={toggleMode}
          aria-label="toggle dark/light mode"
        >
          {mode === 'light' ?
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <DarkModeIcon sx={{ color: 'white', fontSize: '14px' }} />
              <Typography sx={{ color: 'white', fontSize: '14px' }}>Dark</Typography>
            </Box>
            :
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <LightModeIcon sx={{ color: 'white', fontSize: '14px' }} />
              <Typography sx={{ color: 'white', fontSize: '14px' }}>Light</Typography>
            </Box>}
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ModeSelect
