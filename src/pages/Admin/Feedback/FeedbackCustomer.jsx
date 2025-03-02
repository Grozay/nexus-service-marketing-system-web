import React, { useState } from 'react';
import { Box, Typography, Paper, Avatar, List, ListItem, ListItemText, TextField, Button, Backdrop } from '@mui/material';
import { Feedback, Reply } from '~/apis/mock-data';

const CustomerFeedbackPage = () => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const handleReplySubmit = (feedbackId) => {
    // Handle reply submission logic
    console.log('Reply submitted:', replyMessage);
    setReplyMessage('');
  };

  const getRelatedReplies = (feedbackId) => {
    return Reply.filter(reply => reply.feedbackId === feedbackId);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Customer Feedback
      </Typography>

      <Paper sx={{ p: 2 }}>
        <List>
          {Feedback.map((feedback) => {
            const relatedReplies = getRelatedReplies(feedback.feedbackId);
            return (
              <React.Fragment key={feedback.feedbackId}>
                <ListItem 
                  button
                  onClick={() => setSelectedFeedback(feedback)}
                  sx={{ mb: 2, border: '1px solid #ddd', borderRadius: 2 }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ mr: 2 }}>C</Avatar>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {feedback.feedbackSubject}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
                      {feedback.feedbackMessage}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, ml: 6 }}>
                      <Typography variant="caption">
                        Rating: {feedback.feedbackRating}/10
                      </Typography>
                      <Typography variant="caption">
                        Status: {feedback.feedbackStatus}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>

                {relatedReplies.map(reply => (
                  <ListItem key={reply.replyId} sx={{ ml: 6, mb: 1 }}>
                    <Box sx={{ width: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Avatar sx={{ mr: 2 }}>A</Avatar>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Admin Reply
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 6 }}>
                        {reply.replyMessage}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </React.Fragment>
            );
          })}
        </List>
      </Paper>

      {selectedFeedback && (
        <>
          <Backdrop
            open={true}
            sx={{ 
              zIndex: 9999,
              backgroundColor: 'rgba(0, 0, 0, 0.5)' 
            }}
          />
          <Paper sx={{ 
            position: 'fixed', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            width: '80%', 
            p: 3, 
            zIndex: 10000 
          }}>
            <Typography variant="h6" gutterBottom>
              Feedback Details
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography><strong>Subject:</strong> {selectedFeedback.feedbackSubject}</Typography>
              <Typography><strong>Message:</strong> {selectedFeedback.feedbackMessage}</Typography>
              <Typography><strong>Rating:</strong> {selectedFeedback.feedbackRating}/10</Typography>
              <Typography><strong>Status:</strong> {selectedFeedback.feedbackStatus}</Typography>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Write your reply..."
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                onClick={() => handleReplySubmit(selectedFeedback.feedbackId)}
              >
                Send Reply
              </Button>
              <Button 
                variant="outlined" 
                onClick={() => setSelectedFeedback(null)}
                sx={{ ml: 2 }}
              >
                Close
              </Button>
            </Box>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default CustomerFeedbackPage;