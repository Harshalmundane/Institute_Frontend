import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Container,
  Grid,
  Button,
  useTheme
} from '@mui/material';
import { Person, Home } from '@mui/icons-material';

const AdminSlider = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setAdminInfo(userData);
      }
    } catch (error) {
      console.error('Error parsing admin info from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGoToLanding = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6">Loading admin details...</Typography>
        </Box>
      </Container>
    );
  }

  if (!adminInfo) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h6" color="error">
            No admin info found. Please log in.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: { xs: '60vh', md: '80vh' }
        }}
      >
        <Grid item xs={12}>
          <Paper
            elevation={4}
            sx={{
              p: { xs: 2, sm: 4 },
              mt: { xs: 3, sm: 6 },
              borderRadius: 4,
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.palette.primary.light}99 0%, ${theme.palette.background.paper} 100%)`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
              transition: 'box-shadow 0.3s',
              '&:hover': {
                boxShadow: '0 16px 40px rgba(0,0,0,0.18)'
              }
            }}
          >
            <Avatar
              sx={{
                width: 88,
                height: 88,
                mx: 'auto',
                mb: 2,
                bgcolor: 'primary.main',
                boxShadow: '0 4px 16px rgba(33,150,243,0.10)'
              }}
            >
              <Person sx={{ fontSize: 44 }} />
            </Avatar>
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontWeight: 700,
                letterSpacing: 1
              }}
            >
              Welcome, {adminInfo.fullName}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              gutterBottom
              sx={{ wordBreak: 'break-all' }}
            >
              {adminInfo.emailAddress}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Admin ID: {adminInfo.id}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={handleGoToLanding}
                fullWidth
                size="large"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(33,150,243,0.10)',
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 100%)`
                  }
                }}
              >
                Go to Landing Page
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminSlider;
