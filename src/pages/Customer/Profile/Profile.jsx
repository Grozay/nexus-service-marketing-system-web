import { useState, useEffect } from 'react'
import { Container, Box, Avatar, Typography, Tabs, Tab, Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import HomeIcon from '@mui/icons-material/Home'
import VpnKeyIcon from '@mui/icons-material/VpnKey'
import EditIcon from '@mui/icons-material/Edit'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import StoreIcon from '@mui/icons-material/Store'
import PersonIcon from '@mui/icons-material/Person'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import AppBar from '~/components/AppBar/AppBar'
import { getOrderByAccountIdAPI } from '~/apis'
import { useSelector } from 'react-redux'
import { selectCurrentAccount } from '~/redux/user/accountSlice'
import Connection from './OtherTabs/Connection'
import Subscription from './OtherTabs/Subscription'

const Profile = () => {
  const [tabValue, setTabValue] = useState(0)
  const [profileData, setProfileData] = useState(null)
  const [error, setError] = useState(null)
  // const dispatch = useDispatch()
  const currentAccount = useSelector(selectCurrentAccount)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await getOrderByAccountIdAPI(currentAccount.userId)
        setProfileData(response)
      } catch (err) {
        setError(err)
      }
    }
    fetchProfileData()
  }, [currentAccount.userId])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  // if (loading) {
  //   return (
  //     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
  //       <Typography>Loading...</Typography>
  //     </Box>
  //   )
  // }

  if (error || !profileData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Typography color="error">{error || 'No data available'}</Typography>
      </Box>
    )
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4, p: 2, textAlign: 'center' }}>
          <CardContent>
            <Avatar
              alt={profileData.accountDetails.accountName}
              sx={{ width: 100, height: 100, mb: 2, mx: 'auto' }}
            >
              <AccountCircleIcon sx={{ width: 80, height: 80 }} />
            </Avatar>
            <Typography variant="h5" component="h2" gutterBottom>
              {profileData.accountDetails.accountName}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Member since{' '}
              {new Date(profileData.accountDetails.accountCreatedAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 4 }}>
          <Tab label="Personal Info" />
          <Tab label="Order Details" />
          <Tab label="Plan Info" />
          <Tab label="Store Info" />
          <Tab label="Connection" />
          <Tab label="Subscription" />
        </Tabs>

        {/* Tab Content */}
        {tabValue === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={profileData.accountDetails.accountEmail}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone"
                        secondary={profileData.accountDetails.accountPhone}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Address"
                        secondary={profileData.accountDetails.accountAddress}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PersonIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Gender"
                        secondary={profileData.accountDetails.accountGender}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="DOB"
                        secondary={new Date(
                          profileData.accountDetails.accountDOB
                        ).toLocaleDateString()}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Account Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <AccountCircleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Account ID"
                        secondary={profileData.accountDetails.accountId}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PlaylistAddCheckIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Created At"
                        secondary={new Date(
                          profileData.accountDetails.accountCreatedAt
                        ).toLocaleDateString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EditIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="Last Updated"
                        secondary={
                          profileData.accountDetails.accountUpdatedAt
                            ? new Date(
                              profileData.accountDetails.accountUpdatedAt
                            ).toLocaleDateString()
                            : 'N/A'
                        }
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {tabValue === 1 && (
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Details
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>
                  <ListItemText primary="Order ID" secondary={profileData.orderId} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Order Name" secondary={profileData.orderName} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PlaylistAddCheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Status" secondary={profileData.orderStatus} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Created At"
                    secondary={new Date(profileData.orderCreatedAt).toLocaleString()}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText primary="Amount" secondary={`$${profileData.orderAmount}`} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 2 && (
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Plan Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <PlaylistAddCheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Plan Name" secondary={profileData.planDetails.planName} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Plan Type" secondary={profileData.planDetails.planType} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Price"
                    secondary={`$ ${profileData.planDetails.planPrice}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PlaylistAddCheckIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Validity"
                    secondary={profileData.planDetails.planValidity}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Description"
                    secondary={profileData.planDetails.planDescription}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 3 && (
          <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Store Information
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <StoreIcon />
                  </ListItemIcon>
                  <ListItemText primary="Store Name" secondary={profileData.storeDetails.storeName} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Address"
                    secondary={`${profileData.storeDetails.storeAddress}, ${profileData.storeDetails.storeCity}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={profileData.storeDetails.storePhone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PlaylistAddCheckIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Hours"
                    secondary={`${profileData.storeDetails.storeOpenAt} - ${profileData.storeDetails.storeCloseAt}`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        )}

        {tabValue === 4 && (
          <Connection orderId={profileData.orderId} />
        )}

        {tabValue === 5 && (
          <Subscription orderId={profileData.orderId} />
        )}

        <Divider sx={{ my: 4 }} />

        {/* Account Settings */}
        <Card sx={{ boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Account Settings
            </Typography>
            <List dense>
              <ListItem component='a' href="/account/profile/change-password">
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItem>
              <ListItem sx={{ textDecoration: 'none' }} component={Link} to={`/account/profile/send-feedback?orderId=${profileData.orderId}`}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Send Feedback" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Have questions or need support? <Link to="/contact">Contact us</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Profile