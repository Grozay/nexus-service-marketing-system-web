import { createTheme } from '@mui/material/styles'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useState, useMemo } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import InventoryIcon from '@mui/icons-material/Inventory'
import BusinessIcon from '@mui/icons-material/Business'
import StoreIcon from '@mui/icons-material/Store'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import Dashboard from '~/pages/Admin/Dashboard/Dashboard'
import Employee from '~/pages/Admin/Employee/Employee'
import Equipment from '~/pages/Admin/Equipment/Equipment'
import Vendor from '~/pages/Admin/Vendor/Vendor'
import RetailShop from '~/pages/Admin/RetailShop/RetailShop'
import Customer from '~/pages/Admin/Customer/Customer'
import NotFound from '~/pages/Admin/NotFound/NotFound'
import LanIcon from '@mui/icons-material/Lan'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PaymentIcon from '@mui/icons-material/Payment'
import FeedbackIcon from '@mui/icons-material/Feedback'
import ConnectionPlan from '~/pages/Admin/Connections/ConnectionPlan'
import CreateOrder from '~/pages/Admin/Orders/CreateOrder/CreateOrder'
import OrderList from '~/pages/Admin/Orders/Order'
import Billing from '~/pages/Admin/Billing/Billing'
import Payments from '~/pages/Admin/Payments/Payments'
import CustomerFeedbackPage from '~/pages/Admin/Feedback/FeedbackCustomer'
import EmployeeFeedbackPage from '~/pages/Admin/Feedback/FeedbackEmployee'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { logoutEmployeeApi } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'

const NAVIGATION = (currentUser) => {
  const baseNav = []

  // Admin has access to all features
  if (currentUser.userRole === 'admin') {
    baseNav.push(
      { segment: 'admin/', title: 'Dashboard', icon: <DashboardIcon /> },
      { segment: 'admin/employee', title: 'Employee', icon: <PeopleIcon /> },
      { segment: 'admin/customer', title: 'Customer', icon: <EmojiPeopleIcon /> },
      { segment: 'admin/equipment', title: 'Equipment', icon: <InventoryIcon /> },
      { segment: 'admin/vendor', title: 'Vendor', icon: <BusinessIcon /> },
      { segment: 'admin/retail-shop', title: 'Retail Shop', icon: <StoreIcon /> },
      { segment: 'admin/connection-plans', title: 'Connection Plan', icon: <LanIcon /> },
      {
        segment: 'admin/orders',
        title: 'Order',
        icon: <AssignmentIcon />,
        children: [
          { segment: 'create', title: 'Create Order' },
          { segment: 'list', title: 'Order List' }
        ]
      },
      { segment: 'admin/billing', title: 'Billing', icon: <ReceiptIcon /> },
      { segment: 'admin/payments', title: 'Payment', icon: <PaymentIcon /> },
      {
        segment: 'admin/feedbacks',
        title: 'Feedback',
        icon: <FeedbackIcon />,
        children: [
          { segment: 'customer', title: 'Customer Feedback' },
          { segment: 'employee', title: 'Employee Feedback' }
        ]
      }
    )
  } 
  // Other roles
  else {
    // Retail Staff
    if (currentUser.userRole === 'retail staff') {
      baseNav.push(
        {
          segment: 'admin/orders',
          title: 'Order',
          icon: <AssignmentIcon />,
          children: [
            { segment: 'create', title: 'Create Order' },
            { segment: 'list', title: 'Order List' }
          ]
        },
        { segment: 'admin/billing', title: 'Billing', icon: <ReceiptIcon /> },
        { segment: 'admin/payments', title: 'Payment', icon: <PaymentIcon /> }
      )
    }

    // Technician
    if (currentUser.userRole === 'technician') {
      baseNav.push(
        {
          segment: 'admin/orders',
          title: 'Order',
          icon: <AssignmentIcon />,
          children: [
            { segment: 'list', title: 'Order List' }
          ]
        },
        { segment: 'admin/connection-plans', title: 'Connection Plan', icon: <LanIcon /> },
        { segment: 'admin/equipment', title: 'Equipment', icon: <InventoryIcon /> }
      )
    }

    // Accountant
    if (currentUser.userRole === 'accountant') {
      baseNav.push(
        { segment: 'admin/billing', title: 'Billing', icon: <ReceiptIcon /> },
        { segment: 'admin/payments', title: 'Payment', icon: <PaymentIcon /> }
      )
    }
  }


  return baseNav
}

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } }
})

function Layout(props) {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const confirmLogout = useConfirm()
  const handleLogout = () => {
    confirmLogout({
      title: 'Are you sure you want to logout?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })
      .then(() => dispatch(logoutEmployeeApi()))
      .catch(() => { })
  }
  const { window } = props
  const [session, setSession] = useState({
    user: {
      name: currentUser.userName,
      email: currentUser.userEmail,
      image: currentUser.employeeImage
    }
  })
  const demoWindow = window !== undefined ? window() : undefined

  const navigate = useNavigate()
  const location = useLocation()

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
      signOut: handleLogout
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useMemo(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(location.search),
      navigate: (path) => navigate(path)
    }
  }, [location, navigate])

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION(currentUser)}
      theme={demoTheme}
      router={router}
      window={demoWindow}
      branding={{ title: 'Nexus Admin' }}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="employee" element={<Employee />} />
          <Route path="customer" element={<Customer />} />
          <Route path="equipment" element={<Equipment />} />
          <Route path="vendor" element={<Vendor />} />
          <Route path="retail-shop" element={<RetailShop />} />
          <Route path="connection-plans" element={<ConnectionPlan />} />
          <Route path="orders">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="create" element={<CreateOrder />} />
            <Route path="list" element={<OrderList />} />
          </Route>
          <Route path="feedbacks">
            <Route index element={<Navigate to="customer" replace />} />
            <Route path="customer" element={<CustomerFeedbackPage />} />
            <Route path="employee" element={<EmployeeFeedbackPage />} />
          </Route>
          <Route path="billing" element={<Billing />} />
          <Route path="payments" element={<Payments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  )
}

export default Layout