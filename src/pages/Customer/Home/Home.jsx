import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import WifiIcon from '@mui/icons-material/Wifi'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import SpeedIcon from '@mui/icons-material/Speed'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import bannerImage from '~/assets/team-member-1.png'
import service1 from '~/assets/team-member-1.png'
import service2 from '~/assets/team-member-2.png'
import service3 from '~/assets/team-member-3.png'
import banner1 from '~/assets/team-member-1.png'
import banner2 from '~/assets/team-member-1.png'
import banner3 from '~/assets/team-member-1.png'
import ScrollAnimation from 'react-animate-on-scroll'

const Home = () => {
  const [banners] = useState([
    {
      id: 1,
      image: banner1,
      title: 'Super Fast Internet',
      subtitle: 'Experience the fastest speeds for streaming and gaming',
      cta: 'Explore Plans'
    },
    {
      id: 2,
      image: banner2,
      title: 'Reliable Connectivity',
      subtitle: 'Stay connected with our stable network',
      cta: 'Learn More'
    },
    {
      id: 3,
      image: banner3,
      title: 'Business Solutions',
      subtitle: 'Power your business with our enterprise-grade services',
      cta: 'Get Started'
    }
  ])

  const services = [
    {
      id: 1,
      title: 'High-Speed Internet',
      description: 'Experience blazing fast internet speeds for streaming, gaming, and more.',
      image: service1,
      icon: <WifiIcon />
    },
    {
      id: 2,
      title: 'Mobile Plans',
      description: 'Flexible mobile plans with unlimited calls and data.',
      image: service2,
      icon: <PhoneIphoneIcon />
    },
    {
      id: 3,
      title: 'Business Solutions',
      description: 'Reliable connectivity solutions for your business needs.',
      image: service3,
      icon: <SpeedIcon />
    }
  ]

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: 'Nguyen Van A',
      comment: 'NEXUS has transformed our business with their reliable internet service. Highly recommended!',
      avatar: '/static/images/avatars/1.jpg'
    },
    {
      id: 2,
      name: 'Tran Thi B',
      comment: 'The low latency and high speed are perfect for online gaming. Never experienced any lag!',
      avatar: '/static/images/avatars/2.jpg'
    },
    {
      id: 3,
      name: 'Le Van C',
      comment: 'Stable connection for video calls and file transfers. Great customer support too!',
      avatar: '/static/images/avatars/3.jpg'
    }
  ];

  return (
    <Box>
      <AppBar />

      {/* Hero Banner Slider */}
      <Box sx={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Box
                sx={{
                  backgroundImage: `url(${banner.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '80vh',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    transition: 'background-color 0.5s ease',
                  },
                  '&:hover::before': {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  }
                }}
              >
                <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                  <Box sx={{ 
                    maxWidth: '800px',
                    transform: 'translateY(20px)',
                    opacity: 0,
                    transition: 'all 0.8s ease',
                    '.swiper-slide-active &': {
                      transform: 'translateY(0)',
                      opacity: 1
                    }
                  }}>
                    <Typography 
                      variant="h2" 
                      component="h1" 
                      gutterBottom
                      sx={{
                        textShadow: '2px 2px 8px rgba(0,0,0,0.5)',
                        fontWeight: 700
                      }}
                    >
                      {banner.title}
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
                      {banner.subtitle}
                    </Typography>
                    <Button variant="contained" size="large">
                      {banner.cta}
                    </Button>
                  </Box>
                </Container>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Our Services
          </Typography>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp" delay={200} animateOnce={true}>
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Discover our range of telecom services designed for your needs
          </Typography>
        </ScrollAnimation>

        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={service.id}>
              <ScrollAnimation animateIn="fadeInUp" delay={index * 200} animateOnce={true}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.image}
                    alt={service.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <IconButton color="primary">
                        {service.icon}
                      </IconButton>
                      <Typography variant="h5" component="h3">
                        {service.title}
                      </Typography>
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Us Section */}
      <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              Why Choose NEXUS?
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Grid container spacing={4} sx={{ mt: 4 }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Grid container spacing={3}>
                  {[
                    {
                      icon: <SpeedIcon fontSize="large" color="primary" />,
                      title: 'Blazing Fast Speeds',
                      description: 'Experience internet speeds up to 1Gbps for seamless streaming and gaming'
                    },
                    {
                      icon: <WifiIcon fontSize="large" color="primary" />,
                      title: 'Reliable Connectivity',
                      description: '99.9% network uptime guarantee for uninterrupted service'
                    },
                    {
                      icon: <LocalOfferIcon fontSize="large" color="primary" />,
                      title: 'Flexible Plans',
                      description: 'Customizable packages to suit your needs and budget'
                    },
                    {
                      icon: <SupportAgentIcon fontSize="large" color="primary" />,
                      title: '24/7 Support',
                      description: 'Dedicated support team available round the clock'
                    }
                  ].map((item, index) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                      <ScrollAnimation animateIn="fadeInUp" delay={index * 100} animateOnce={true}>
                        <Card sx={{ 
                          height: '100%', 
                          p: 3,
                          transition: 'transform 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-5px)',
                            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                          }
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            mb: 2 
                          }}>
                            <IconButton sx={{ mr: 2 }}>
                              {item.icon}
                            </IconButton>
                            <Typography variant="h6" component="h3">
                              {item.title}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Card>
                      </ScrollAnimation>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
                  <Box
                    component="img"
                    src="https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg"
                    alt="Why Choose Us"
                    sx={{ 
                      width: '100%', 
                      borderRadius: 2,
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </ScrollAnimation>
              </Grid>
            </Grid>
          </ScrollAnimation>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Typography variant="h3" component="h2" align="center" gutterBottom>
              What Our Customers Say
            </Typography>
          </ScrollAnimation>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial) => (
              <Grid size={{ xs: 12, md: 4 }} key={testimonial.id}>
                <Card sx={{ height: '100%', p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                    <Box>
                      <Typography variant="subtitle1">{testimonial.name}</Typography>

                    </Box>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {testimonial.comment}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* New: Coverage Map Section */}
      {/* <Box sx={{ backgroundColor: 'background.paper', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" component="h2" align="center" gutterBottom>
            Our Coverage
          </Typography>
        </Container>
      </Box> */}

      {/* New: Call to Action Section */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Typography variant="h3" component="h2" gutterBottom>
              Ready to Experience NEXUS?
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={200} animateOnce={true}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of satisfied customers today
            </Typography>
          </ScrollAnimation>
          <Button variant="contained" size="large">
            Get Started Now
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default Home
