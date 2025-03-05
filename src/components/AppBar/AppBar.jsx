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
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import ModeSelect from '../ModeSelect/ModeSelect'
import DrawerAppBar from './DrawerAppBar/DrawerAppBar'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAccountApi, selectCurrentAccount } from '~/redux/user/accountSlice'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElNavPlans, setAnchorElNavPlans] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const currentAccount = useSelector(selectCurrentAccount)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  //Confirm logout
  const confirmLogout = useConfirm()
  const handleLogout = async () => {
    const { confirmed } = await confirmLogout({
      title: 'Are you sure you want to logout?',
      cancellationText: 'Cancel',
      confirmationText: 'Confirm'
    })

    if (confirmed) {
      toast.promise(
        dispatch(logoutAccountApi()), {
          pending: 'Logging out...'
        }
      ).then((res) => {
        if (!res.error) {
          navigate('/account/login')
        }
      })
    }
  }

  return (
    <Box sx={{ height: (theme) => theme.nexus.appBarHeight }}>
      <AppBar
        sx={{
          height: (theme) => theme.nexus.appBarHeight,
          backgroundColor: (theme) => theme.palette.primary.main,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            </Link>
            <Typography
              variant="h6"
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
              <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
                NEXUS SERVICE
              </Link>
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
              NEXUS SERVICE
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'center' } }}>
              <Button
                id="basic-button"
                aria-controls={Boolean(anchorElNavPlans) ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElNavPlans) ? 'true' : undefined}
                onClick={handleOpenNavMenuPlans}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span>Services</span>
                  <ExpandMoreIcon fontSize="medium" />
                </Box>
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
                  <Typography textAlign="center">Dial-up Connection</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/service/broad-band-connection' onClick={handleCloseNavMenuPlans}>
                  <Typography textAlign="center">Broadband Connection</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/service/landline-connection' onClick={handleCloseNavMenuPlans}>
                  <Typography textAlign="center">Landline Connection</Typography>
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
              <Link to={'/news'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  News & Events
                </Button>
              </Link>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <ModeSelect />
                </Box>
                {currentAccount && (
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="#" />
                    </IconButton>
                  </Tooltip>
                )}
                {!currentAccount && (
                  <Button
                    color="primary"
                    variant="contained"
                    component={Link}
                    to={'/account/login'}
                    sx={{
                      backgroundColor: 'white',
                      color: 'primary.main'
                    }}
                  >
                    Login
                  </Button>
                )}
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
                <Typography onClick={handleLogout} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LogoutIcon fontSize="small" />
                      Logout
                    </Typography>
                  </MenuItem>
                </Typography>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  )
}
export default NavBar
