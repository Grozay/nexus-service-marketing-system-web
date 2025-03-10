import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Grid, Button } from '@mui/material'
import LinkIcon from '@mui/icons-material/Link'
import TagIcon from '@mui/icons-material/Tag'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIcon from '@mui/icons-material/Phone'
import { getConnectionByOrderIdAPI } from '~/apis'
import Loading from '~/components/Loading/Loading'
import { useEffect, useState } from 'react'
import { formatDate } from '~/utils/formatter'

export default function Connection({ orderId }) {
  const [connections, setConnections] = useState([])
  const [loading, setLoading] = useState(true)
  const [visibleCount, setVisibleCount] = useState(2)

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        setLoading(true)
        const response = await getConnectionByOrderIdAPI(orderId)
        setConnections(Array.isArray(response) ? response : [response])
      } finally {
        setLoading(false)
      }
    }
    fetchConnections()
  }, [orderId])

  if (loading) return <Loading />

  const visibleConnections = connections.slice(0, visibleCount)
  const hasMore = connections.length > visibleCount

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 2)
  }

  return (
    <>
      {visibleConnections.map((connection, index) => (
        <Card key={connection.connectionId || index} sx={{ boxShadow: 3, marginBottom: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Connection {connection.connectionId}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <LinkIcon />
                    </ListItemIcon>
                    <ListItemText primary="Connection ID" secondary={connection.connectionId} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <TagIcon />
                    </ListItemIcon>
                    <ListItemText primary="Connection Name" secondary={connection.connectionName} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Status" secondary={connection.connectionStatus} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={6}>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarTodayIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Start Date"
                      secondary={formatDate(connection.connectionCreatedAt)}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Technical Staff"
                      secondary={connection.employeeDetails?.employeeName}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Support Phone"
                      secondary={connection.employeeDetails?.employeePhone}
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