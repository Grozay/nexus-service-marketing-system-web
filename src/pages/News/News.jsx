import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Link } from 'react-router-dom'
// Mock data for news posts
const newsPosts = [
  {
    id: 1,
    title: '5G Technology: The Future of Connectivity',
    description: 'Explore how 5G is revolutionizing the telecom industry and what it means for consumers.',
    image: 'https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg',
    date: '2023-10-15',
    author: 'John Doe',
    slug: '5g-technology-the-future-of-connectivity'
  },
  {
    id: 2,
    title: 'Maximizing Your Internet Speed',
    description: 'Tips and tricks to get the most out of your internet connection.',
    image: 'https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg',
    date: '2023-10-10',
    author: 'Jane Smith',
    slug: 'maximizing-your-internet-speed'
  },
  {
    id: 3,
    title: 'The Evolution of Telecommunications',
    description: 'A look back at how telecom has evolved over the decades.',
    image: 'https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg',
    date: '2023-10-05',
    author: 'Mike Johnson',
    slug: 'the-evolution-of-telecommunications'
  }
]

const News = () => {
  return (
    <Box>
      <AppBar />

      {/* Hero Section */}
      <Box sx={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 10,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            NEXUS News
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Stay updated with the latest news and insights from NEXUS
          </Typography>
        </Container>
      </Box>

      {/* News Posts Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {newsPosts.map((post) => (
            <Grid size={{ xs: 12, md: 4 }} key={post.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {post.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.date} | {post.author}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }} component={Link} to={`/news/${post.slug}`}>
                  <Button variant="contained" fullWidth>
                    Read More
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  )
}

export default News
