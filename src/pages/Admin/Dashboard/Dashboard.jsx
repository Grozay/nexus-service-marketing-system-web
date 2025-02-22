import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import { LineChart } from '@mui/x-charts'
import { PieChart } from '@mui/x-charts'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useTheme } from '@mui/material/styles'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna'

const Dashboard = () => {
  const theme = useTheme()

  // Mock data for charts
  const salesData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 2000 },
    { month: 'Apr', sales: 2780 },
    { month: 'May', sales: 1890 },
    { month: 'Jun', sales: 2390 },
    { month: 'Jul', sales: 3490 }
  ]

  const userData = [
    { id: 1, name: 'John Doe', role: 'Admin', lastLogin: '2023-10-01' },
    { id: 2, name: 'Jane Smith', role: 'Manager', lastLogin: '2023-10-02' },
    { id: 3, name: 'Alice Johnson', role: 'Staff', lastLogin: '2023-10-03' }
  ]

  const pieData = [
    { id: 0, value: 10, label: 'Dial-Up' },
    { id: 1, value: 15, label: 'Broadband' },
    { id: 2, value: 20, label: 'Landline' }
  ]

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default }}>
      <Typography variant="h4" component="h1" gutterBottom color={theme.palette.text.primary}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3} mb={3}>
        {/* Quick Stats */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: theme.palette.primary.light, color: theme.palette.primary.contrastText, minHeight: 150 }}>
            {/* Quick Stats container */}
            <Box display="flex" alignItems="center" mb={1}>
              <PeopleIcon sx={{ mr: 1, fontSize: '2rem' }} />
              <Typography variant="h6" gutterBottom color="inherit">
                Total Users
              </Typography>
            </Box>
            <Typography variant="h4" color="inherit">
              1,234
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: theme.palette.secondary.light, color: theme.palette.secondary.contrastText, minHeight: 150 }}>
            {/* Active Connections container */}
            <Box display="flex" alignItems="center" mb={1}>
              <SettingsInputAntennaIcon sx={{ mr: 1, fontSize: '2rem' }} />
              <Typography variant="h6" gutterBottom color="inherit">
                Active Connections
              </Typography>
            </Box>
            <Typography variant="h4" color="inherit">
              5,678
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: theme.palette.success.light, color: theme.palette.success.contrastText, minHeight: 150 }}>
            {/* Monthly Revenue container */}
            <Box display="flex" alignItems="center" mb={1}>
              <AttachMoneyIcon sx={{ mr: 1, fontSize: '2rem' }} />
              <Typography variant="h6" gutterBottom color="inherit">
                Monthly Revenue
              </Typography>
            </Box>
            <Typography variant="h4" color="inherit">
              $123,456
            </Typography>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <Paper elevation={3} sx={{ p: 2, bgcolor: theme.palette.warning.light, color: theme.palette.warning.contrastText, minHeight: 150 }}>
            {/* Sales Growth container */}
            <Box display="flex" alignItems="center" mb={1}>
              <TrendingUpIcon sx={{ mr: 1, fontSize: '2rem' }} />
              <Typography variant="h6" gutterBottom color="inherit">
                Sales Growth
              </Typography>
            </Box>
            <Typography variant="h4" color="inherit">
              +15%
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sales Overview */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color={theme.palette.text.primary}>
              Sales Overview
            </Typography>
            <LineChart
              xAxis={[{ data: salesData.map((item) => item.month), scaleType: 'band' }]}
              series={[{ data: salesData.map((item) => item.sales), color: theme.palette.primary.main }]}
              height={300}
            />
          </Paper>
        </Grid>

        {/* Connection Distribution  */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color={theme.palette.text.primary} align="center">
              Connection Distribution
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
              <PieChart
                series={[
                  {
                    data: pieData,
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    highlightScope: { fade: 'global', highlight: 'item' },
                    colors: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.success.main],
                    innerRadius: 0,
                    cx: '75%',
                    cy: '55%'
                  }
                ]}
                slotProps={{
                  legend: {
                    direction: 'row',
                    position: { vertical: 'top', horizontal: 'center' },
                    padding: 0,
                    itemMarkWidth: 10,
                    itemMarkHeight: 10,
                    markGap: 5,
                    itemGap: 10
                  }
                }}
                height={300}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid size={{ xs: 12 }}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom color={theme.palette.text.primary}>
              Recent Activities
            </Typography>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={userData}
                columns={[
                  { field: 'name', headerName: 'Name', width: 200 },
                  { field: 'role', headerName: 'Role', width: 150 },
                  { field: 'lastLogin', headerName: 'Last Login', width: 200 }
                ]}
                slots={{ toolbar: GridToolbar }}
                sx={{
                  '& .MuiDataGrid-toolbarContainer': {
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: theme.spacing(0, 2)
                  }
                }}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard