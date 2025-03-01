import { useState, useEffect } from 'react'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import { connectionsPlans } from '~/apis/connections-plans.js'
import { Store } from '~/apis/mock-data.js'
import { toast } from 'react-toastify'
const SelectPlan = ({ onNext, setPlanData, setStoreData }) => {
  // Initialize state with null instead of empty string to avoid controlled/uncontrolled switch
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [selectedStore, setSelectedStore] = useState(null)
  const [allPlans, setAllPlans] = useState([])
  const [allStores, setAllStores] = useState([])

  // Fetch plans and stores data
  useEffect(() => {
    // Process plans data
    const plans = []
    connectionsPlans.forEach(connection => {
      connection.plans.forEach(plan => {
        plans.push(plan)
      })
    })
    setAllPlans(plans)

    // Fetch stores data (assuming stores.js exports an array of stores)
    setAllStores(Store)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate selection
    if (selectedPlan === null || selectedStore === null) {
      alert('Please select plan and store')
      return
    }

    // Find selected plan and store
    const selectedPlanData = allPlans.find(plan => plan.planId === selectedPlan)
    const selectedStoreData = allStores.find(store => store.id === selectedStore)

    // Pass data to parent component
    if (selectedPlanData && selectedStoreData) {
      setPlanData(selectedPlanData)
      setStoreData(selectedStoreData)
      onNext()
    } else {
      toast.error('Not found plan or store')
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Select Plan
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="plan-label">Plan</InputLabel>
            <Select
              labelId="plan-label"
              label="Plan"
              fullWidth
              margin="normal"
              value={selectedPlan || ''} // Use empty string as fallback to maintain controlled state
              onChange={(e) => setSelectedPlan(e.target.value)}
              required
            >
              {allPlans.map((plan) => (
                <MenuItem key={plan.planId} value={plan.planId}>
                  {plan.planName} - {plan.planPrice} VND
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl fullWidth>
            <InputLabel id="store-label">Store</InputLabel>
            <Select
              labelId="store-label"
              label="Store"
              fullWidth
              margin="normal"
              value={selectedStore || ''} // Use empty string as fallback to maintain controlled state
              onChange={(e) => setSelectedStore(e.target.value)}
              required
            >
              {allStores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.storeName} - {store.storeCity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Next
      </Button>
    </Box>
  )
}

export default SelectPlan