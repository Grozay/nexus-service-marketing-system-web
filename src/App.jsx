// import { useState } from 'react'
// import reactLogo from '~/assets/react.svg'
import './App.css'
// import Stack from '@mui/material/Stack'
// import Button from '@mui/material/Button'
import Auth from '~/pages/Auth/Auth'
import Home from '~/pages/Home/Home'
import Service from '~/pages/Service/Service'
import { Routes, Route } from 'react-router-dom'
import Box from '@mui/material/Box'
function App() {

  return (
    <Box>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth />} />
        <Route path='/service' element={<Service />} />
      </Routes>
    </Box>
  )
}

export default App

