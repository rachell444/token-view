import { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import ButtonBase from '@mui/material/ButtonBase';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';

// Material Icons
import DarkModeIcon from '@mui/icons-material/DarkMode';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import HelpIcon from '@mui/icons-material/HelpOutlineOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import UserIcon from '@mui/icons-material/Person';

// Font Awesome Icon
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ColorModeContext from '../components/ColorModeContext';
import CustomButton from '../components/CustomButton';


library.add(faChartLine);

const Header = ({ onSidebarOpen, onAboutOpen }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const anchorRef = useRef(null);
  const colorMode = useContext(ColorModeContext);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <AppBar
        elevation={5}
        sx={{
          top: 0,
          border: 0,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.secondary,
        }}
      >
        <Toolbar sx={{ minHeight: 70 }}>
          <Box
            alignItems='center'
            sx={{ display: { md: 'block', lg: 'none' } }}
          >
            <Button
              color='inherit'
              variant='outlined'
              onClick={() => onSidebarOpen()}
              aria-label='Menu'
              sx={{
                borderRadius: 2,
                minWidth: 'auto',
                padding: 1,
                color: theme.palette.text.secondary,
                borderColor: alpha(theme.palette.text.secondary, 0.2),
              }}
            >
              <MenuIcon fontSize='medium' />
            </Button>
          </Box>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    height: 38,
    width: 38,
    background: 'linear-gradient(135deg, #b993f4 0%, #5f72bd 100%)',
    boxShadow: '0 2px 8px rgba(95,114,189,0.13)',
    mr: 1.2,
  }}
>
  <FontAwesomeIcon icon={faChartLine} style={{ fontSize: 20, color: '#fff' }} />
</Box>
              <Typography
                variant='h3'
                component='div'
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  display: { md: 'inline', xs: 'none' },
                  position: 'relative',
                  '& span.highlight': {
                    color: theme.palette.primary.main,
                    position: 'relative',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      width: '100%',
                      height: '4px',
                      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                      bottom: '-2px',
                      left: 0,
                      borderRadius: '8px',
                      opacity: 0.7
                    }
                  }
                }}
              >
                <span className="highlight">Token</span>View
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Box align="right" sx={{ flexGrow: 1, display: { md: 'flex', xs: 'none' }, justifyContent: 'flex-end' }}>
            <Button
              component={Link}
              to="/"
              startIcon={<DashboardIcon />}
              sx={{
                borderRadius: '8px',
                mx: 1,
                py: 1,
                px: 2,
                color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.1) : alpha(theme.palette.primary.main, 0.05),
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.1),
                },
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Dashboard
            </Button>
            <IconButton
              aria-label="About"
              onClick={onAboutOpen}
              sx={{
                mx: 1,
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.08) : alpha(theme.palette.secondary.main, 0.04),
                borderRadius: '8px',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.secondary.main, 0.16) : alpha(theme.palette.secondary.main, 0.10),
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <HelpIcon />
            </IconButton>
          </Box>
          <Divider
            orientation='vertical'
            sx={{
              height: 32,
              marginX: 2,
              display: { lg: 'flex', md: 'none', xs: 'none' },
            }}
          />
          <Box sx={{ display: 'flex' }}>
            <IconButton
              onClick={colorMode.toggleColorMode}
              aria-label='Theme Mode'
              sx={{
                backgroundColor: theme.palette.mode === 'dark' ? alpha('#FFC107', 0.1) : alpha('#5C6BC0', 0.1),
                borderRadius: '12px',
                padding: '10px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark' ? alpha('#FFC107', 0.2) : alpha('#5C6BC0', 0.2),
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {theme.palette.mode === 'dark' ? (
                <LightModeIcon fontSize='medium' sx={{ color: '#FFC107' }} />
              ) : (
                <DarkModeIcon fontSize='medium' sx={{ color: '#5C6BC0' }} />
              )}
            </IconButton>
          </Box>
          <Divider
            orientation='vertical'
            sx={{
              height: 32,
              marginX: 2,
              display: { lg: 'flex', md: 'none', xs: 'none' },
            }}
          />
          <Box sx={{ display: { lg: 'flex', md: 'none', xs: 'none' } }}>
            <Box
              component={ButtonBase}
              onClick={handleOpen}
              ref={anchorRef}
              sx={{
                alignItems: 'center',
                display: 'flex',
              }}
            >
              <Box
  sx={{
    width: 44,
    height: 44,
    borderRadius: '12px',
    background: theme.palette.mode === 'dark'
      ? alpha('#b993f4', 0.16)
      : alpha('#b993f4', 0.10),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    transition: 'background 0.18s cubic-bezier(.4,0,.2,1)',
    cursor: 'pointer',
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? alpha('#b993f4', 0.26)
        : alpha('#b993f4', 0.18)
    }
  }}
>
  <UserIcon sx={{ color: '#fff', fontSize: 26 }} />
</Box>
            </Box>
            <Popover
              anchorEl={anchorRef.current}
              anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
              }}
              keepMounted
              onClose={handleClose}
              open={open}
              PaperProps={{
                sx: { width: 240 },
              }}
            >
              <Box sx={{ p: 2 }}>
                <Typography
                  color={theme.palette.text.primary}
                  variant='subtitle2'
                  sx={{ fontWeight: 700, fontSize: '1.08rem', letterSpacing: 0.1 }}
                >
                  Alex
                </Typography>
                <Typography
                  color={theme.palette.text.secondary}
                  variant='subtitle2'
                >
                  Your plan: Free
                </Typography>
              </Box>
              <Divider />
              <Box sx={{ marginTop: 2 }}>
                <MenuItem component={Link} to='#'>
                  <ListItemIcon>
                    <UserIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color={theme.palette.text.primary}
                        variant='subtitle2'
                      >
                        Profile
                      </Typography>
                    }
                  />
                </MenuItem>
                <MenuItem component={Link} to='#'>
                  <ListItemIcon>
                    <SettingsIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        color={theme.palette.text.primary}
                        variant='subtitle2'
                      >
                        Settings
                      </Typography>
                    }
                  />
                </MenuItem>
              </Box>
              <Box sx={{ padding: 2 }}>
                <Button
                  fullWidth
                  variant='outlined'
                  href='#'
                  sx={{
                    mt: 1.5,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: 'transparent',
                    background: 'linear-gradient(135deg, #b993f4 0%, #5f72bd 100%)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.92rem',
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    boxShadow: '0 1px 3px rgba(95,114,189,0.10)',
                    minWidth: 80,
                    padding: '4px 14px',
                    transition: 'filter 0.18s cubic-bezier(.4,0,.2,1)',
                    outline: 'none',
                    '&:hover': {
                      filter: 'brightness(1.08)',
                      color: '#fff',
                    }
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: 500 }}>Logout</span>
                </Button>
              </Box>
            </Popover>
          </Box>
          {theme.palette.mode === 'dark' && <Divider />}
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  onSidebarOpen: PropTypes.func,
  onAboutOpen: PropTypes.func,
};

export default Header;
