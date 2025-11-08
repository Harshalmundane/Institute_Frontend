import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import SchoolIcon from '@mui/icons-material/School';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      sx={{
        width: 280,
        height: '100%',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        p: 3
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon /> EduInstitute
        </Typography>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {['Home', 'Courses', 'About', 'Contact'].map((text) => (
          <ListItem key={text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={`/${text.toLowerCase()}`}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.15)',
                  transform: 'translateX(8px)',
                  transition: 'all 0.3s ease'
                }
              }}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          component={Link}
          to="/signin"
          fullWidth
          variant="outlined"
          sx={{
            color: 'white',
            borderColor: 'white',
            '&:hover': {
              borderColor: 'white',
              bgcolor: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Sign In
        </Button>
        <Button
          component={Link}
          to="/signup"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: '#667eea',
            '&:hover': {
              bgcolor: '#f0f0f0',
              transform: 'scale(1.05)',
              transition: 'all 0.3s ease'
            }
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: scrolled ? 'white' : 'transparent',
          color: scrolled ? 'primary.main' : 'white',
          transition: 'all 0.3s ease-in-out',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.1)' : 'none',
          background: scrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)'
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            maxWidth: '1400px',
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            py: 1.5
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: scrolled
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(10px)',
                boxShadow: scrolled ? '0 4px 15px rgba(102, 126, 234, 0.3)' : 'none',
                transition: 'all 0.3s ease'
              }}
            >
              <SchoolIcon sx={{ color: scrolled ? 'white' : 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                background: scrolled
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              EduInstitute
            </Typography>
          </Box>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {['Home', 'Courses', 'About', 'Contact'].map((item) => (
                <Button
                  key={item}
                  component={Link}
                  to={`/${item.toLowerCase()}`}
                  sx={{
                    color: 'inherit',
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 500,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      bgcolor: scrolled ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255,255,255,0.2)',
                      transform: 'translateY(-2px)',
                      transition: 'all 0.3s ease'
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          {/* Auth Buttons - Desktop */}
          {!isMobile ? (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                component={Link}
                to="/signin"
                sx={{
                  color: 'inherit',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: scrolled ? 'rgba(102, 126, 234, 0.1)' : 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-2px)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Sign In
              </Button>
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: 'none',
                  background: scrolled
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white',
                  color: scrolled ? 'white' : '#667eea',
                  boxShadow: scrolled
                    ? '0 4px 15px rgba(102, 126, 234, 0.4)'
                    : '0 4px 15px rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    background: scrolled
                      ? 'linear-gradient(135deg, #5568d3 0%, #66408b 100%)'
                      : '#f0f0f0',
                    transform: 'scale(1.05) translateY(-2px)',
                    boxShadow: scrolled
                      ? '0 6px 20px rgba(102, 126, 234, 0.6)'
                      : '0 6px 20px rgba(255, 255, 255, 0.5)',
                    transition: 'all 0.3s ease'
                  }
                }}
              >
                Sign Up
              </Button>
            </Box>
          ) : (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                color: 'inherit',
                '&:hover': {
                  transform: 'rotate(90deg)',
                  transition: 'transform 0.3s ease'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box'
          }
        }}
      >
        {drawer}
      </Drawer>

      {/* Spacer for fixed AppBar */}
      <Toolbar />
    </>
  );
};

export default Navbar;