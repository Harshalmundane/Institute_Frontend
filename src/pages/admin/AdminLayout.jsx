// Updated Admin.js - Modern Enhanced Admin Dashboard
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { 
  Box, 
  Tabs, 
  Tab, 
  Typography, 
  Container,
  Paper,
  Fade,
  alpha,
  useTheme,
  Chip,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import StarIcon from '@mui/icons-material/Star';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

import AdminDetails from '../../componets/Admin/AdminSlider';
import Course from '../../componets/Courses/CoursesSlider';
import Branches from '../../componets/Branche/BranchSlider';
import Features from '../../componets/Fetures/FeturesSlider';

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  background: 'white',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

// eslint-disable-next-line no-unused-vars
const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 4,
    borderRadius: '4px 4px 0 0',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
  '& .MuiTabs-flexContainer': {
    gap: '8px',
    padding: '16px',
  }
}));

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  minHeight: 70,
  borderRadius: 16,
  transition: 'all 0.3s ease',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    background: alpha(theme.palette.primary.main, 0.08),
    fontWeight: 700,
  },
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.05),
    transform: 'translateY(-2px)',
  },
  '& .MuiTab-iconWrapper': {
    marginBottom: 8,
  }
}));

const HeaderChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
  color: theme.palette.primary.main,
  fontWeight: 700,
  fontSize: '0.9rem',
  padding: '8px 16px',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
  }
}));

const Admin = () => {
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (event, newValue) => {
    // If on a sub-route (e.g., /admin/branches/create), navigate back to /admin first
    if (location.pathname !== '/admin') {
      navigate('/admin', { replace: true });
    }
    setValue(newValue);
  };

  const tabs = [
    { 
      label: 'Admin Details', 
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 28 }} />,
      component: <AdminDetails />
    },
    { 
      label: 'Courses', 
      icon: <SchoolIcon sx={{ fontSize: 28 }} />,
      component: <Course />
    },
    { 
      label: 'Branches', 
      icon: <BusinessIcon sx={{ fontSize: 28 }} />,
      component: <Branches />
    },
    { 
      label: 'Features', 
      icon: <StarIcon sx={{ fontSize: 28 }} />,
      component: <Features />
    },
  ];

  // Render tab content only if on main /admin (not sub-routes)
  const renderTabContent = () => {
    if (location.pathname !== '/admin') {
      return null; // Hide tab content on sub-routes like /admin/branches/create
    }
    return tabs[value].component;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 50%, #f8f9ff 100%)',
        py: { xs: 4, md: 6 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <Box sx={{ 
        position: 'absolute', 
        top: -100, 
        right: -100, 
        width: 400, 
        height: 400, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -150, 
        left: -150, 
        width: 500, 
        height: 500, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Fade in={isVisible} timeout={800}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            {/* Admin Badge */}
            <HeaderChip 
              icon={<DashboardIcon />}
              label="Management Portal"
              sx={{ mb: 3 }}
            />

            {/* Title */}
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: '-1px'
              }}
            >
              Admin Dashboard
            </Typography>

            {/* Subtitle */}
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Manage your institute's content, courses, branches, and features all in one place
            </Typography>

            {/* Decorative Line */}
            <Box sx={{ 
              width: 100, 
              height: 4, 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: 2,
              margin: '2rem auto 0'
            }} />
          </Box>
        </Fade>

        {/* Main Dashboard Paper */}
        <Fade in={isVisible} timeout={1000}>
          <StyledPaper>
            {/* Tabs Section */}
            <Box sx={{ 
              borderBottom: 1, 
              borderColor: 'divider',
              background: alpha(theme.palette.primary.main, 0.02)
            }}>
              <StyledTabs 
                value={value} 
                onChange={handleChange} 
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
              >
                {tabs.map((tab, index) => (
                  <StyledTab 
                    key={index}
                    icon={tab.icon}
                    label={tab.label}
                    iconPosition="top"
                  />
                ))}
              </StyledTabs>
            </Box>

            {/* Content Section */}
            <Box sx={{ 
              p: { xs: 2, sm: 3, md: 4 },
              minHeight: 400
            }}>
              <Fade in={true} timeout={600} key={value}>
                <Box>
                  {renderTabContent()}
                </Box>
              </Fade>
            </Box>
          </StyledPaper>
        </Fade>

        {/* Outlet for Sub-routes */}
        <Box sx={{ mt: 3 }}>
          <Outlet />
        </Box>

        {/* Stats Cards (Optional Enhancement) */}
        {location.pathname === '/admin' && (
          <Fade in={isVisible} timeout={1200}>
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              gap: 3,
              mt: 4
            }}>
              {[
                { label: 'Total Courses', value: '150+', icon: <SchoolIcon />, color: '#667eea' },
                { label: 'Branches', value: '25+', icon: <BusinessIcon />, color: '#764ba2' },
                { label: 'Features', value: '50+', icon: <StarIcon />, color: '#f093fb' },
                { label: 'Admins', value: '10+', icon: <AdminPanelSettingsIcon />, color: '#4facfe' }
              ].map((stat, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: 4,
                    background: 'white',
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 16px 48px ${alpha(stat.color, 0.2)}`,
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1, fontWeight: 600 }}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h3" sx={{ fontWeight: 800, color: stat.color }}>
                        {stat.value}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        width: 60,
                        height: 60,
                        background: alpha(stat.color, 0.15),
                        color: stat.color
                      }}
                    >
                      {stat.icon}
                    </Avatar>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default Admin;