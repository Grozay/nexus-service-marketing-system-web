import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getAllFeedbacksAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'

// Fetch all feedbacks from API
const getAllFeedbacks = async () => {
  try {
    const response = await getAllFeedbacksAPI()
    if (!Array.isArray(response)) {
      return []
    }
    return response
      .filter(feedback => ['Processing', 'Reviewed'].includes(feedback.feedbackStatus))
      .map((feedback, index) => ({
        id: index + 1,
        feedbackId: feedback.feedbackId,
        orderId: feedback.orderId,
        subject: feedback.feedbackSubject,
        message: feedback.feedbackMessage,
        rating: feedback.feedbackRating,
        status: feedback.feedbackStatus,
        createdAt: formatDate(feedback.feedbackCreatedAt)
      }))
  } catch (error) {
    throw new Error('Error fetching feedbacks:', error)
  }
}

const CreateWithFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [ratingFilter, setRatingFilter] = useState('all')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbacks = await getAllFeedbacks()
        setFeedbacks(feedbacks)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchData()
  }, [])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleRatingFilterChange = (event) => {
    setRatingFilter(event.target.value)
  }

  const handleReply = (feedback) => {
    navigate('/management/feedbacks/create', {
      state: {
        feedbackId: feedback.feedbackId,
        orderId: feedback.orderId,
        feedbackSubject: feedback.subject,
        feedbackMessage: feedback.message,
        feedbackRating: feedback.rating
      }
    })
  }

  const filteredFeedbacks = feedbacks.filter(feedback =>
    (feedback.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feedback.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (ratingFilter === 'all' || feedback.rating === parseInt(ratingFilter))
  )

  const columns = [
    { field: 'feedbackId', headerName: 'Feedback ID', width: 80 },
    // { field: 'orderId', headerName: 'Order ID', width: 150 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'message', headerName: 'Message', width: 300 },
    { field: 'rating', headerName: 'Rating', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleReply(params.row)}
        >
          Reply
        </Button>
      )
    }
  ]

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Feedback Management
      </Typography>

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Search by Order ID or Subject"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <FormControl fullWidth>
              <InputLabel>Rating</InputLabel>
              <Select
                value={ratingFilter}
                label="Rating"
                onChange={handleRatingFilterChange}
              >
                <MenuItem value="all">All Ratings</MenuItem>
                <MenuItem value="1">1 Star</MenuItem>
                <MenuItem value="2">2 Stars</MenuItem>
                <MenuItem value="3">3 Stars</MenuItem>
                <MenuItem value="4">4 Stars</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <DataGrid
            rows={filteredFeedbacks}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ height: '500px' }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default CreateWithFeedback
