import React from 'react'
import { Box, Typography } from '@mui/material'

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to the Nexus Admin Panel
      </Typography>
    </Box>
  )
}

export default Dashboard
