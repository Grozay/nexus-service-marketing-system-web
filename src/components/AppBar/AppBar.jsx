import { useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import LogoutIcon from '@mui/icons-material/Logout'
import ModeSelect from '../ModeSelect/ModeSelect'
import DrawerAppBar from './DrawerAppBar/DrawerAppBar'
import { useDispatch, useSelector } from 'react-redux'
import { logoutAccountApi, selectCurrentAccount } from '~/redux/user/accountSlice'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'
import { Divider } from '@mui/material'

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElNavPlans, setAnchorElNavPlans] = useState(null)
  const [anchorElNavSupport, setAnchorElNavSupport] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const currentAccount = useSelector(selectCurrentAccount)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleOpenNavMenuPlans = (event) => {
    setAnchorElNavPlans(event.currentTarget)
  }
  const handleOpenNavMenuSupport = (event) => {
    setAnchorElNavSupport(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(anchorElNav)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleCloseNavMenuPlans = () => {
    setAnchorElNavPlans(null)
  }
  const handleCloseNavMenuSupport = () => {
    setAnchorElNavSupport(null)
  }
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setDrawerOpen(open)
  }
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

  // Xử lý tìm kiếm
  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen)
    setSearchValue('')
  }
  const handleSearchSubmit = () => {
    if (searchValue.trim()) {
      navigate(`/search-registration?search=${(searchValue)}`)
      setSearchOpen(false)
    } else {
      toast.error('Please enter a search value.')
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
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center', gap: 1 }}>
              <Button
                id="services-button"
                aria-controls={Boolean(anchorElNavPlans) ? 'services-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElNavPlans) ? 'true' : undefined}
                onClick={handleOpenNavMenuPlans}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span>Services</span>
                  <ExpandMoreIcon fontSize="medium" />
                </Box>
              </Button>
              <Menu
                id="services-menu"
                anchorEl={anchorElNavPlans}
                open={Boolean(anchorElNavPlans)}
                onClose={handleCloseNavMenuPlans}
                MenuListProps={{
                  'aria-labelledby': 'services-button'
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
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
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
                  About Us
                </Button>
              </Link>

              <Button
                id="support-button"
                aria-controls={Boolean(anchorElNavSupport) ? 'support-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElNavSupport) ? 'true' : undefined}
                onClick={handleOpenNavMenuSupport}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <span>Support</span>
                  <ExpandMoreIcon fontSize="medium" />
                </Box>
              </Button>
              <Menu
                id="support-menu"
                anchorEl={anchorElNavSupport}
                open={Boolean(anchorElNavSupport)}
                onClose={handleCloseNavMenuSupport}
                MenuListProps={{
                  'aria-labelledby': 'support-button'
                }}
              >
                <MenuItem component={Link} to='/support' onClick={handleCloseNavMenuSupport}>
                  <Typography textAlign="center">Support</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/stores' onClick={handleCloseNavMenuSupport}>
                  <Typography textAlign="center">Store Locations</Typography>
                </MenuItem>
                <MenuItem component={Link} to='/contact-us' onClick={handleCloseNavMenuSupport}>
                  <Typography textAlign="center">Contact Us</Typography>
                </MenuItem>
              </Menu>

              <Link to={'/news'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
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
                  News & Events
                </Button>
              </Link>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                <Tooltip title="Track Your Registration">
                  <Typography onClick={handleSearchToggle}
                    sx={{
                      cursor: 'pointer',
                      color: 'white',
                      display: { lg: 'flex', md: 'none', xs: 'none' },
                      alignItems: 'center',
                      gap: 1,
                      fontSize: '14px',
                      borderRadius: 2,
                      padding: 1
                    }}
                  >
                    <IconButton sx={{ p: 0, color: 'white' }}>
                      <SearchIcon />
                    </IconButton>
                    Tracking
                  </Typography>
                </Tooltip>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Divider orientation="vertical" sx={{ height: '20px', bgcolor: 'white', mx: 1 }} />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <ModeSelect />
                </Box>

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Divider orientation="vertical" sx={{ height: '20px', bgcolor: 'white', mx: 1 }} />
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
                <Link to={'/account/profile'} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem onClick={handleCloseUserMenu} role="menuitem" tabIndex={0}>
                    <Typography sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonOutlineIcon />
                      Profile
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

      {searchOpen && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={handleSearchToggle}
        >
          <Box
            sx={{
              bgcolor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
              p: 3,
              borderRadius: 2,
              boxShadow: 3,
              width: '400px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // Ngăn đóng khi nhấp vào input box
          >
            <Typography sx={{
              textAlign: 'center'
            }}
            variant="h6"
            gutterBottom>
              Track Your Registration
            </Typography>
            <TextField
              autoFocus
              label="Enter Your Email"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit()
                }
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {

                }
              }}
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

export default NavBar