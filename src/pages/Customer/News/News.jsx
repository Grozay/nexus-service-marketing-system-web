import { Link } from 'react-router-dom'
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
import { posts } from '~/apis/posts'

const News = () => {
  return (
    <Box>
      <AppBar />
      <Box sx={{
        background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 10,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            NEXUS News & Events
          </Typography>
          <Typography variant="h5" component="p" sx={{ mb: 4 }}>
            Stay updated with the latest news and events from NEXUS
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid size={{ xs: 12, md: 4 }} key={post.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }
              }}>
                <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {post.description}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {post.date} {post.author ? `| ${post.author}` : `| ${post.location}`}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2 }}>
                  <Button variant="contained" fullWidth component={Link} to={`/news/${post.slug}`}>
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