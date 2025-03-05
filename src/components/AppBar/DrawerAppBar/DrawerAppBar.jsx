import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { useState } from 'react'
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
import ModeSelect from '~/components/ModeSelect/ModeSelect'

const DrawerAppBar = ({
  drawerOpen,
  toggleDrawer
}) => {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
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
              <ListItemButton component={Link} to={'/'} onClick={toggleDrawer(false)}>
                <HomeIcon sx={{ mr: 1 }} />
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleClick}>
                <SettingsSuggestIcon sx={{ mr: 1 }} />
                <ListItemText primary="Services" />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 5 }} component={Link} to='/service/dial-up-connection' onClick={toggleDrawer(false)}>
                  <DialpadIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Dial-up" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 5 }} component={Link} to='/service/broadband-connection' onClick={toggleDrawer(false)}>
                  <WifiIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Broadband" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 5 }} component={Link} to='/service/landline-connection' onClick={toggleDrawer(false)}>
                  <PhoneIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Landline" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={'/about-us'} onClick={toggleDrawer(false)}>
                <InfoIcon sx={{ mr: 1 }} />
                <ListItemText primary="About Us" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={'/support'} onClick={toggleDrawer(false)}>
                <SupportAgentIcon sx={{ mr: 1 }} />
                <ListItemText primary="Support" />
              </ListItemButton>
            </ListItem>
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ModeSelect />
          </Box>
        </Box>
      </Drawer>
    </Box>
  )
}

export default DrawerAppBar