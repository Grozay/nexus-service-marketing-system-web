import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import { useForm } from 'react-hook-form'
import AppBar from '~/components/AppBar/AppBar'
import Footer from '~/components/Footer/Footer'
import { Zoom } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import EditIcon from '@mui/icons-material/Edit'
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE
} from '~/utils/validators'

const UpdateProfile = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [avatar, setAvatar] = useState('/static/images/avatars/avatar_default.jpg')

  const handleAvatarChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (data) => {
    console.log('Profile updated:', data)
    // Handle profile update logic here
  }

  return (
    <Box>
      <AppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Zoom in={true}>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            {/* Profile Header with Avatar */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <IconButton component="label" sx={{ p: 0 }}>
                <Avatar
                  alt="Profile Picture"
                  src={avatar}
                  sx={{ width: 120, height: 120 }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'grey[300]', // đổi màu background cho đẹp hơn
                    borderRadius: '50%',
                    p: 0.3, // giảm padding cho nó tròn và đều hơn
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CameraAltIcon fontSize="small" sx={{ color: 'action.active' }} />
                </Box>
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
              <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
                Update Your Profile
              </Typography>
            </Box>

            {/* Profile Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Full Name"
                      {...register('fullName', { required: FIELD_REQUIRED_MESSAGE })}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      type="email"
                      {...register('email', {
                        required: FIELD_REQUIRED_MESSAGE,
                        pattern: EMAIL_RULE
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.type === 'required' ?
                        FIELD_REQUIRED_MESSAGE :
                        errors.email?.type === 'pattern' ?
                          EMAIL_RULE_MESSAGE : ''
                      }
                    />
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Phone Number"
                      {...register('phoneNumber')}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Address"
                      {...register('address')}
                    />
                  </Box>
                </Box>
              </Box>


              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<EditIcon />}
                >
                  Update Profile
                </Button>
              </Box>
            </Box>
          </Paper>
        </Zoom>
      </Container>
      <Footer />
    </Box>
  )
}

export default UpdateProfile
