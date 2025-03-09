import { useState } from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Link, useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import HomeIcon from '@mui/icons-material/Home'
import DialpadIcon from '@mui/icons-material/Dialpad'
import WifiIcon from '@mui/icons-material/Wifi'
import PhoneIcon from '@mui/icons-material/Phone'
import InfoIcon from '@mui/icons-material/Info'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import StoreIcon from '@mui/icons-material/Store'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import SearchIcon from '@mui/icons-material/Search'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'

const DrawerAppBar = ({
  drawerOpen,
  toggleDrawer
}) => {
  const [openServices, setOpenServices] = useState(false)
  const [openSupport, setOpenSupport] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const navigate = useNavigate()

  const handleClickServices = () => {
    setOpenServices(!openServices)
  }

  const handleClickSupport = () => {
    setOpenSupport(!openSupport)
  }

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen)
    setSearchValue('') // Reset giá trị khi mở/đóng
  }

  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      navigate(`/search-registration?search=${(searchValue)}`)
      setSearchOpen(false)
      toggleDrawer(false)() // Đóng drawer sau khi tìm kiếm
    } else {
      toast.error('Please enter a search value.')
    }
  }

  return (
    <Box>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            paddingX: 2,
            paddingY: 4,
            color: 'white',
            backgroundColor: (theme) => theme.palette.primary.main
          }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={'/'}
                onClick={toggleDrawer(false)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover::after': {
                    width: '100%'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                <HomeIcon sx={{ mr: 1 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleClickServices}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover::after': {
                    width: '100%'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                <SettingsSuggestIcon sx={{ mr: 1 }} />
                <ListItemText primary="Services" />
                {openServices ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openServices} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 5 }}
                  component={Link}
                  to='/service/dial-up-connection'
                  onClick={toggleDrawer(false)}
                >
                  <DialpadIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Dial-up" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 5 }}
                  component={Link}
                  to='/service/broad-band-connection'
                  onClick={toggleDrawer(false)}
                >
                  <WifiIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Broadband" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 5 }}
                  component={Link}
                  to='/service/landline-connection'
                  onClick={toggleDrawer(false)}
                >
                  <PhoneIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Landline" />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={'/about-us'}
                onClick={toggleDrawer(false)}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover::after': {
                    width: '100%'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                <InfoIcon sx={{ mr: 1 }} />
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={handleClickSupport}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover::after': {
                    width: '100%'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                <SupportAgentIcon sx={{ mr: 1 }} />
                <ListItemText primary="Support" />
                {openSupport ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openSupport} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 5 }}
                  component={Link}
                  to='/support'
                  onClick={toggleDrawer(false)}
                >
                  <SupportAgentIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Support" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 5 }}
                  component={Link}
                  to='/stores'
                  onClick={toggleDrawer(false)}
                >
                  <StoreIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Store Locations" />
                </ListItemButton>
                <ListItemButton
                  sx={{ pl: 5 }}
                  component={Link}
                  to='/contact-us'
                  onClick={toggleDrawer(false)}
                >
                  <ContactMailIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Contact Us" />
                </ListItemButton>
              </List>
            </Collapse>

            {/* Thêm nút Search */}
            <ListItem disablePadding>
              <ListItemButton
                onClick={handleSearchToggle}
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover::after': {
                    width: '100%'
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: '2px',
                    backgroundColor: 'white',
                    transition: 'width 0.3s ease-in-out'
                  }
                }}
              >
                <SearchIcon sx={{ mr: 1 }} />
                <ListItemText primary="Track Your Registration" />
              </ListItemButton>
            </ListItem>
          </List>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ModeSelect />
          </Box>
        </Box>
      </Drawer>

      {/* Modal tìm kiếm giống NavBar */}
      {searchOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)', // Overlay mờ
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={handleSearchToggle} // Đóng khi nhấp vào overlay
        >
          <Box
            sx={{
              bgcolor: 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              width: '400px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // Ngăn đóng khi nhấp vào box
          >
            <Typography variant="h6" gutterBottom>
              Track Your Registration
            </Typography>
            <TextField
              autoFocus
              label="Enter Registration Code"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit()
                }
              }}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button variant="contained" onClick={handleSearchSubmit}>
                Search
              </Button>
              <Button variant="outlined" onClick={handleSearchToggle}>
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default DrawerAppBar