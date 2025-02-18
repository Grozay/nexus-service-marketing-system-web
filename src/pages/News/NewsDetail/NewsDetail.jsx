import React from 'react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Chip from '@mui/material/Chip'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
// Mock data for news detail
const newsDetail = {
  id: 1,
  title: '5G Technology: The Future of Connectivity',
  content: `The telecommunications industry is undergoing a major transformation with the advent of 5G technology. This revolutionary technology promises to deliver faster speeds, lower latency, and more reliable connections than ever before.

  **Key Benefits of 5G:**

  * Ultra-fast download and upload speeds
  * Near-instantaneous response times
  * Support for massive IoT deployments
  * Enhanced mobile broadband experiences
  * New possibilities for AR/VR applications

  As NEXUS continues to invest in 5G infrastructure, we're committed to bringing these benefits to our customers across the country. Our team is working tirelessly to ensure a smooth transition to this new era of connectivity.`,
  image: 'https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg',
  date: '2023-10-15',
  author: 'John Doe',
  tags: ['5G', 'Technology', 'Innovation'],
  relatedPosts: [
    {
      id: 2,
      title: 'Maximizing Your Internet Speed',
      image: 'https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg',
      date: '2023-10-10',
      slug: 'maximizing-your-internet-speed'
    },
    {
      id: 3,
      title: 'The Evolution of Telecommunications',
      image: 'https://dntech.vn/uploads/details/2019/10/images/Internet(1).jpg',
      date: '2023-10-05',
      slug: 'the-evolution-of-telecommunications'
    }
  ]
}

const NewsDetail = () => {
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
            {newsDetail.title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip label={newsDetail.date} color="primary" />
            <Chip label={`By ${newsDetail.author}`} color="secondary" />
            {newsDetail.tags.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Box>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {/* Article Content */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ mb: 4 }}>
              <CardMedia
                component="img"
                height="400"
                image={newsDetail.image}
                alt={newsDetail.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                  {newsDetail.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ mb: 4, p: 2 }}>
              <Typography variant="h6" gutterBottom>
                  Related News
              </Typography>
              <List>
                {newsDetail.relatedPosts.map((post) => (
                  <ListItem key={post.id} sx={{ p: 0, mb: 2 }}>
                    <Link to={`/news/${post.slug}`} style={{ textDecoration: 'none', width: '100%' }}>
                      <Card sx={{ width: '100%' }}>
                        <CardMedia
                          component="img"
                          height="100"
                          image={post.image}
                          alt={post.title}
                        />
                        <CardContent>
                          <Typography variant="subtitle1" gutterBottom>
                            {post.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {post.date}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Link>
                  </ListItem>
                ))}
              </List>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer />
    </Box>
  )
}

export default NewsDetail