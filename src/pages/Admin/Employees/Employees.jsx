import React from 'react'
import { Box, Typography } from '@mui/material'

const Employees = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Employee Management
      </Typography>
      <Typography variant="body1">
        Manage your employees here
      </Typography>
    </Box>
  )
}

export default Employees