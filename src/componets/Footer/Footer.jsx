// components/Footer.js - Enhanced Modern Footer
import React from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  Link, 
  IconButton,
  Divider,
  Stack,

  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Styled Components
// eslint-disable-next-line no-unused-vars
const StyledFooterLink = styled(Link)(({ theme }) => ({
  display: 'block',
  color: 'rgba(255, 255, 255, 0.8)',
  textDecoration: 'none',
  marginBottom: '12px',
  fontSize: '0.95rem',
  transition: 'all 0.3s ease',
  position: 'relative',
  paddingLeft: '20px',
  '&::before': {
    content: '"→"',
    position: 'absolute',
    left: 0,
    opacity: 0,
    transform: 'translateX(-10px)',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    color: 'white',
    paddingLeft: '25px',
    '&::before': {
      opacity: 1,
      transform: 'translateX(0)',
    }
  }
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  width: 45,
  height: 45,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 25px rgba(255, 255, 255, 0.3)',
  }
}));

const ScrollToTopButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: 30,
  right: 30,
  width: 60,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
  zIndex: 1000,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.6)',
  }
}));

const Footer = () => {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Quick Links',
      links: [
        { text: 'Courses', href: '/courses' },
        { text: 'Branches', href: '/branches' },
        { text: 'Admissions', href: '/admissions' },
        { text: 'About Us', href: '/about' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { text: 'Student Portal', href: '/portal' },
        { text: 'Library', href: '/library' },
        { text: 'Career Services', href: '/careers' },
        { text: 'Alumni Network', href: '/alumni' },
      ]
    },
    {
      title: 'Support',
      links: [
        { text: 'Help Center', href: '/help' },
        { text: 'FAQs', href: '/faq' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'Feedback', href: '/feedback' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <TwitterIcon />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <InstagramIcon />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <YouTubeIcon />, href: 'https://youtube.com', label: 'YouTube' },
  ];

  const contactInfo = [
    { icon: <EmailIcon />, text: 'info@eduinstitute.com', href: 'mailto:info@eduinstitute.com' },
    { icon: <PhoneIcon />, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: <LocationOnIcon />, text: '123 Education St, Learning City, ED 12345', href: '#' },
  ];

  return (
    <>
      <Box
        component="footer"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          mt: 'auto',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #ffd89b 0%, #19547b 100%)',
          }
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
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <Box sx={{ 
          position: 'absolute', 
          bottom: -150, 
          left: -150, 
          width: 500, 
          height: 500, 
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          {/* Main Footer Content */}
          <Box sx={{ py: 8 }}>
            <Grid container spacing={5}>
              {/* Brand Section */}
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 800,
                        letterSpacing: '-0.5px'
                      }}
                    >
                      EduInstitute
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 3, 
                      lineHeight: 1.8,
                      opacity: 0.9,
                      fontSize: '1rem'
                    }}
                  >
                    Empowering futures through world-class education, innovation, and excellence since 1990.
                  </Typography>

                  {/* Social Links */}
                  <Typography 
                    variant="subtitle2" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      letterSpacing: '1px',
                      textTransform: 'uppercase'
                    }}
                  >
                    Connect With Us
                  </Typography>
                  <Stack direction="row" spacing={1.5}>
                    {socialLinks.map((social, index) => (
                      <SocialIconButton
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </SocialIconButton>
                    ))}
                  </Stack>
                </Box>
              </Grid>

              {/* Footer Links Sections */}
              {footerSections.map((section, index) => (
                <Grid item xs={12} sm={4} md={2.66} key={index}>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      position: 'relative',
                      paddingBottom: '12px',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '40px',
                        height: '3px',
                        background: 'white',
                        borderRadius: '2px',
                      }
                    }}
                  >
                    {section.title}
                  </Typography>
                  <Box>
                    {section.links.map((link, linkIndex) => (
                      <StyledFooterLink key={linkIndex} href={link.href}>
                        {link.text}
                      </StyledFooterLink>
                    ))}
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Contact Info Section */}
            <Box sx={{ mt: 6, pt: 5, borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  fontSize: '1.1rem'
                }}
              >
                Contact Information
              </Typography>
              <Grid container spacing={3}>
                {contactInfo.map((contact, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Link
                      href={contact.href}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        color: 'white',
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(5px)',
                          opacity: 0.8,
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 45,
                          height: 45,
                          borderRadius: 2,
                          background: 'rgba(255, 255, 255, 0.15)',
                          backdropFilter: 'blur(10px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {contact.icon}
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                        {contact.text}
                      </Typography>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

          {/* Bottom Footer */}
          <Box 
            sx={{ 
              py: 4,
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                opacity: 0.9,
                fontSize: '0.95rem'
              }}
            >
              © 2025 EduInstitute. All rights reserved. Made with 
              <FavoriteIcon sx={{ fontSize: 18, color: '#ff6b6b' }} /> 
              for education
            </Typography>
            
            <Stack 
              direction="row" 
              spacing={3}
              divider={<Divider orientation="vertical" flexItem sx={{ bgcolor: 'rgba(255, 255, 255, 0.3)' }} />}
            >
              <Link 
                href="/privacy" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'opacity 0.3s ease',
                  '&:hover': { opacity: 0.7 }
                }}
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'opacity 0.3s ease',
                  '&:hover': { opacity: 0.7 }
                }}
              >
                Terms of Service
              </Link>
              <Link 
                href="/cookies" 
                sx={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'opacity 0.3s ease',
                  '&:hover': { opacity: 0.7 }
                }}
              >
                Cookie Policy
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <ScrollToTopButton onClick={scrollToTop} aria-label="Scroll to top">
          <ArrowUpwardIcon />
        </ScrollToTopButton>
      )}
    </>
  );
};

export default Footer;