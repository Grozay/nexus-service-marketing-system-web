import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '~/components/Loading/Loading'
import Layout from '~/pages/Admin/Layout'

const Auth = lazy(() => import('~/pages/Customer/Auth/Auth'))
const Home = lazy(() => import('~/pages/Customer/Home/Home'))
const ServicePage = lazy(() => import('~/pages/Customer/Service/Service'))
const ServiceCatogory = lazy(() => import('~/pages/Customer/Service/ServiceCatogory'))
const ServiceDetail = lazy(() => import('~/pages/Customer/Service/ServiceDetail/ServiceDetail'))
const Register = lazy(() => import('~/pages/Customer/Register/Register'))
const Profile = lazy(() => import('~/pages/Customer/Profile/Profile'))
const Support = lazy(() => import('~/pages/Customer/Support/Support'))
const AboutUs = lazy(() => import('~/pages/Customer/AboutUs/AboutUs'))
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
    return <Navigate to='/management/login' replace={true} />
  }
  return <Outlet />
}

function App() {
  const currentUser = useSelector(state => state.user.currentUser)
  const currentAccount = useSelector(state => state.account.currentAccount)

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/services' element={<ServiceCatogory />} />
          <Route path='/service/:slug' element={<ServicePage />} />
          <Route path='/service/:slug/detail' element={<ServiceDetail />} />
          <Route path='/support' element={<Support />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/register/:slug' element={<Register />} />
          <Route path='/feedback' element={<Feedback />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:slug' element={<NewsDetail />} />

          {currentAccount ? (
            <>
              {/*If customer is logged in, redirect to home page*/}
              <Route path='/account/login' element={
                <Navigate to='/' replace={true} />} />
              <Route path='/account/reset-password' element={
                <Navigate to='/' replace={true} />} />
              <Route path='/account/profile' element={<Profile />} />
              <Route path='/account/profile/registered-plans' element={<RegisteredPlans />} />
              <Route path='/account/profile/registered-plans/:slug' element={<RegisterPlansDetail />} />
              <Route path='/account/profile/update-profile' element={<UpdateProfile />} />
              <Route path='/account/profile/change-password' element={<ChangePassword />} />
              <Route path='/account/profile/order-status' element={<OrderStatus />} />
            </>
          ) : (
            <>
              {/* If customer is not logged in, redirect to login page*/}
              <Route path='/account/login' element={<Auth />} />
              <Route path='/account/reset-password' element={<Auth />} />
              <Route path='/account/profile' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/registered-plans' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/registered-plans/:slug' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/update-profile' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/change-password' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/order-status' element={
                <Navigate to='/account/login' replace={true} />} />
            </>
          )}

          {/* Route 404*/}
          <Route path='*' element={<NotFound />} />

          {/* Protect Admin Route */}
          <Route path='/admin/login' element={<AuthAdmin />} />
          <Route path='/admin/*' element={<ProtectedRoute user={currentUser} />}>
            <Route path='*' element={<Layout />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App

