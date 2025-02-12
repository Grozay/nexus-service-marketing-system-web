// import { cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '64px'
const FOOTER_HEIGHT = '64px'
const CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${FOOTER_HEIGHT})`

// Create a theme instance.
const theme = extendTheme({
  nexus: {
    appBarHeight: APP_BAR_HEIGHT,
    footerHeight: FOOTER_HEIGHT,
    contentHeight: CONTENT_HEIGHT
  },
  palette: {
    primary: {
      main: '#95a5a6'
    },
    secondary: {
      main: '#000000'
    }
  },
  // colorSchemes: {
  //   light: {
  //     palette: {
  //       primary: teal,
  //       secondary: deepOrange
  //     }
  //   },
  //   dark: {
  //     palette: {
  //       primary: cyan,
  //       secondary: orange
  //     }
  //   }
  // },
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
            background: 'white'
          }
        }
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
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    }
  }
})

export default theme