import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter } from 'react-router-dom'
import theme from '~/theme'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme} noSsr disableTransitionOnChange defaultMode='light'>
        <CssBaseline />
        <ConfirmProvider defaultOptions={{
          allowClose: false,
          dialogProps: { maxWidth: 'xs' },
          confirmationButtonProps: { color: 'secondary', variant: 'outlined' },
          cancellationButtonProps: { color: 'inherit' }
        }}
        >
          <App />
        </ConfirmProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
