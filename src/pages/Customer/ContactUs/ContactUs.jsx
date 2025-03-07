import React from 'react'
import { Box, Button, Typography, TextField, Card, Container, Rating } from '@mui/material'
import { useForm } from 'react-hook-form'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Zoom } from '@mui/material'
import { FIELD_REQUIRED_MESSAGE, EMAIL_RULE, EMAIL_RULE_MESSAGE } from '~/utils/validators'

import backgroundImage from '~/assets/team-member-1.png'
import { toast } from 'react-toastify'
import { contactUsAPI } from '~/apis'

const ContactUs = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const [rating, setRating] = React.useState(0)

  const onSubmit = async (data) => {
    const { fullName, email, message } = data
    toast.promise(contactUsAPI({ fullName, email, message }), {
      pending: 'Sending message...',
      success: 'Message sent successfully',
      error: 'Failed to send message, Please try again later'
    }).then((res) => {
      if (!res.error) {
        setValue('fullName', '')
        setValue('email', '')
        setValue('message', '')
        setRating(0)
      }
    })
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ position: 'relative', textAlign: 'center', color: 'white', mb: 4 }}>
          <Box
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 300,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }
            }}
          />
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="subtitle1">
              NEXUS Telecom - Connecting people, building the digital future.
            </Typography>
          </Box>
        </Box>
      </Container>

      <Zoom in={true}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Give Us Your Feedback or Inquiry
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" component="h2">
                    How would you rate your experience?
                  </Typography>
                  <Rating
                    name="feedback-rating"
                    value={rating}
                    onChange={(event, newValue) => setRating(newValue)}
                    size="large"
                  />
                </Box>

                <TextField
                  fullWidth
                  margin="normal"
                  label="Full Name"
                  {...register('fullName', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  {...register('email', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: EMAIL_RULE
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.type === 'required'
                    ? FIELD_REQUIRED_MESSAGE
                    : errors.email?.type === 'pattern'
                      ? EMAIL_RULE_MESSAGE
                      : ''
                  }
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Feedback"
                  multiline
                  rows={4}
                  {...register('message', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ px: 6 }}
                >
                  Submit Feedback
                </Button>
              </Box>

              <Box mt={2} textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  Want to visit us in person?{' '}
                  <a href="/stores" style={{ color: '#1976d2', textDecoration: 'none' }}>
                    View Store Locations
                  </a>
                </Typography>
              </Box>
            </Box>
          </Card>
        </Container>
      </Zoom>
      <Footer />
    </Box>
  )
}

export default ContactUs