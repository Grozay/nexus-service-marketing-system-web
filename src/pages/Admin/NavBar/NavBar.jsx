import * as React from 'react'
import PropTypes from 'prop-types'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme } from '@mui/material/styles'
import DashboardIcon from '@mui/icons-material/Dashboard'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useDemoRouter } from '@toolpad/core/internal'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import LayersIcon from '@mui/icons-material/Layers'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import DevicesIcon from '@mui/icons-material/Devices'
import LinkIcon from '@mui/icons-material/Link'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PaymentIcon from '@mui/icons-material/Payment'
import FeedbackIcon from '@mui/icons-material/Feedback'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import { useMemo, useState } from 'react'


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Dashboard'
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />
  },
  {
    kind: 'header',
    title: 'Main Management'
  },
  {
    segment: 'employees',
    title: 'Employees',
    icon: <PeopleRoundedIcon />,
    children: [
      {
        segment: 'all-employees',
        title: 'All Employees'
      },
      {
        segment: 'add-employee',
        title: 'Add Employee'
      }
    ]
  },
  {
    segment: 'equipment',
    title: 'Equipment',
    icon: <DevicesIcon />,
    children: [
      {
        segment: 'inventory',
        title: 'Inventory'
      },
      {
        segment: 'add-equipment',
        title: 'Add Equipment'
      }
    ]
  },
  {
    kind: 'divider'
  },
  {
    kind: 'header',
    title: 'Operations'
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
    children: [
      {
        segment: 'all-orders',
        title: 'All Orders'
      },
      {
        segment: 'create-order',
        title: 'Create Order'
      }
    ]
  },
  {
    segment: 'connections',
    title: 'Connections',
    icon: <LinkIcon />,
    children: [
      {
        segment: 'all-connections',
        title: 'All Connections'
      },
      {
        segment: 'create-connection',
        title: 'Create Connection'
      }
    ]
  },
  {
    kind: 'divider'
  },
  {
    kind: 'header',
    title: 'Financials'
  },
  {
    segment: 'billing',
    title: 'Billing',
    icon: <ReceiptIcon />,
    children: [
      {
        segment: 'all-bills',
        title: 'All Bills'
      },
      {
        segment: 'create-bill',
        title: 'Create Bill'
      }
    ]
  },
  {
    segment: 'payments',
    title: 'Payments',
    icon: <PaymentIcon />,
    children: [
      {
        segment: 'all-payments',
        title: 'All Payments'
      },
      {
        segment: 'create-payment',
        title: 'Create Payment'
      }
    ]
  },
  {
    kind: 'divider'
  },
  {
    kind: 'header',
    title: 'Customer Relations'
  },
  {
    segment: 'feedback',
    title: 'Feedback',
    icon: <FeedbackIcon />,
    children: [
      {
        segment: 'all-feedback',
        title: 'All Feedback'
      },
      {
        segment: 'send-reply',
        title: 'Send Reply'
      }
    ]
  }
]
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme'
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536
    }
  }
})

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  )
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired
}

function DashboardLayoutAccount(props) {
  const { window } = props

  const [session, setSession] = useState({
    user: {
      name: 'Bharat Kashyap',
      email: 'bharatkashyap@outlook.com',
      image: 'https://avatars.githubusercontent.com/u/19550456'
    }
  })

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: 'Bharat Kashyap',
            email: 'bharatkashyap@outlook.com',
            image: 'https://avatars.githubusercontent.com/u/19550456'
          }
        })
      },
      signOut: () => {
        setSession(null)
      }
    }
  }, [])

  const router = useDemoRouter('/admin/dashboard')

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined

  return (
    // preview-start
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  )
}

DashboardLayoutAccount.propTypes = {
  window: PropTypes.func
}

export default DashboardLayoutAccount
