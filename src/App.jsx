// import { useState } from 'react'
// import reactLogo from '~/assets/react.svg'
// import Stack from '@mui/material/Stack'
// import Button from '@mui/material/Button'
import Auth from '~/pages/Auth/Auth'
import Home from '~/pages/Home/Home'
import Service from '~/pages/Service/Service'
import ServiceDetail from '~/pages/Service/ServiceDetail/ServiceDetail'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import Profile from '~/pages/Profile/Profile'
import Support from '~/pages/Support/Support'
import AboutUs from '~/pages/AboutUs/AboutUs'
import Subscribe from '~/pages/Subscribe/Subscribe'
import RegisteredPlans from '~/pages/Profile/RegisteredPlans/RegisteredPlans'
import RegisterPlansDetail from '~/pages/Profile/RegisteredPlans/RegisteredPlansDetail/RegisterPlansDetail'
// import AccountAndConnection from '~/pages/Profile/AccountAndConnection/AccountAndConnection'
// import Equipment from '~/pages/Equipment/Equipment'
// import EquipmentDetail from '~/pages/Equipment/EquipmentDetail/EquipmentDetail'
import ChangePassword from '~/pages/Profile/ChangePassword/ChangePassword'
import UpdateProfile from '~/pages/Profile/UpdateProfile/UpdateProfile'
import Feedback from '~/pages/Feedback/feedback'
import OrderStatus from '~/pages/Profile/OrderStatus/OrderStatus'
import News from '~/pages/News/News'
import NewsDetail from '~/pages/News/NewsDetail/NewsDetail'
import NotFound from '~/pages/NotFound/NotFound'
function App() {

  return (
    <Box>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth />} />
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
      </Routes>
    </Box>
  )
}

export default App

