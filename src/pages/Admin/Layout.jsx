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
import NotFound from '~/pages/Admin/NotFound/NotFound'
import LanIcon from '@mui/icons-material/Lan'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PaymentIcon from '@mui/icons-material/Payment'
import FeedbackIcon from '@mui/icons-material/Feedback'
import CreateOrder from '~/pages/Admin/Orders/CreateOrders/CreateOrder/CreateOrder'
import OrderList from '~/pages/Admin/Orders/OrderList/OrderList'
import Payments from '~/pages/Admin/Payments/Payments'
import CustomerFeedbackPage from '~/pages/Admin/Feedback/FeedbackCustomer'
import EmployeeFeedbackPage from '~/pages/Admin/Feedback/FeedbackEmployee'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { useDispatch } from 'react-redux'
import { logoutEmployeeApi } from '~/redux/user/employeeSlice'
import { useConfirm } from 'material-ui-confirm'
import EmployeeList from '~/pages/Admin/Employee/EmployeeList/EmployeeList'
import CreateEmployee from '~/pages/Admin/Employee/CreateEmployee/CreateEmployee'
import CustomerList from '~/pages/Admin/Customer/CustomerList/CustomerList'
import CreateCustomer from '~/pages/Admin/Customer/CreateCustomer/CreateCustomer'
import EquipmentList from '~/pages/Admin/Equipment/EquipmentList/EquipmentList'
import CreateEquipment from '~/pages/Admin/Equipment/CreateEquipment/CreateEquipment'
import VendorList from '~/pages/Admin/Vendor/VendorList/VendorList'
import CreateVendor from '~/pages/Admin/Vendor/CreateVendor/CreateVendor'
import RetailShopList from '~/pages/Admin/RetailShop/RetailShopList/RetailShopList'
import CreateRetailShop from '~/pages/Admin/RetailShop/CreateRetailShop/CreateRetailShop'
import ConnectionList from '~/pages/Admin/Connections/ConnectionList/ConnectionList'
// import CreateConnectionPlan from '~/pages/Admin/Connections/CreateConnectionPlan/CreateConnectionPlan'
import CreateBilling from '~/pages/Admin/Billing/CreateBilling/CreateBilling'
import BillingList from '~/pages/Admin/Billing/BillingList/BillingList'
import EmployeeDetail from '~/pages/Admin/Employee/EmployeeDetail/EmployeeDetail'
import CustomerDetail from '~/pages/Admin/Customer/CustomerDetail/CustomerDetail'
import EquipmentDetail from '~/pages/Admin/Equipment/EquipmentDetail/EquipmentDetail'
import VendorDetail from '~/pages/Admin/Vendor/VendorDetail/VendorDetail'
import RetailShopDetail from '~/pages/Admin/RetailShop/RetailShopDetail/RetailShopDetail'
import ConnectionDetail from '~/pages/Admin/Connections/ConnectionDetail/ConnectionDetail'
const NAVIGATION = (currentUser) => {
  const baseNav = []

  // Admin has access to all features
  if (currentUser.userRole === 'admin') {
    baseNav.push(
      { segment: 'management/', title: 'Dashboard', icon: <DashboardIcon /> },
      {
        segment: 'management/employee',
        title: 'Employee',
        icon: <PeopleIcon />,
        children: [
          { segment: 'list', title: 'Employee List' },
          { segment: 'create', title: 'Create Employee' }
        ]
      },
      { segment: 'management/customer', title: 'Customer', icon: <EmojiPeopleIcon />,
        children: [
          { segment: 'list', title: 'Customer List' },
          { segment: 'create', title: 'Create Customer' }
        ]
      },
      { segment: 'management/equipment', title: 'Equipment', icon: <InventoryIcon />,
        children: [
          { segment: 'list', title: 'Equipment List' },
          { segment: 'create', title: 'Create Equipment' }
        ]
      },
      { segment: 'management/vendor', title: 'Vendor', icon: <BusinessIcon />,
        children: [
          { segment: 'list', title: 'Vendor List' },
          { segment: 'create', title: 'Create Vendor' }
        ]
      },
      { segment: 'management/retail-shop', title: 'Retail Shop', icon: <StoreIcon />,
        children: [
          { segment: 'list', title: 'Retail Shop List' },
          { segment: 'create', title: 'Create Retail Shop' }
        ]
      },
      { segment: 'management/connection-plans', title: 'Connection Plan', icon: <LanIcon />,
        children: [
          { segment: 'list', title: 'Connection Plan List' },
          { segment: 'create', title: 'Create Connection Plan' }
        ]
      },
      {
        segment: 'management/orders',
        title: 'Order',
        icon: <AssignmentIcon />,
        children: [
          { segment: 'create', title: 'Create Order' },
          { segment: 'list', title: 'Order List' }
        ]
      },
      { segment: 'management/billing', title: 'Billing', icon: <ReceiptIcon />,
        children: [
          { segment: 'create', title: 'Create Billing' },
          { segment: 'list', title: 'Billing List' }
        ]
      },
      { segment: 'management/payments', title: 'Payment', icon: <PaymentIcon /> },
      {
        segment: 'management/feedbacks',
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
          segment: 'management/orders',
          title: 'Order',
          icon: <AssignmentIcon />,
          children: [
            { segment: 'create', title: 'Create Order' },
            { segment: 'list', title: 'Order List' }
          ]
        },
        { segment: 'management/billing', title: 'Billing', icon: <ReceiptIcon /> },
        { segment: 'management/payments', title: 'Payment', icon: <PaymentIcon /> }
      )
    }

    // Technician
    if (currentUser.userRole === 'technician') {
      baseNav.push(
        {
          segment: 'management/orders',
          title: 'Order',
          icon: <AssignmentIcon />,
          children: [
            { segment: 'list', title: 'Order List' }
          ]
        },
        { segment: 'management/connection-plans', title: 'Connection Plan', icon: <LanIcon /> },
        { segment: 'management/equipment', title: 'Equipment', icon: <InventoryIcon /> }
      )
    }

    // Accountant
    if (currentUser.userRole === 'accountant') {
      baseNav.push(
        { segment: 'management/billing', title: 'Billing', icon: <ReceiptIcon /> },
        { segment: 'management/payments', title: 'Payment', icon: <PaymentIcon /> }
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
  const navigate = useNavigate()
  const location = useLocation()
  const handleLogout = async () => {
    const { confirmed } = await confirmLogout({
      title: 'Are you sure you want to logout?',
      description: 'This action is permanent!',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })

    if (confirmed) {
      dispatch(logoutEmployeeApi())
    }
  }
  const { window } = props
  const [session, setSession] = useState({
    user: {
      name: currentUser.userName,
      email: currentUser.userEmail,
      image: currentUser.userImage
    }
  })
  const demoWindow = window !== undefined ? window() : undefined


  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: currentUser.userName,
            email: currentUser.userEmail,
            image: currentUser.userImage
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
      branding={{ title: 'Nexus management' }}
    >
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="employee">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<EmployeeList />} />
            <Route path="create" element={<CreateEmployee />} />
            <Route path=":id" element={<EmployeeDetail />} />
          </Route>
          <Route path="customer">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<CustomerList />} />
            <Route path="create" element={<CreateCustomer />} />
            <Route path=":id" element={<CustomerDetail />} />
          </Route>
          <Route path="equipment">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<EquipmentList />} />
            <Route path="create" element={<CreateEquipment />} />
            <Route path=":id" element={<EquipmentDetail />} />
          </Route>
          <Route path="vendor">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<VendorList />} />
            <Route path="create" element={<CreateVendor />} />
            <Route path=":id" element={<VendorDetail />} />
          </Route>
          <Route path="retail-shop">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<RetailShopList />} />
            <Route path="create" element={<CreateRetailShop />} />
            <Route path=":id" element={<RetailShopDetail />} />
          </Route>
          <Route path="connection-plans">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="list" element={<ConnectionList />} />
            <Route path=":id" element={<ConnectionDetail />} />
            {/* <Route path="create" element={<CreateConnectionPlan />} /> */}
          </Route>
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
          <Route path="billing">
            <Route index element={<Navigate to="list" replace />} />
            <Route path="create" element={<CreateBilling />} />
            <Route path="list" element={<BillingList />} />
          </Route>
          <Route path="payments" element={<Payments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  )
}

export default Layout