// import { useState } from 'react'
// import reactLogo from '~/assets/react.svg'
import './App.css'
// import Stack from '@mui/material/Stack'
// import Button from '@mui/material/Button'
import Auth from '~/pages/Auth/Auth'
import Home from '~/pages/Home/Home'
import { Routes, Route } from 'react-router-dom'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth />} />
      </Routes>
      {/* <Auth /> */}
    </>
  )
}

export default App

