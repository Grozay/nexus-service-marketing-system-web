import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Grid, Button } from '@mui/material'
import CardMembershipIcon from '@mui/icons-material/CardMembership' // Thay cho Subscription ID
import CalendarTodayIcon from '@mui/icons-material/CalendarToday' // Thay cho Start Date & End Date
import CheckCircleIcon from '@mui/icons-material/CheckCircle' // Thay cho Status
import InfoIcon from '@mui/icons-material/Info' // Thay cho Order Information
import AttachMoneyIcon from '@mui/icons-material/AttachMoney' // Thay cho Support Amount
import { getSubscriptionByOrderIdAPI } from '~/apis'
import Loading from '~/components/Loading/Loading'
import { useEffect, useState } from 'react'
import { formatDate } from '~/utils/formatter'

export default function Subscription({ orderId }) {
  const [subscriptions, setSubscriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(2) // Hiển thị 2 subscriptions mặc định

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        setLoading(true)
        const response = await getSubscriptionByOrderIdAPI(orderId)
        setSubscriptions(Array.isArray(response) ? response : [response])
      } finally {
        setLoading(false)
      }
    }
    fetchSubscriptions()
  }, [orderId])

  if (loading) return <Loading />

  const visibleSubscriptions = subscriptions.slice(0, visibleCount)
  const hasMore = subscriptions.length > visibleCount

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 2) // Tăng thêm 2 mỗi khi click
  }

  return (
    <>
      {visibleSubscriptions.map((subscription, index) => (
        <Card key={subscription.subscriptionOrderId || index} sx={{ boxShadow: 3, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Subscription {subscription.subscriptionId}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CardMembershipIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subscription ID" secondary={subscription.subscriptionId} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Start Date"
                      secondary={formatDate(subscription.subscriptionStartDate)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="End Date"
                      secondary={formatDate(subscription.subscriptionEndDate)}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Status"
                      secondary={subscription.subscriptionStatus}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <InfoIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Order Info"
                      secondary={subscription.orderDetails?.orderDescription}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Amount"
                      secondary={subscription.subscriptionAmount}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
      {hasMore && (
        <Button
          variant="contained"
          onClick={handleViewMore}
          sx={{ display: 'block', margin: '20px auto' }}
        >
          View More
        </Button>
      )}
    </>
  )
}