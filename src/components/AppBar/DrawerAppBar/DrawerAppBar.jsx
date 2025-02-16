import React from 'react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import Collapse from '@mui/material/Collapse'
import HomeIcon from '@mui/icons-material/Home'
import DialerSipIcon from '@mui/icons-material/DialerSip'
import WifiIcon from '@mui/icons-material/Wifi'
import PhoneIcon from '@mui/icons-material/Phone'
import InfoIcon from '@mui/icons-material/Info'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'

const DrawerAppBar = ({
  drawerOpen,
  toggleDrawer
}) => {
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ height: (theme) => theme.nexus.appBarHeight }}>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
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
                <ListItemButton sx={{ pl: 4 }} component={Link} to='/service/dial-up' onClick={toggleDrawer(false)}>
                  <DialerSipIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Dial-up" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to='/service/broadband' onClick={toggleDrawer(false)}>
                  <WifiIcon sx={{ mr: 1 }} />
                  <ListItemText primary="Broadband" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to='/service/landline' onClick={toggleDrawer(false)}>
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
        </Box>
      </Drawer>
    </Box>
  )
}

export default DrawerAppBar