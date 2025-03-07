import { deepOrange, orange, teal, deepPurple } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '10vh'
const CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT})`

// Create a theme instance.
const theme = createTheme({
  nexus: {
    appBarHeight: APP_BAR_HEIGHT,
    contentHeight: CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange,
        background: {
          default: '#f5f7fa', // Xám nhạt cho light mode
          paper: '#ffffff' // Trắng cho các thành phần như Card
        }
      }
    },
    dark: {
      palette: {
        primary: deepPurple,
        secondary: orange,
        background: {
          default: '#2c3e50', // Xám đậm cho dark mode
          paper: '#34495e'// Xám đen nhạt cho các thành phần như Card
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            background: '#dcdde1',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            background: '#b2bec3'
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        component: 'div'
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.3px',
          '&:hover': {
            borderWidth: '1.5px'
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          '& fieldset': { borderWidth: '0.3px !important' },
          '&:hover fieldset': { borderWidth: '1.5px !important' },
          '&.Mui-focused fieldset': { borderWidth: '1.5px !important' }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { fontSize: '0.875rem' }
      }
    },
    MuiTypograph: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
})

export default theme