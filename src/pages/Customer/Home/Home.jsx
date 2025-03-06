import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Avatar from '@mui/material/Avatar'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Link } from 'react-router-dom'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import banner1 from '~/assets/team-member-1.png'
import banner2 from '~/assets/team-member-2.png'
import banner3 from '~/assets/team-member-3.png'
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
      categoryName: 'Dial-Up Connection',
      slug: 'dial-up-connection',
      description: 'Affordable and reliable internet access for basic browsing and email.',
      color: '#1976d2'
    },
    {
      categoryName: 'Broad Band Connection',
      slug: 'broad-band-connection',
      description: 'High-speed internet for streaming, gaming, and heavy usage.',
      color: '#d81b60'
    },
    {
      categoryName: 'LandLine Connection',
      slug: 'landline-connection',
      description: 'Crystal-clear voice calls with reliable landline service.',
      color: '#388e3c'
    }
  ]

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
  ]

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <AppBar />

      {/* Hero Banner Slider */}
      <Box sx={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
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
                    transition: 'background-color 0.5s ease'
                  },
                  '&:hover::before': {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
                    <Button
                      variant="contained"
                      size="large"
                      component={Link}
                      to="/services"
                      sx={{
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#1565c0' }
                      }}
                    >
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
      <Box sx={{
        py: 8,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#f5f7fa'
      }}>
        <Container maxWidth="lg">
          <ScrollAnimation animateIn="fadeInDown" animateOnce={true}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1a237e' }}
            >
              Our Services
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={200} animateOnce={true}>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              Discover our range of telecom services designed for your needs
            </Typography>
          </ScrollAnimation>

          <Grid2
            container
            spacing={4}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: 4,
              alignItems: 'stretch'
            }}
          >
            {services.map((service) => (
              <Grid2
                size={{ xs: 12, sm: 4, md: 4 }}
                key={service.slug}
                sx={{
                  flexGrow: 0,
                  flexShrink: 0,
                  width: { xs: '100%', sm: 'calc(33.33% - 32px)' },
                  maxWidth: { xs: '100%', sm: '33.33%' },
                  display: 'flex'
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#fff',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: '0 12px 30px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 3 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        color: service.color,
                        fontSize: '1.5rem'
                      }}
                    >
                      {service.categoryName}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '1rem',
                        lineHeight: 1.6
                      }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                      component={Link}
                      to={`/service/${service.slug}`}
                      variant="contained"
                      sx={{
                        backgroundColor: service.color,
                        color: '#fff',
                        borderRadius: 25,
                        px: 5,
                        py: 1.2,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 3px 6px rgba(0,0,0,0.2)',
                        '&:hover': {
                          backgroundColor: `${service.color}dd`,
                          transform: 'scale(1.08)',
                          boxShadow: '0 5px 12px rgba(0,0,0,0.3)'
                        }
                      }}
                    >
                      Explore
                    </Button>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Box sx={{
        py: 8,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#ffffff'
      }}>
        <Container maxWidth="lg">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1a237e' }}
            >
              Why Choose NEXUS?
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={200} animateOnce={true}>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              sx={{ mb: 6 }}
            >
              Discover why thousands trust NEXUS for their connectivity needs
            </Typography>
          </ScrollAnimation>
          <Grid2 container spacing={4} sx={{ mt: 4 }}>
            <Grid2 size={{ xs: 12, md: 6 }}>
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
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}>
              <Grid2 container spacing={3}>
                {[
                  {
                    title: 'Blazing Fast Speeds',
                    description: 'Up to 1Gbps for seamless streaming and gaming'
                  },
                  {
                    title: 'Reliable Connectivity',
                    description: '99.9% uptime guarantee for uninterrupted service'
                  },
                  {
                    title: 'Flexible Plans',
                    description: 'Customizable packages for your needs and budget'
                  },
                  {
                    title: '24/7 Support',
                    description: 'Dedicated team available round the clock'
                  }
                ].map((item, index) => (
                  <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
                    <ScrollAnimation animateIn="fadeInUp" delay={index * 100} animateOnce={true}>
                      <Card sx={{
                        height: '100%',
                        p: 3,
                        transition: 'transform 0.3s ease',
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#fff',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                        }
                      }}>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2' }}
                        >
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </Card>
                    </ScrollAnimation>
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{
        py: 8,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c3e50' : '#f5f7fa'
      }}>
        <Container maxWidth="lg">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              gutterBottom
              sx={{ fontWeight: 'bold', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1a237e' }}
            >
              What Our Customers Say
            </Typography>
          </ScrollAnimation>
          <Grid2 container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial) => (
              <Grid2 size={{ xs: 12, md: 4 }} key={testimonial.id}>
                <Card sx={{
                  height: '100%',
                  p: 3,
                  transition: 'transform 0.3s ease',
                  backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#fff',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                  }
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {testimonial.name}
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="text.secondary">
                    {testimonial.comment}
                  </Typography>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box sx={{
        py: 8,
        textAlign: 'center',
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#34495e' : '#ffffff'
      }}>
        <Container maxWidth="md">
          <ScrollAnimation animateIn="fadeInUp" animateOnce={true}>
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              sx={{ fontWeight: 'bold', color: (theme) => theme.palette.mode === 'dark' ? '#fff' : '#1a237e' }}
            >
              Ready to Experience NEXUS?
            </Typography>
          </ScrollAnimation>
          <ScrollAnimation animateIn="fadeInUp" delay={200} animateOnce={true}>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
              Join thousands of satisfied customers today
            </Typography>
          </ScrollAnimation>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' }
            }}
          >
            Get Started Now
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

export default Home