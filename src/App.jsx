// import { useState } from 'react'
// import reactLogo from '~/assets/react.svg'
// import Stack from '@mui/material/Stack'
// import Button from '@mui/material/Button'
import Auth from '~/pages/Auth/Auth'
import Home from '~/pages/Home/Home'
import Service from '~/pages/Service/Service'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
import Profile from '~/pages/Profile/Profile'
import Support from '~/pages/Support/Support'
import AboutUs from '~/pages/AboutUs/AboutUs'
function App() {

  return (
    <Box>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/service' element={<Service />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/support' element={<Support />} />
        <Route path='/about-us' element={<AboutUs />} />
      </Routes>
    </Box>
  )
}

export default App

