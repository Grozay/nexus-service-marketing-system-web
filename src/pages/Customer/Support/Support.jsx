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
  Link
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'

const Support = () => {
  const faqData = [
    {
      id: 1,
      question: 'How do I reset my password for the Nexus Service account?',
      answer: 'Click "Forgot Password" on the login page and follow the instructions. We’ll send a reset link to your registered email within minutes.'
    },
    {
      id: 2,
      question: 'Is Broadband Connection available in my area?',
      answer: 'Visit our "Coverage Check" page, enter your address, and we’ll confirm if Broadband Connection is available at your location.'
    },
    {
      id: 3,
      question: 'Can I upgrade my Dial-Up Connection to Broadband?',
      answer: 'Yes! Contact our support team at 1900 1234 or email support@nexusservice.vn to discuss upgrade options tailored to your needs.'
    },
    {
      id: 4,
      question: 'What should I do if my Landline Connection has no dial tone?',
      answer: 'Check your phone cable connections first. If the issue persists, call our 24/7 hotline at 1900 1234 for immediate assistance.'
    },
    {
      id: 5,
      question: 'How can I pay my Nexus Service bill online?',
      answer: 'Log in to your account, go to "Billing," and follow the steps to pay securely with your credit card or mobile payment apps.'
    }
  ]

  const contactData = [
    { id: 1, title: 'Support Email', detail: 'support@nexusservice.vn', icon: <EmailIcon color="primary" />, link: 'mailto:support@nexusservice.vn' },
    { id: 2, title: 'Support Phone Number', detail: '1900 1234', icon: <PhoneIcon color="primary" /> },
    { id: 3, title: 'Facebook', detail: 'Nexus Service Official', icon: <FacebookIcon color="primary" />, link: 'https://www.facebook.com/nexusservice.vn' },
    { id: 4, title: 'Twitter', detail: '@NexusServiceVN', icon: <TwitterIcon color="primary" />, link: 'https://twitter.com/NexusServiceVN' },
    { id: 5, title: 'Instagram', detail: '@nexus.service', icon: <InstagramIcon color="primary" />, link: 'https://www.instagram.com/nexus.service' },
    { id: 6, title: 'Office Address', detail: '123 Le Loi Street, District 1, Ho Chi Minh City', icon: <LocationOnIcon color="primary" /> }
  ]

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        {/* Support Page Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            We Are Always Ready to Support You!
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Welcome to the Nexus Service support page. Whether you’re using Dial-Up, Broadband, or Landline, we’re here to answer your questions and provide the best assistance.
          </Typography>
        </Box>

        {/* Frequently Asked Questions (FAQ) */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
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
            {contactData.map((contact) => (
              <ListItem
                key={contact.id}
                button='true'
                component= 'li'
                href={contact.link}
              >
                <ListItemIcon>
                  {contact.icon}
                </ListItemIcon>
                <ListItemText
                  primary={contact.title}
                  secondary={
                    contact.link ? (
                      <Link href={contact.link} sx={{ color: '#1976d2', textDecoration: 'none' }}>
                        {contact.detail}
                      </Link>
                    ) : (
                      contact.detail
                    )
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* View Store Locations */}
        <Box mt={4} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Need to visit us in person?{' '}
            <Link href="/stores" sx={{ color: '#1976d2', textDecoration: 'none' }}>
              View Store Locations
            </Link>
          </Typography>
        </Box>

        {/* Additional Contact Prompt */}
        <Box mt={2} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            Still need help?{' '}
            <Link href="/contact-us" sx={{ color: '#1976d2', textDecoration: 'none' }}>
              Contact us
            </Link>
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  )
}

export default Support