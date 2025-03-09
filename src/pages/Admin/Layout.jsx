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
import LanIcon from '@mui/icons-material/Lan'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ReceiptIcon from '@mui/icons-material/Receipt'
import PaymentIcon from '@mui/icons-material/Payment'
import FeedbackIcon from '@mui/icons-material/Feedback'
import SensorsIcon from '@mui/icons-material/Sensors'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Dashboard from '~/pages/Admin/Dashboard/Dashboard'
import NotFound from '~/pages/Admin/NotFound/NotFound'
import CreateOrder from '~/pages/Admin/Orders/CreateOrders/CreateOrder/CreateOrder'
import OrderList from '~/pages/Admin/Orders/OrderList/OrderList'
import Payments from '~/pages/Admin/Payments/Payments'
// import CustomerFeedbackPage from '~/pages/Admin/Feedback/FeedbackCustomer'
// import EmployeeFeedbackPage from '~/pages/Admin/Feedback/FeedbackEmployee'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'
import { useDispatch } from 'react-redux'
import { logoutEmployeeApi } from '~/redux/user/employeeSlice'
import { useConfirm } from 'material-ui-confirm'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
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
import ConnectionPlanList from '~/pages/Admin/ConnectionsPlan/ConnectionList/ConnectionList'
import CreateConnectionPlan from '~/pages/Admin/ConnectionsPlan/CreateConnection/CreateConnection'
import ConnectionPlanDetail from '~/pages/Admin/ConnectionsPlan/ConnectionDetail/ConnectionDetail'
import CreateBilling from '~/pages/Admin/Billing/CreateBilling/CreateBilling'
import BillingList from '~/pages/Admin/Billing/BillingList/BillingList'
import EmployeeDetail from '~/pages/Admin/Employee/EmployeeDetail/EmployeeDetail'
import CustomerDetail from '~/pages/Admin/Customer/CustomerDetail/CustomerDetail'
import EquipmentDetail from '~/pages/Admin/Equipment/EquipmentDetail/EquipmentDetail'
import VendorDetail from '~/pages/Admin/Vendor/VendorDetail/VendorDetail'
import RetailShopDetail from '~/pages/Admin/RetailShop/RetailShopDetail/RetailShopDetail'
import OrderDetail from '~/pages/Admin/Orders/OrderDetail/OrderDetail'
import ProfileManagement from '~/pages/Admin/ProfileManagement/ProfileManagement'
// import EditProfileManagement from '~/pages/Admin/ProfileManagement/EditProfileManagement'
import ConnectionDetail from '~/pages/Admin/Connection/ConnectionDetail/ConnectionDetail'
import ConnectionList from '~/pages/Admin/Connection/ConnectionList/ConnectionList'
import CreateConnection from '~/pages/Admin/Connection/CreateConnection/CreateConnection'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import FeedbackList from '~/pages/Admin/Feedback/FeedbackList/FeedbackList'
import CreateReply from '~/pages/Admin/Feedback/CreateReply/CreateReply'
import CreateWithFeedback from '~/pages/Admin/Feedback/CreateWithFeedback/CreateWithFeedback'
import FeedbackDetail from '~/pages/Admin/Feedback/FeedbackDetail/FeedbackDetail'
import UpdatePassword from '~/pages/Admin/ProfileManagement/UpdatePassword'
// Component bảo vệ Route dựa trên vai trò
const ProtectedRoute = ({ allowedRoles, children }) => {
  const currentUser = useSelector(selectCurrentUser)
  if (!allowedRoles.includes(currentUser.userRole)) {
    return <Navigate to="/management/not-found" replace />
  }
  return children
}

const NAVIGATION = (currentUser) => {
  const baseNav = []
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
      {
        segment: 'management/customer',
        title: 'Customer',
        icon: <EmojiPeopleIcon />,
        children: [
          { segment: 'list', title: 'Customer List' },
          { segment: 'create', title: 'Create Customer' }
        ]
      },
      {
        segment: 'management/equipment',
        title: 'Equipment',
        icon: <InventoryIcon />,
        children: [
          { segment: 'list', title: 'Equipment List' },
          { segment: 'create', title: 'Create Equipment' }
        ]
      },
      {
        segment: 'management/vendor',
        title: 'Vendor',
        icon: <BusinessIcon />,
        children: [
          { segment: 'list', title: 'Vendor List' },
          { segment: 'create', title: 'Create Vendor' }
        ]
      },
      {
        segment: 'management/retail-shop',
        title: 'Retail Shop',
        icon: <StoreIcon />,
        children: [
          { segment: 'list', title: 'Retail Shop List' },
          { segment: 'create', title: 'Create Retail Shop' }
        ]
      },
      {
        segment: 'management/connection-plans',
        title: 'Connection Plan',
        icon: <LanIcon />,
        children: [
          { segment: 'list', title: 'Connection Plan List' },
          { segment: 'create', title: 'Create Connection' }
        ]
      },
      {
        segment: 'management/connection',
        title: 'Connection',
        icon: <SensorsIcon />,
        children: [
          { segment: 'list', title: 'Connection List' },
          { segment: 'create', title: 'Create Connection' }
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
      {
        segment: 'management/billing',
        title: 'Billing',
        icon: <ReceiptIcon />,
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
          { segment: 'list', title: 'Feedback List' },
          // { segment: 'create', title: 'Create Feedback' },
          { segment: 'create-with-feedback', title: 'Create With Feedback' }
        ]
      }
    )
  } else if (currentUser.userRole === 'css') {
    baseNav.push(
      {
        segment: 'management/orders',
        title: 'Order',
        icon: <AssignmentIcon />,
        children: [
          { segment: 'create', title: 'Create Order' },
          { segment: 'list', title: 'Order List' }
        ]
      }
      // {
      //   segment: 'management/billing',
      //   title: 'Billing',
      //   icon: <ReceiptIcon />,
      //   children: [{ segment: 'list', title: 'Billing List' }]
      // },
      // { segment: 'management/payments', title: 'Payment', icon: <PaymentIcon /> },
      // {
      //   segment: 'management/feedbacks',
      //   title: 'Feedback',
      //   icon: <FeedbackIcon />,
      //   children: [{ segment: 'customer', title: 'Customer Feedback' }]
      // }
    )
  } else if (currentUser.userRole === 'tes') {
    baseNav.push(
      {
        segment: 'management/orders',
        title: 'Order',
        icon: <AssignmentIcon />,
        children: [{ segment: 'list', title: 'Order List' }]
      },
      {
        segment: 'management/connection-plans',
        title: 'Connection Plan',
        icon: <LanIcon />,
        children: [
          { segment: 'list', title: 'Connection Plan List' },
          { segment: 'create', title: 'Create Connection' }
        ]
      },
      {
        segment: 'management/connection',
        title: 'Connection',
        icon: <SensorsIcon />,
        children: [
          { segment: 'list', title: 'Connection List' },
          { segment: 'create', title: 'Create Connection' }
        ]
      },
      {
        segment: 'management/equipment',
        title: 'Equipment',
        icon: <InventoryIcon />,
        children: [
          { segment: 'list', title: 'Equipment List' },
          { segment: 'create', title: 'Create Equipment' }
        ]
      }
    )
  } else if (currentUser.userRole === 'acs') {
    baseNav.push(
      {
        segment: 'management/billing',
        title: 'Billing',
        icon: <ReceiptIcon />,
        children: [
          { segment: 'create', title: 'Create Billing' },
          { segment: 'list', title: 'Billing List' }
        ]
      },
      { segment: 'management/payments', title: 'Payment', icon: <PaymentIcon /> }
    )
  }
  return baseNav
}

const getDefaultRoute = (currentUser) => {
  const nav = NAVIGATION(currentUser)
  if (nav.length === 0) return '/not-found'
  const firstNavItem = nav[0]
  if (firstNavItem.children && firstNavItem.children.length > 0) {
    return `/${firstNavItem.segment}/${firstNavItem.children[0].segment}`
  }
  return `/${firstNavItem.segment}`
}

const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: 'data-toolpad-color-scheme' },
  colorSchemes: { light: true, dark: true },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } }
})

const CustomToolbarAccount = ({ onLogout }) => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleProfile = () => {
    navigate('/management/profile')
    handleClose()
  }

  const handleLogout = () => {
    onLogout()
    handleClose()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        onClick={handleClick}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        <Avatar
          src={currentUser.userImage}
          alt={currentUser.userName}
          sx={{ width: 40, height: 40, border: '1px solid #e0e0e0' }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 200,
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px'
          }
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center'
        }}>
        </Box>
        <MenuItem
          onClick={handleProfile}
          sx={{
            '&:hover': {
              color: 'primary.dark',
              '& .profile-icon': {
                color: 'primary.dark'
              }
            }
          }}
        >
          <ListItemIcon>
            <PersonIcon className='profile-icon' fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            '&:hover': {
              color: 'warning.dark',
              '& .logout-icon': {
                color: 'warning.dark'
              }
            }
          }}
        >
          <ListItemIcon>
            <LogoutIcon className='logout-icon' fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
}

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
  }, [currentUser])

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
      <DashboardLayout
        slots={{ toolbarAccount: () => <CustomToolbarAccount onLogout={handleLogout} /> }}
        slotProps={{
          sidebar: {
            sx: {
              width: '100px !important',
              minWidth: '100px !important'
            }
          },
          toolbarAccount: { sx: { mr: 2 } }
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              currentUser.userRole === 'admin' ? (
                <ProtectedRoute allowedRoles={['admin']}><Dashboard /></ProtectedRoute>
              ) : (
                <Navigate to={getDefaultRoute(currentUser)} replace />
              )
            }
          />
          <Route
            path="profile"
            element={<ProtectedRoute allowedRoles={['admin', 'css', 'tes', 'acs']}><ProfileManagement /></ProtectedRoute>}
          />
          <Route
            path="profile/update-password"
            element={<ProtectedRoute allowedRoles={['admin', 'css', 'tes', 'acs']}><UpdatePassword /></ProtectedRoute>}
          />
          <Route path="employee">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin']}><EmployeeList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin']}><CreateEmployee /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin']}><EmployeeDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="customer">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin']}><CustomerList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin']}><CreateCustomer /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin']}><CustomerDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="equipment">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><EquipmentList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><CreateEquipment /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><EquipmentDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="vendor">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin']}><VendorList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin']}><CreateVendor /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin']}><VendorDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="retail-shop">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin']}><RetailShopList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin']}><CreateRetailShop /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin']}><RetailShopDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="connection-plans">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><ConnectionPlanList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><CreateConnectionPlan /></ProtectedRoute>}
            />
            <Route
              path=":slug"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><ConnectionPlanDetail /></ProtectedRoute>}
            />
          </Route>

          <Route path="connection">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><ConnectionList /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><CreateConnection /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin', 'tes']}><ConnectionDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="orders">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin', 'css']}><CreateOrder /></ProtectedRoute>}
            />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin', 'css', 'tes']}><OrderList /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin', 'css', 'tes']}><OrderDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="feedbacks">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin', 'css']}><FeedbackList /></ProtectedRoute>}
            />
            <Route
              path="create-with-feedback"
              element={<ProtectedRoute allowedRoles={['admin', 'css']}><CreateWithFeedback /></ProtectedRoute>}
            />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin', 'css']}><CreateReply /></ProtectedRoute>}
            />
            <Route
              path=":id"
              element={<ProtectedRoute allowedRoles={['admin', 'css']}><FeedbackDetail /></ProtectedRoute>}
            />
          </Route>
          <Route path="billing">
            <Route index element={<Navigate to="list" replace />} />
            <Route
              path="create"
              element={<ProtectedRoute allowedRoles={['admin', 'acs']}><CreateBilling /></ProtectedRoute>}
            />
            <Route
              path="list"
              element={<ProtectedRoute allowedRoles={['admin', 'css', 'acs']}><BillingList /></ProtectedRoute>}
            />
          </Route>
          <Route
            path="payments"
            element={<ProtectedRoute allowedRoles={['admin', 'css', 'acs']}><Payments /></ProtectedRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DashboardLayout>
    </AppProvider>
  )
}

export default Layout