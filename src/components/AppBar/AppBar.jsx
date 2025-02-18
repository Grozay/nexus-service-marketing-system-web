import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import CableIcon from '@mui/icons-material/Cable'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import ModeSelect from '../ModeSelect/ModeSelect'
import DrawerAppBar from './DrawerAppBar/DrawerAppBar'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElNavPlans, setAnchorElNavPlans] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleOpenNavMenuPlans = (event) => {
    setAnchorElNavPlans(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleCloseNavMenuPlans = () => {
    setAnchorElNavPlans(null)
  }

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }

  return (
    <Box sx={{ height: (theme) => theme.nexus.appBarHeight }}>
      <AppBar
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              NEXUS
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <DrawerAppBar
                drawerOpen={drawerOpen}
                toggleDrawer={toggleDrawer}
                anchorElNavPlans={anchorElNavPlans}
                handleOpenNavMenuPlans={handleOpenNavMenuPlans}
                handleCloseNavMenuPlans={handleCloseNavMenuPlans}
              />
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
              <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Home
                </Button>
              </Link>
              <Button
                id="basic-button"
                aria-controls={Boolean(anchorElNavPlans) ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElNavPlans) ? 'true' : undefined}
                onClick={handleOpenNavMenuPlans}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Plans Services
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorElNavPlans}
                open={Boolean(anchorElNavPlans)}
                onClose={handleCloseNavMenuPlans}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem component={Link} to='/service/dial-up-connection' onClick={handleCloseNavMenuPlans}>
                  <Typography textAlign="center">Dial-up</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/service/broadband-connection' onClick={handleCloseNavMenuPlans}>
                  <Typography textAlign="center">Broadband</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/service/landline-connection' onClick={handleCloseNavMenuPlans}>
                  <Typography textAlign="center">Landline</Typography>
                </MenuItem>
              </Menu>
              <Link to={'/about-us'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  About Us
                </Button>
              </Link>
              <Link to={'/support'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Support
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <ModeSelect />
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Link to={'/profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseUserMenu} role="menuitem" tabIndex={0}>
                    <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonOutlineIcon />
                      Profile
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to={'/profile/registered-plans'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PlaylistAddCheckIcon fontSize="small" />
                      Registered Plans
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to={'/profile/order-status'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocalShippingIcon fontSize="small" />
                      Order Status
                    </Typography>
                  </MenuItem>
                </Link>
                <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LogoutIcon fontSize="small" />
                    Logout
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
export default NavBar
