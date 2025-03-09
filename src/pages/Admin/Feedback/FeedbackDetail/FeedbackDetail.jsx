import { useState, useEffect } from 'react'
import { Box, Typography, Card, CardContent, Button, Rating, TextField, Chip, Divider } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getFeedbackByOrderIdAPI, getReplyFeedbackByOrderIdAPI, updateReplyFeedbackAPI, deleteReplyFeedbackAPI } from '~/apis'
import { formatDate } from '~/utils/formatter'
import { useConfirm } from 'material-ui-confirm'
import { ArrowBack } from '@mui/icons-material'

const FeedbackDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [feedback, setFeedback] = useState(null)
  const [replies, setReplies] = useState([])
  const [editingReplyId, setEditingReplyId] = useState(null)
  const [editedMessage, setEditedMessage] = useState('')
  const confirm = useConfirm()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const feedbackData = await getFeedbackByOrderIdAPI(id)
        setFeedback(feedbackData[0])

        const repliesData = await getReplyFeedbackByOrderIdAPI(id)
        setReplies(repliesData)
      } catch {
        toast.error('Failed to fetch feedback details')
      }
    }

    fetchData()
  }, [id])

  const handleEditReply = (replyId, currentMessage) => {
    setEditingReplyId(replyId)
    setEditedMessage(currentMessage)
  }

  const handleSaveEdit = async (replyId) => {
    try {
      await confirm({
        title: 'Confirm Update',
        description: 'Are you sure you want to update this reply?',
        confirmationText: 'Update',
        cancellationText: 'Cancel'
      })

      await updateReplyFeedbackAPI({
        replyId,
        replyMessage: editedMessage
      })
      setReplies(replies.map(reply =>
        reply.replyId === replyId ? { ...reply, replyMessage: editedMessage } : reply
      ))
      setEditingReplyId(null)
      toast.success('Reply updated successfully')
    } catch (error) {
      if (error !== 'cancel') {
        toast.error('Failed to update reply')
      }
    }
  }

  const handleDeleteReply = async (replyId) => {
    try {
      await confirm({
        title: 'Confirm Delete',
        description: 'Are you sure you want to delete this reply?',
        confirmationText: 'Delete',
        cancellationText: 'Cancel'
      })

      await deleteReplyFeedbackAPI(replyId)
      setReplies(replies.filter(reply => reply.replyId !== replyId))
      toast.success('Reply deleted successfully')
    } catch (error) {
      if (error !== 'cancel') {
        toast.error('Failed to delete reply')
      }
    }
  }

  if (!feedback) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" gutterBottom>
          Feedback Details
        </Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Order ID: {feedback.orderId}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Subject: {feedback.feedbackSubject}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Message:</Typography>
            <Typography variant="body1">{feedback.feedbackMessage}</Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Rating:</Typography>
            <Rating
              value={Number(feedback.feedbackRating)}
              readOnly
              precision={0.5}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Status:</Typography>
            <Chip
              label={feedback.feedbackStatus}
              color={
                feedback.feedbackStatus === 'Resolved' ? 'success' :
                  feedback.feedbackStatus === 'Processing' ? 'warning' :
                    'info'
              }
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Created Date:</Typography>
            <Typography variant="body1">{formatDate(feedback.feedbackCreatedAt)}</Typography>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" gutterBottom>
        Replies
      </Typography>

      {replies.length > 0 ? (
        replies.map((reply) => (
          <Card key={reply.replyId} sx={{ mb: 2 }}>
            <CardContent>
              {editingReplyId === reply.replyId ? (
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={editedMessage}
                    onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button
                      variant="contained"
                      onClick={() => handleSaveEdit(reply.replyId)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingReplyId(null)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              ) : (
                <>
                  <Typography variant="body1">{reply.replyMessage}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {formatDate(reply.replyCreatedAt)}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                    <Button
                      size="small"
                      onClick={() => handleEditReply(reply.replyId, reply.replyMessage)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteReply(reply.replyId)}
                    >
                      Delete
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
          No replies yet
        </Typography>
      )}
    </Box>
  )
}

export default FeedbackDetail
