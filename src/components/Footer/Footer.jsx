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
          <Box sx={{ maxWidth: 300 }}>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, justifyContent: 'center', alignItems: 'center' }} />
            <Typography variant="body2">
            NEXUS SERVICE - Established in 2015, we are a leading provider of Dial-Up, Broadband, and Landline services in Vietnam, committed to connecting communities and empowering the digital future with reliable, innovative solutions
            </Typography>
          </Box>

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
              <ListLink component={Link} to="/stores" primary="Store Locations" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/support" primary="Support" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowRightIcon />
              <ListLink component={Link} to="/contact-us" primary="Contact Us" />
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" component="p">
              Address: 123 Le Loi Street, District 1, Ho Chi Minh City
            </Typography>
            <Typography variant="body2" component="p">
              Phone: 1900 1234
            </Typography>
            <Typography variant="body2" component="p">
              Email: <Link href="mailto:support@nexusservice.vn" color="inherit" underline="hover">support@nexusservice.vn</Link>
            </Typography>
          </Box>

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

        <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.3)' }} />

        <Box textAlign="center" pt={2}>
          <Typography variant="subtitle2" component="p">
            © {new Date().getFullYear()} NEXUS Telecom. All rights reserved
          </Typography>
          <Typography variant="caption" component="p">
            <Link href="/terms" color="inherit" underline="hover">Terms of Service</Link> | <Link href="/privacy" color="inherit" underline="hover">Privacy Policy</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

const ListLink = ({ component, primary, to }) => (
  <ListItem sx={{ py: 0.5, display: 'block' }}>
    <Typography component={component} href={to} variant="body2" color="inherit" underline="hover" sx={{ display: 'block' }}>
      {primary}
    </Typography>
  </ListItem>
)

export default Footer