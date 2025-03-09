import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Rating,
  Card,
  CardContent,
  CardActions
} from '@mui/material'
import { useForm } from 'react-hook-form'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { selectCurrentAccount } from '~/redux/user/accountSlice'
import { toast } from 'react-toastify'
import { createFeedbackAPI } from '~/apis'
import { useConfirm } from 'material-ui-confirm'

const SendFeedBack = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const currentAccount = useSelector(selectCurrentAccount)
  const accountId = currentAccount?.userId
  const orderId = location.search.split('=')[1]
  const [feedbackRating, setFeedbackRating] = useState(0)
  const confirmFeedback = useConfirm()

  const onSubmit = async (data) => {
    const { feedbackSubject, feedbackMessage } = data
    const { confirmed } = await confirmFeedback({
      title: 'Are you sure you want to submit this feedback?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })
    if (!confirmed) {
      return
    }
    const payload = { accountId, orderId, feedbackSubject, feedbackMessage, feedbackRating }
    try {
      await toast.promise(createFeedbackAPI(payload), {
        pending: 'Sending feedback...'
      }).then((response) => {
        if (!response.error) {
          toast.success('Feedback sent successfully!')
          navigate('/account/profile')
        }
      })
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred.')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
        <Card sx={{ maxWidth: 600, mx: 'auto', boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
              Send Us Your Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
              We value your opinion! Please let us know about your experience.
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                label="Order ID"
                value={orderId || 'N/A'}
                disabled
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Account ID"
                value={accountId || 'N/A'}
                disabled
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Feedback Subject"
                variant="outlined"
                {...register('feedbackSubject', {
                  required: 'Feedback subject is required.'
                })}
                error={!!errors.feedbackSubject}
                helperText={errors.feedbackSubject?.message}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Feedback Message"
                variant="outlined"
                multiline
                rows={4}
                {...register('feedbackMessage', {
                  required: 'Feedback message is required.'
                })}
                error={!!errors.feedbackMessage}
                helperText={errors.feedbackMessage?.message}
                sx={{ mb: 2 }}
              />
              <Box sx={{ mb: 2 }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="feedback-rating"
                  value={feedbackRating}
                  onChange={(event, newValue) => {
                    setFeedbackRating(newValue)
                    setValue('feedbackRating', newValue) // Cập nhật giá trị vào form (nếu cần)
                  }}
                  precision={1}
                  size="large"
                />
                {feedbackRating === 0 && (
                  <Typography variant="caption" color="error">
                    Please provide a rating.
                  </Typography>
                )}
              </Box>
            </Box>
          </CardContent>
          <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit(onSubmit)}
              sx={{ minWidth: 200, borderRadius: 1 }}
            >
              Submit Feedback
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => navigate('/account/profile')}
              sx={{ minWidth: 200, borderRadius: 1 }}
            >
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Container>
      <Footer />
    </Box>
  )
}

export default SendFeedBack