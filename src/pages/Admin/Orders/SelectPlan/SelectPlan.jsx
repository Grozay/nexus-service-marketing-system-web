import React, { useState } from 'react'
import { Select, MenuItem, Button, Box, Typography, FormControl, InputLabel } from '@mui/material'
import { connectionsPlans } from '~/apis/connections-plans.js'

const SelectPlan = ({ onNext, setPlanData }) => {
  const [selectedPlan, setSelectedPlan] = useState('')
  const [allPlans, setAllPlans] = useState([])

  // Lấy tất cả các plan từ connectionsPlans
  useState(() => {
    const plans = []
    connectionsPlans.forEach(connection => {
      connection.plans.forEach(plan => {
        plans.push(plan)
      })
    })
    setAllPlans(plans)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Tìm plan được chọn từ allPlans
    const selectedPlanData = allPlans.find(plan => plan.planId === selectedPlan)
    setPlanData(selectedPlanData)
    onNext()
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select Plan
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="plan-label">Plan</InputLabel>
        <Select
          labelId="plan-label"
          label="Plan"
          fullWidth
          margin="normal"
          value={selectedPlan}
          onChange={(e) => setSelectedPlan(e.target.value)}
        >
          {allPlans.map((plan) => (
            <MenuItem key={plan.planId} value={plan.planId}>
              {plan.planName} - {plan.planPrice} VND
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Next
      </Button>
    </Box>
  )
}

export default SelectPlan