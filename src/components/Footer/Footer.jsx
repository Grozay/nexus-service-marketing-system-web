import React from 'react'
import { Box, Container, Typography, Link, IconButton, Stack } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import AdbIcon from '@mui/icons-material/Adb'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

const Footer = () => {
  return (
    <Box component="footer" sx={{ color: 'white', py: 4, height: (theme) => theme.nexus.footerHeight, backgroundColor: (theme) => theme.palette.primary.main }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} justifyContent="space-between">
          {/* Logo and Description Section */}
          <Box sx={{ maxWidth: 300 }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, justifyContent: 'center', alignItems: 'center' }} />
            <Typography variant="body2">
              NEXUS Telecom - Connecting people, building the digital future.
            </Typography>
          </Box>

          {/* Quick Links Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/" primary="Home" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/services" primary="Services" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/equipment" primary="Equipment" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/support" primary="Support" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/contact" primary="Contact" />
            </Box>
          </Box>

          {/* Contact Information Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2" component="p">
              Address: [NEXUS Office Address]
            </Typography>
            <Typography variant="body2" component="p">
              Phone: [Contact Number]
            </Typography>
            <Typography variant="body2" component="p">
              Email: <Link href="mailto:info@nexus.vn" color="inherit" underline="hover">info@nexus.vn</Link>
            </Typography>
          </Box>

          {/* Social Media Section */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Social Media
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="inherit" aria-label="facebook" href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="twitter" href="#">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="youtube" href="#">
                <YouTubeIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="instagram" href="#">
                <InstagramIcon />
              </IconButton>
            </Stack>
          </Box>
        </Stack>

        {/* Divider Line */}
        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

        {/* Copyright Section */}
        <Box textAlign="center" pt={2}>
          <Typography variant="subtitle2" component="p">
            © {new Date().getFullYear()} NEXUS Telecom. All rights reserved.
          </Typography>
          <Typography variant="caption" component="p">
            <Link href="/terms" color="inherit" underline="hover">Terms of Service</Link> | <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

// Helper component to create ListItemLink
const ListLink = ({ component, primary, to }) => (
  <ListItem sx={{ py: 0.5, display: 'block' }}>
    <Typography component={component} href={to} variant="body2" color="inherit" underline="hover" sx={{ display: 'block' }}>
      {primary}
    </Typography>
  </ListItem>
)

export default Footer