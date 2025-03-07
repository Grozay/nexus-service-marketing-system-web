import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { posts } from '~/apis/posts'

const NewsDetails = () => {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <Box>
        <AppBar />
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography variant="h4" color="text.secondary">
            Post not found
          </Typography>
        </Container>
        <Footer />
      </Box>
    )
  }

  return (
    <Box>
      <AppBar />
      <Box sx={{
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${post.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        py: 10,
        color: 'white',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {post.date} {post.author ? `| By ${post.author}` : `| ${post.location}`}
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {post.description}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4 }}>
          {post.content1}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8, mb: 4 }}>
          {post.content2}
        </Typography>
        <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
          {post.content3}
        </Typography>
      </Container>
      <Footer />
    </Box>
  )
}

export default NewsDetails