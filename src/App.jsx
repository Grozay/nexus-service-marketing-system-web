import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loading from '~/components/Loading/Loading'
import Layout from '~/pages/Admin/Layout'
import PageFly from './pages/Customer/PageFly/PageFly'

const Auth = lazy(() => import('~/pages/Customer/Auth/Auth'))
const Home = lazy(() => import('~/pages/Customer/Home/Home'))
const ServicePage = lazy(() => import('~/pages/Customer/Service/Service'))
const ServiceCatogory = lazy(() => import('~/pages/Customer/Service/ServiceCatogory'))
const ServiceDetail = lazy(() => import('~/pages/Customer/Service/ServiceDetail/ServiceDetail'))
const Register = lazy(() => import('~/pages/Customer/Register/Register'))
const Profile = lazy(() => import('~/pages/Customer/Profile/Profile'))
const Support = lazy(() => import('~/pages/Customer/Support/Support'))
const AboutUs = lazy(() => import('~/pages/Customer/AboutUs/AboutUs'))
const ChangePassword = lazy(() => import('~/pages/Customer/Profile/ChangePassword/ChangePassword'))
const ContactUs = lazy(() => import('~/pages/Customer/ContactUs/ContactUs'))
const Stores = lazy(() => import('~/pages/Customer/Stores/Stores'))
const News = lazy(() => import('~/pages/Customer/News/News'))
const NewsDetails = lazy(() => import('~/pages/Customer/News/NewsDetails/NewsDetails'))
const NotFound = lazy(() => import('~/pages/Customer/NotFound/NotFound'))
const AuthAdmin = lazy(() => import('~/pages/Admin/AuthAdmin/Auth'))
const SendFeedBack = lazy(() => import('~/pages/Customer/Profile/SendFeedback/SendFeedBack'))
const SearchRegistration = lazy(() => import('~/pages/Customer/SearchRegistration/SearchRegistration'))

//giải pháp clean Code trong việc xác định các route nào cần đăng nhập tài khoản xong thì mới cho truy cập sử dụng outlet để hiển thị các child route
const ProtectedRoute = ({ employee }) => {
  if (!employee) {
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
          <Route path='/service/:slug/details' element={<ServiceDetail />} />
          <Route path='/support' element={<Support />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/stores' element={<Stores />} />
          <Route path='/register/:slug' element={<Register />} />
          <Route path='/news' element={<News />} />
          <Route path='/news/:slug' element={<NewsDetails />} />
          <Route path='/search-registration' element={<SearchRegistration />} />

          {currentAccount ? (
            <>
              {/*If customer is logged in, redirect to home page*/}
              <Route path='/account/login' element={
                <Navigate to='/' replace={true} />} />
              <Route path='/account/reset-password' element={
                <Navigate to='/' replace={true} />} />
              {/*Profile Page*/}
              <Route path='/account/profile' element={<Profile />} />
              <Route path='/account/profile/change-password' element={<ChangePassword />} />
              <Route path='/account/profile/send-feedback' element={<SendFeedBack />} />
            </>
          ) : (
            <>
              <Route path='/account/login' element={<Auth />} />
              <Route path='/account/reset-password' element={<Auth />} />
              {/* If customer is not logged in, redirect to login page*/}
              <Route path='/account/profile' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/change-password' element={
                <Navigate to='/account/login' replace={true} />} />
              <Route path='/account/profile/send-feedback' element={
                <Navigate to='/account/login' replace={true} />} />
            </>
          )}

          {/* Route 404*/}
          <Route path='*' element={<NotFound />} />

          {/* Protect Admin Route */}
          <Route path='/management/login' element={<AuthAdmin />} />
          <Route path='/management/*' element={<ProtectedRoute employee={currentUser} />}>
            <Route path='*' element={<Layout />} />
          </Route>
        </Routes>
      </Suspense>
      {/* Popup and Modal */}
      <PageFly />
    </>
  )
}

export default App

