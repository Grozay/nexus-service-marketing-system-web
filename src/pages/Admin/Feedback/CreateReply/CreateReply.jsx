import { useState } from 'react'
import { Box, Typography, TextField, Button, Card, CardContent, Rating } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createReplyFeedbackAPI, updateFeedbackAPI } from '~/apis'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/employeeSlice'

const CreateReply = () => {
  const location = useLocation()
  const { orderId, feedbackSubject, feedbackMessage, feedbackRating, feedbackId } = location.state || {}
  const [replyMessage, setReplyMessage] = useState('')
  const navigate = useNavigate()
  // Lấy employeeId từ Redux store
  const employee = useSelector(selectCurrentUser)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!feedbackId) {
      toast.error('Feedback ID is missing')
      return
    }

    try {
      const replyData = {
        feedbackId: feedbackId,
        employeeId: employee.userId,
        replyMessage: replyMessage
      }

      await createReplyFeedbackAPI(replyData)
      await updateFeedbackAPI({ feedbackId: feedbackId, feedbackStatus: 'Resolved' })
      toast.success('Reply sent successfully')
      navigate('/management/feedbacks')
    } catch {
      toast.error('Failed to send reply. Please try again.')
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reply to Feedback
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Feedback Details
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Order ID: {orderId}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Subject: {feedbackSubject}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Message:</Typography>
            <Typography variant="body1">{feedbackMessage}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Rating:</Typography>
            <Rating value={feedbackRating} readOnly />
          </Box>
        </CardContent>
      </Card>

      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Your Reply"
          variant="outlined"
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          required
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Send Reply
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateReply
