import React from 'react';
import { Box, Button, Typography, TextField, Card, CardContent, Container, Rating } from '@mui/material';
import { useForm } from 'react-hook-form';
import AppBar from '~/components/AppBar/AppBar';
import Footer from '~/components/Footer/Footer';
import { Zoom } from '@mui/material';
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators';

const Feedback = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [rating, setRating] = React.useState(0);

  const onSubmit = (data) => {
    console.log('Feedback submitted:', { ...data, rating });
    // Handle feedback submission logic here
  };

  return (
    <Box>
      <AppBar />
      <Zoom in={true}>
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Card sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom>
              Give Us Your Feedback
            </Typography>

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Rating Section */}
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

                {/* Feedback Form */}
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
                  type="email"
                  {...register('email', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: EMAIL_RULE
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.type === 'required' ?
                    FIELD_REQUIRED_MESSAGE :
                    errors.email?.type === 'pattern' ?
                      EMAIL_RULE_MESSAGE : ''
                  }
                />

                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Feedback"
                  multiline
                  rows={4}
                  {...register('feedback', { required: FIELD_REQUIRED_MESSAGE })}
                  error={!!errors.feedback}
                  helperText={errors.feedback?.message}
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
            </Box>
          </Card>
        </Container>
      </Zoom>
      <Footer />
    </Box>
  );
};

export default Feedback;
