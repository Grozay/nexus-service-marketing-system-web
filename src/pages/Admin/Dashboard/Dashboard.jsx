import { useState, useEffect } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grow from '@mui/material/Grow'
import LinearProgress from '@mui/material/LinearProgress'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import { useTheme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import PeopleIcon from '@mui/icons-material/People'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn'
import CloudIcon from '@mui/icons-material/Cloud'
import AssignmentIcon from '@mui/icons-material/Assignment'
import { getAllOrdersAPI, getAllAccountsAPI, getAllConnectionsAPI, getPlanListAPI } from '~/apis'
import { toast } from 'react-toastify'

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  },
  borderRadius: theme.shape.borderRadius * 2,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2)
}))

const ChartPaper = styled(Paper)(({ theme }) => ({
  height: '100%',
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
}))

const COLORS = ['#1976d2', '#4caf50', '#ff9800', '#f44336']

const Dashboard = () => {
  const theme = useTheme()
  const [revenueData, setRevenueData] = useState([])
  const [serviceData, setServiceData] = useState([])
  const [recentCustomers, setRecentCustomers] = useState([])
  const [plans, setPlans] = useState([])
  const [orders, setOrders] = useState([])
  const [accounts, setAccounts] = useState([])
  const [connections, setConnections] = useState([])
  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orders, accounts, connections, plans] = await Promise.all([
          getAllOrdersAPI(),
          getAllAccountsAPI(),
          getAllConnectionsAPI(),
          getPlanListAPI()
        ])

        setPlans(plans)
        setOrders(orders)
        setAccounts(accounts)
        setConnections(connections)
        const total = orders.reduce((sum, order) => sum + (order.orderAmount || 0), 0)
        setTotalRevenue(total)
        const processedRevenueData = processOrdersData(orders)
        setRevenueData(processedRevenueData)

        const processedServiceData = processConnectionsData(connections)
        setServiceData(processedServiceData)

        const processedRecentCustomers = processAccountsData(accounts)
        setRecentCustomers(processedRecentCustomers)
      } catch {
        toast.error('Error fetching data')
      }
    }

    fetchData()
  }, [])

  // Hàm xử lý dữ liệu orders
  const processOrdersData = (orders) => {
    const monthlyData = orders.reduce((acc, order) => {
      const date = new Date(order.orderCreatedAt);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = {
          revenue: 0,
          customers: new Set() // Sử dụng Set để đếm khách hàng duy nhất
        };
      }

      acc[key].revenue += order.orderAmount || 0;
      acc[key].customers.add(order.accountId); // Thêm accountId vào Set

      return acc;
    }, {});

    return Object.keys(monthlyData).map((key) => {
      const [year, month] = key.split('-');
      return {
        name: new Date(year, month).toLocaleString('default', { month: 'short', year: 'numeric' }),
        revenue: monthlyData[key].revenue,
        customers: monthlyData[key].customers.size // Số lượng khách hàng duy nhất
      };
    });
  };

  // Hàm xử lý dữ liệu connections
  const processConnectionsData = (connections) => {
    const serviceCount = connections.reduce((acc, connection) => {
      const serviceType = connection.orderDetails?.planDetails?.planName || 'Unknown'
      acc[serviceType] = (acc[serviceType] || 0) + 1
      return acc
    }, {})

    return Object.keys(serviceCount).map((service) => ({
      name: service,
      value: serviceCount[service]
    }))
  }

  // Hàm xử lý dữ liệu accounts
  const processAccountsData = (accounts) => {
    return accounts
      .sort((a, b) => new Date(b.accountCreatedAt) - new Date(a.accountCreatedAt))
      .slice(0, 5)
      .map((account) => ({
        id: account.accountId,
        name: account.accountName,
        service: account.categoryDetails?.categoryName || 'Unknown Plan',
        status: account.accountIsActive ? 'Active' : 'Inactive',
        amount: account.orderDetails?.orderAmount || 0
      }))
  }

  return (
    <Box sx={{ p: 3, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 600,
          color: theme.palette.text.primary,
          mb: 4,
          textAlign: 'center'
        }}
      >
        Network Services Dashboard
      </Typography>

      {/* Stats Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {[
          { icon: MonetizationOnIcon, title: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, progress: 75, color: 'primary' },
          {
            icon: PeopleIcon,
            title: 'Customers',
            value: accounts.length,
            subtext: `+${accounts.filter(account => new Date(account.accountCreatedAt) > new Date(new Date().setDate(new Date().getDate() - 30))).length} this month`,
            color: 'success'
          },
          {
            icon: AssignmentIcon,
            title: 'Total Orders',
            value: orders.length,
            subtext: `+${orders.filter(order => new Date(order.orderCreatedAt) > new Date(new Date().setDate(new Date().getDate() - 30))).length} this month`,
            color: 'info'
          },
          { icon: CloudIcon, title: 'Active Plans', value: plans.filter(plan => plan.planIsActive).length, subtext: `${plans.filter(plan => plan.planIsActive && new Date(plan.createdAt) > new Date(new Date().setDate(new Date().getDate() - 30))).length} new plans this month`, color: 'warning' }
        ].map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.title}>
            <Grow in timeout={600 + index * 200}>
              <StyledCard>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <stat.icon sx={{ color: theme.palette[stat.color].main, mr: 1, fontSize: 32 }} />
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>{stat.title}</Typography>
                  </Box>
                  <Typography variant="h4" color={`${stat.color}.main`}>{stat.value}</Typography>
                  {stat.progress && (
                    <LinearProgress
                      variant="determinate"
                      value={stat.progress}
                      sx={{ mt: 2, height: 8, borderRadius: 4 }}
                    />
                  )}
                  {stat.subtext && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {stat.subtext.includes('+') && <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />}
                      {stat.subtext}
                    </Typography>
                  )}
                </CardContent>
              </StyledCard>
            </Grow>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Revenue & Customers Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grow in timeout={800}>
            <ChartPaper>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Revenue & Customers
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData} margin={{ top: 20, right: 20, left: 20, bottom: 15 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[300]} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} fontSize={14} />
                    <YAxis yAxisId="left" stroke={theme.palette.text.secondary} fontSize={14} tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <YAxis yAxisId="right" orientation="right" stroke={theme.palette.text.secondary} fontSize={14} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.shape.borderRadius,
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[2]
                      }}
                      formatter={(value, name) => [
                        name === 'revenue' ? `$${value.toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Customers'
                      ]}
                    />
                    <Legend wrapperStyle={{ paddingTop: 10 }} />
                    <Bar yAxisId="left" dataKey="revenue" fill={theme.palette.primary.main} name="Revenue" barSize={30} radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="revenue" position="top" formatter={(value) => `$${value.toLocaleString()}`} style={{ fill: theme.palette.primary.main, fontSize: 12, fontWeight: 'bold' }} />
                    </Bar>
                    <Bar yAxisId="right" dataKey="customers" fill={theme.palette.success.main} name="Customers" barSize={30} radius={[4, 4, 0, 0]}>
                      <LabelList dataKey="customers" position="top" style={{ fill: theme.palette.success.main, fontSize: 12, fontWeight: 'bold' }} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </ChartPaper>
          </Grow>
        </Grid>

        {/* Service Distribution */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Grow in timeout={1000}>
            <ChartPaper>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Service Distribution
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={serviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={true}
                    >
                      {serviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value}`, name]}
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: theme.shape.borderRadius,
                        border: `1px solid ${theme.palette.divider}`
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: 10 }} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </ChartPaper>
          </Grow>
        </Grid>
      </Grid>

      {/* Recent Customers */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <Grow in timeout={1200}>
            <ChartPaper>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Customers
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentCustomers.map((customer) => (
                    <TableRow key={customer.id} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>{customer.name[0]}</Avatar>
                          {customer.name}
                        </Box>
                      </TableCell>
                      <TableCell>{customer.service}</TableCell>
                      <TableCell>
                        <Chip
                          label={customer.status}
                          color={customer.status === 'Active' ? 'success' : 'warning'}
                          size="small"
                          sx={{ minWidth: 80 }}
                        />
                      </TableCell>
                      <TableCell>{customer.amount.toLocaleString()} VND</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ChartPaper>
          </Grow>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard