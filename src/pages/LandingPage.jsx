// LandingPage.js - Main Landing Page Component
// This ties all sections together. Import all components and render them in order.

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '../componets/Navbar/Navbar';
import Hero from '../componets/Hero/Hero';
import FeaturedCourses from '../componets/Courses/CourseCard';
import FeaturedBranches from '../componets/Branche/BranchCard';
import Achievements from '../componets/Achivmentes/Achivmnetes';
import CampusPhotos from '../componets/CompusGallery/CampusPhotos';
import Footer from '../componets/Footer/Footer';

// Create a modern theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue for education theme
    },
    secondary: {
      main: '#dc004e', // Accent red
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
    },
  },
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: 'lg',
      },
    },
  },
});

const LandingPage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ overflowX: 'hidden' }}>
        <Navbar />
        <Hero />
        <FeaturedCourses />
        <FeaturedBranches />
        <Achievements />
        <CampusPhotos />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LandingPage;