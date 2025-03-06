import { Container, Link } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Icon from '@mui/material/Icon'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded'
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import backgroundImage from '~/assets/team-member-1.png'
import teamMember1 from '~/assets/team-member-1.png'
import teamMember2 from '~/assets/team-member-2.png'
import teamMember3 from '~/assets/team-member-3.png'
import AppBar from '~/components/AppBar/AppBar'
import ScrollAnimation from 'react-animate-on-scroll'
import Footer from '~/components/Footer/Footer'

const AboutUsPage = () => {
  const teamData = [
    { id: 1, name: 'Le Anh Kiet', title: 'CEO & Founder', description: 'Visionary leader driving NEXUS to new heights with innovative strategies.', avatarUrl: teamMember1 },
    { id: 2, name: 'Nguyen Chi Quyen', title: 'CTO & Founder', description: 'Tech genius shaping the future of connectivity with cutting-edge solutions.', avatarUrl: teamMember2 },
    { id: 3, name: 'Tran Minh Hoa', title: 'Marketing Director', description: 'Creative mind expanding NEXUS’s reach through impactful campaigns.', avatarUrl: teamMember3 },
    { id: 4, name: 'Pham Thi Lan', title: 'Customer Support Lead', description: 'Passionate about ensuring every customer has the best experience.', avatarUrl: teamMember2 },
    { id: 5, name: 'Hoang Van Nam', title: 'Network Engineer', description: 'Expert in building and maintaining our robust network infrastructure.', avatarUrl: teamMember1 }
  ]

  const whyChooseUsData = [
    { id: 1, reason: 'Superior service quality', description: 'Delivering top-notch connectivity solutions tailored to your needs.' },
    { id: 2, reason: 'Competitive prices', description: 'Affordable plans with flexible options for every budget.' },
    { id: 3, reason: '24/7 customer support', description: 'Dedicated team ready to assist you anytime, anywhere.' },
    { id: 4, reason: 'Wide coverage', description: 'Modern network reaching every corner for seamless access.' }
  ]

  return (
    <Box>
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
              About Us
            </Typography>
            <Typography variant="subtitle1">
              NEXUS Telecom - Connecting people, building the digital future.
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
            <Icon sx={{ mr: 1 }}>
              <BusinessRoundedIcon color="primary" fontSize="medium" />
            </Icon>
            Our Story
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Founded in 2015, NEXUS Telecom emerged from a vision to bridge the digital divide in Vietnam. Starting as a small team passionate about connectivity, we faced challenges like limited resources and fierce competition. Through perseverance and innovation, we launched our first high-speed broadband service in 2018, marking a turning point. Today, with a network spanning over 50 provinces and serving 1 million+ customers, NEXUS continues to grow, aiming to empower communities with cutting-edge telecom solutions for a brighter digital future.
          </Typography>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon sx={{ mr: 1 }}>
                <LightbulbRoundedIcon color="primary" fontSize="medium" />
              </Icon>
              Our Mission and Core Values
            </Typography>
            <Typography variant="body1" color="text.secondary" component="div">
              At NEXUS, we do not just provide telecommunications services, we build connections. Our mission is to become a solid bridge, bringing superior quality internet and telecommunications solutions, contributing to improving the quality of life of each individual and promoting the sustainable development of the community.

              <br /><br />

              To fulfill this noble mission, NEXUS always adheres to the following core values:

              <br /><br />

              <Typography variant="subtitle1" component="h3" fontWeight="bold">
                * We are committed to providing customers with services and products that meet the <strong>highest quality standards</strong>.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                From stable internet speeds, reliable transmission lines, to clear call quality, NEXUS always strives to excel in meeting and exceeding customer expectations.
              </Typography>

              <br />
              <Typography variant="subtitle1" component="h3" fontWeight="bold">
                * <strong>Continuous innovation:</strong>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                In a constantly changing technology world, <strong>innovation is the key</strong> for NEXUS to always lead. We constantly innovate, research and apply the most advanced technologies to bring pioneering, effective and suitable telecommunications solutions to the increasingly diverse needs of the market.
              </Typography>

              <br />
              <Typography variant="subtitle1" component="h3" fontWeight="bold">
                * <strong>Dedication from the heart:</strong>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Customers are always the <strong>center</strong> of all NEXUS&apos;s activities. We build sustainable relationships with customers based on dedication, thoughtfulness and listening. NEXUS&apos;s professional and enthusiastic staff is always ready to support and solve all customer problems quickly and effectively.
              </Typography>

              <br />
              <Typography variant="subtitle1" component="h3" fontWeight="bold">
                * <strong>Prestige and reliability:</strong>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                NEXUS understands that <strong>prestige is a priceless asset</strong>. We build <strong>trust</strong> and <strong>credibility</strong> with customers, partners and the community through transparency, responsibility and commitment to do what we promise. NEXUS aims to become a <strong>reliable</strong> partner, a <strong>solid</strong> companion on each customer&apos;s development path.
              </Typography>
            </Typography>
          </Box>
        </ScrollAnimation>
        <Divider sx={{ mb: 4 }} />

        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Icon sx={{ mr: 1 }}>
                <PeopleRoundedIcon color="primary" fontSize="medium" />
              </Icon>
              Our Team
            </Typography>
            <Box sx={{
              mt: 2,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'center'
            }}>
              {teamData.map((member) => (
                <Box
                  key={member.id}
                  sx={{
                    width: { xs: '100%', sm: '45%', md: '30%' },
                    textAlign: 'center',
                    mb: 4
                  }}
                >
                  <Avatar
                    alt={member.name}
                    src={member.avatarUrl}
                    sx={{ width: 120, height: 120, mb: 1, mx: 'auto' }}
                  />
                  <Typography variant="h6" component="h3" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {member.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </ScrollAnimation>
        <Divider sx={{ mb: 4 }} />

        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              Why Choose NEXUS?
            </Typography>
            <List>
              {whyChooseUsData.map((reasonItem) => (
                <ListItem key={reasonItem.id} disableGutters>
                  <ListItemIcon>
                    <CheckCircleRoundedIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={reasonItem.reason}
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {reasonItem.description}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <Box sx={{ textAlign: 'center', mt: 5 }}>
            <Typography variant="h5" component="p" gutterBottom>
              Ready to experience superior connectivity from NEXUS?
            </Typography>
            <Button component='a' href="/services" variant="contained" color="primary" size="large">
              Explore Services Now
            </Button>
          </Box>
        </ScrollAnimation>

        <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
          <Box mt={6} mb={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Want to learn more about NEXUS?{' '}
            </Typography>
            <Link href="/contact-us" variant="contained" color="primary" size="large">
              Contact Us
            </Link>
          </Box>
        </ScrollAnimation>
      </Container>
      <Footer />
    </Box>
  )
}

export default AboutUsPage