import { createTheme } from '@mui/material/styles'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Routes, Route } from 'react-router-dom'
import { useState, useMemo } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import BusinessIcon from '@mui/icons-material/Business'
import StoreIcon from '@mui/icons-material/Store'
import LanIcon from '@mui/icons-material/Lan'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PaymentIcon from '@mui/icons-material/Payment'
import FeedbackIcon from '@mui/icons-material/Feedback'

import Dashboard from '~/pages/Admin/Dashboard/Dashboard'
import Employee from '~/pages/Admin/Employee/Employee'
import Equipment from '~/pages/Admin/Equipment/Equipment'
// import Vendor from '~/pages/Admin/Vendors/Vendors'
// import RetailShop from '~/pages/Admin/RetailShops/RetailShops'
// import ConnectionPlan from '~/pages/Admin/ConnectionPlans/ConnectionPlans'
// import Order from '~/pages/Admin/Orders/Orders'
// import Billing from '~/pages/Admin/Billing/Billing'
// import Payment from '~/pages/Admin/Payments/Payments'`
// import Feedback from '~/pages/Admin/Feedbacks/Feedbacks'
import NotFound from '~/pages/Admin/NotFound/NotFound'

const NAVIGATION = [
  {
    segment: 'admin/',
    // link: '/admin/',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    component: Dashboard
  },
  {
    segment: 'admin/employee',
    // link: '/admin/employee',
    title: 'Employee',
    icon: <PeopleIcon />,
    component: Employee
  },
  {
    segment: 'admin/equipment',
    title: 'Equipment',
    icon: <InventoryIcon />,
    component: Equipment
  },
  {
    segment: 'admin/vendors',
    title: 'Vendor',
    icon: <BusinessIcon />
    // component: Vendor
  },
  {
    segment: 'admin/retail-shops',
    title: 'Retail Shop',
    icon: <StoreIcon />
    // component: RetailShop
  },
  {
    segment: 'admin/connection-plans',
    title: 'Connection Plan',
    icon: <LanIcon />
    // component: ConnectionPlan
  },
  {
    segment: 'admin/orders',
    title: 'Order',
    icon: <AssignmentIcon />
    // component: Order
  },
  {
    segment: 'admin/billing',
    title: 'Billing',
    icon: <ReceiptIcon />
    // component: Billing
  },
  {
    segment: 'admin/payments',
    title: 'Payment',
    icon: <PaymentIcon />
    // component: Payment
  },
  {
    segment: 'admin/feedbacks',
    title: 'Feedback',
    icon: <FeedbackIcon />
    // component: Feedback
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

function Layout() {
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

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      theme={demoTheme}
      branding={{
        title: 'Nexus Admin'
      }}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="equipment" element={<Equipment />} />
          {/* <Route path="vendor" element={<Vendor />} />
          <Route path="retail-shop" element={<RetailShop />} />
          <Route path="connection-plan" element={<ConnectionPlan />} />
          <Route path="order" element={<Order />} />
          <Route path="billing" element={<Billing />} />
          <Route path="payment" element={<Payment />} />
          <Route path="feedback" element={<Feedback />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  )
}

export default Layout
