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
// import Equipment from '~/pages/Equipment/Equipment'
// import EquipmentDetail from '~/pages/Equipment/EquipmentDetail/EquipmentDetail'
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
        {/* <Route path='/equipment' element={<Equipment />} /> */}
        {/* <Route path='/equipment/:slug' element={<EquipmentDetail />} /> */}
      </Routes>
    </Box>
  )
}

export default App

