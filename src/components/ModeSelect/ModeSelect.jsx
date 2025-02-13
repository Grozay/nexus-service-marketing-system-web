import { useColorScheme } from '@mui/material'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'


function ModeSelect() {
  const { mode: colorSchemeMode, setMode } = useColorScheme()
  const mode = colorSchemeMode || 'system'
  const handleChange = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          color: 'white',
          '&:hover': { opacity: 0.8 }
        }}
        onClick={handleChange}
      >
        {mode === 'light' ? (
          <Tooltip title="Light Mode">
            <LightModeIcon fontSize="small" />
          </Tooltip>
        ) : (
          <Tooltip title="Dark Mode">
            <DarkModeIcon fontSize="small" />
          </Tooltip>
        )}
      </Box>
    </Box>
  )
}

export default ModeSelect

