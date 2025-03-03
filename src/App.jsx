import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import Loading from '~/components/Loading/Loading'
import Layout from '~/pages/Admin/Layout'

const Auth = lazy(() => import('~/pages/Customer/Auth/Auth'))
const Home = lazy(() => import('~/pages/Customer/Home/Home'))
const Service = lazy(() => import('~/pages/Customer/Service/Service'))
const ServiceDetail = lazy(() => import('~/pages/Customer/Service/ServiceDetail/ServiceDetail'))
const Profile = lazy(() => import('~/pages/Customer/Profile/Profile'))
const Support = lazy(() => import('~/pages/Customer/Support/Support'))
const AboutUs = lazy(() => import('~/pages/Customer/AboutUs/AboutUs'))
const Subscribe = lazy(() => import('~/pages/Customer/Subscribe/Subscribe'))
const RegisteredPlans = lazy(() => import('~/pages/Customer/Profile/RegisteredPlans/RegisteredPlans'))
const RegisterPlansDetail = lazy(() => import('~/pages/Customer/Profile/RegisteredPlans/RegisteredPlansDetail/RegisterPlansDetail'))
const ChangePassword = lazy(() => import('~/pages/Customer/Profile/ChangePassword/ChangePassword'))
const UpdateProfile = lazy(() => import('~/pages/Customer/Profile/UpdateProfile/UpdateProfile'))
const Feedback = lazy(() => import('~/pages/Customer/Feedback/feedback'))
const OrderStatus = lazy(() => import('~/pages/Customer/Profile/OrderStatus/OrderStatus'))
const News = lazy(() => import('~/pages/Customer/News/News'))
const NewsDetail = lazy(() => import('~/pages/Customer/News/NewsDetail/NewsDetail'))
const NotFound = lazy(() => import('~/pages/Customer/NotFound/NotFound'))
const AuthAdmin = lazy(() => import('~/pages/Admin/AuthAdmin/Auth'))

//giải pháp clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập sử dụng outlet để hiển thị các child route
const ProtectedRoute = ({ user }) => {
  if (!user) {
    return <Navigate to='/admin/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  const { currentUser } = useSelector(state => state.user)
  return (
    <Box>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Auth />} />
          <Route path='/reset-password' element={<Auth />} />
          <Route path='/admin/login' element={<AuthAdmin />} />
          {/* <Route path='/register' element={<Auth />} /> */}
          <Route path='/service/:slug' element={<Service />} />
          <Route path='/service/:slug/detail' element={<ServiceDetail />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/support' element={<Support />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/subscribe/:slug' element={<Subscribe />} />
          <Route path='/profile/registered-plans' element={<RegisteredPlans />} />
          <Route path='/profile/registered-plans/:slug' element={<RegisterPlansDetail />} />
          <Route path='/profile/update-profile' element={<UpdateProfile />} />
          {/* <Route path='/profile/account-and-connection' element={<AccountAndConnection />} /> */}
          {/* <Route path='/equipment' element={<Equipment />} /> */}
          {/* <Route path='/equipment/:slug' element={<EquipmentDetail />} /> */}
          <Route path='/profile/change-password' element={<ChangePassword />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/profile/order-status' element={<OrderStatus />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:slug' element={<NewsDetail />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/admin/*' element={<ProtectedRoute user={currentUser} />}>
            <Route path='*' element={<Layout />} />
          </Route>
        </Routes>
      </Suspense>
    </Box>
  )
}

export default App

