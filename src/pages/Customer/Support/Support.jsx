import React from 'react'
import {
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Link, // Import Link from Material UI
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore' // Icon for Accordion
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import FacebookIcon from '@mui/icons-material/Facebook' // Icon for Facebook (example)
import LocationOnIcon from '@mui/icons-material/LocationOn' // Icon for Office Address
import AppBar from '~/components/AppBar/AppBar'

const Support = () => {
  // Sample FAQ data (replace with real data from backend or CMS)
  const faqData = [
    {
      id: 1,
      question: 'I forgot my account password, how do I recover it?',
      answer: 'You can click on the "Forgot Password" link on the login page and follow the instructions to reset your password. We will send instructions to your registered email address.'
    },
    {
      id: 2,
      question: 'How to check NEXUS service coverage?',
      answer: 'You can visit the "Coverage Check" page on our website and enter your address to check if the service is available in your area.'
    },
    {
      id: 3,
      question: 'I want to upgrade my Internet service package, what do I need to do?',
      answer: 'To upgrade your service package, please contact our customer support department via the phone number or email provided below. Support staff will advise and assist you in upgrading to a suitable service package.'
    }
    // Add more questions here
  ]

  // Sample Help Guides data (example)
  const helpGuidesData = [
    { id: 1, title: 'Internet modem installation guide', link: '#' },
    { id: 2, title: 'How to pay service charges online', link: '#' },
    { id: 3, title: 'Troubleshooting common issues with Television service', link: '#' }
    // Add more guides here
  ]

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Support Page Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            We are always ready to support you!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome to NEXUS support page. We are here to help you answer any questions and support you in the best way during your use of our services.
          </Typography>
        </Box>

        {/* Frequently Asked Questions (FAQ) */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Frequently Asked Questions (FAQ)
          </Typography>
          {faqData.map((faqItem) => (
            <Accordion key={faqItem.id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`faq-content-${faqItem.id}`} id={`faq-header-${faqItem.id}`}>
                <Typography variant="subtitle2">{faqItem.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography color="text.secondary">
                  {faqItem.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>

        {/* Contact Support Channels */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            Contact Support
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon>
                <EmailIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Support Email" secondary={<Link href="mailto:support@nexus.vn">support@nexus.vn</Link>} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Support Phone Number" secondary="1900 XXXX (Free)" />
            </ListItem>
            {/* <ListItem button component="a" href="#">
            <ListItemIcon>
              <ChatBubbleIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Live Chat (Online Support)" />
          </ListItem> */}
            <ListItem button component="a" href="https://www.facebook.com/nexus.vn">
              <ListItemIcon>
                <FacebookIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Facebook Fanpage" secondary="NEXUS Telecom Fanpage" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <LocationOnIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Office Address" secondary="District 1, Ho Chi Minh City" /> {/* Replace with actual office address */}
            </ListItem>
          </List>
        </Box>

        {/* Help Guides (optional) */}
        {/* <Box>
        <Typography variant="h6" component="h2" gutterBottom>
                    Help Guides & Documents
        </Typography>
        <List dense>
          {helpGuidesData.map((guide) => (
            <ListItem button component="a" href={guide.link} key={guide.id}>
              <ListItemIcon>
                <BookIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={guide.title} />
            </ListItem>
          ))}
        </List>
      </Box> */}


        {/* <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Still need help? <Link href="/contact">Contact us</Link>
          </Typography>
        </Box> */}
      </Container>
    </Box>
  )
}

export default Support
