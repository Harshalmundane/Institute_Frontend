// components/FeaturedBranches.js - Enhanced Frontend with Modern Design
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  Button,
  Chip,
  Skeleton,
  Fade,
  alpha,
  useTheme
} from '@mui/material';
import { getFeaturedBranches } from '../../redux/slice/branchSlice';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 20,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(102, 126, 234, 0.25)',
    '& .card-image': {
      transform: 'scale(1.15)',
    },
    '& .overlay': {
      opacity: 1,
    },
    '& .explore-btn': {
      transform: 'translateX(0)',
      opacity: 1,
    }
  }
}));

const ImageOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, rgba(102, 126, 234, 0) 0%, rgba(102, 126, 234, 0.9) 100%)',
  opacity: 0,
  transition: 'opacity 0.4s ease',
  display: 'flex',
  alignItems: 'flex-end',
  padding: 3,
});

const FeaturedBranches = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { featuredBranches, loading, error } = useSelector((state) => state.branches);

  useEffect(() => {
    if (featuredBranches.length === 0) {
      dispatch(getFeaturedBranches());
    }
  }, [dispatch, featuredBranches.length]);

  // Loading State
  if (loading) {
    return (
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative Elements */}
        <Box sx={{ 
          position: 'absolute', 
          top: -100, 
          right: -100, 
          width: 400, 
          height: 400, 
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2
              }}
            >
              Featured Branches
            </Typography>
            <Box sx={{ 
              width: 100, 
              height: 4, 
              background: 'linear-gradient(90deg, #667eea, #764ba2)',
              borderRadius: 2,
              margin: '0 auto'
            }} />
          </Box>
          
          <Grid container spacing={4}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
                  <Skeleton variant="rectangular" height={250} animation="wave" />
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" height={40} width="80%" sx={{ mb: 2 }} />
                    <Skeleton variant="text" height={20} width="100%" />
                    <Skeleton variant="text" height={20} width="90%" />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    );
  }

  // Error State
  if (error) {
    return (
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #fff5f5 0%, #ffffff 100%)'
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center' }}>
              <Box 
                sx={{ 
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 3rem',
                  boxShadow: '0 10px 40px rgba(255, 107, 107, 0.3)'
                }}
              >
                <ErrorOutlineIcon sx={{ fontSize: 60, color: 'white' }} />
              </Box>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  color: '#ff6b6b',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Oops! Something went wrong
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                {error}
              </Typography>
              
              <Button 
                variant="contained" 
                size="large"
                startIcon={<RefreshIcon />}
                onClick={() => dispatch(getFeaturedBranches())}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                  }
                }}
              >
                Try Again
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  // Empty State
  if (!featuredBranches || featuredBranches.length === 0) {
    return (
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)'
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={800}>
            <Box sx={{ textAlign: 'center' }}>
              <Box 
                sx={{ 
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 3rem',
                  boxShadow: '0 10px 40px rgba(102, 126, 234, 0.3)'
                }}
              >
                <BusinessIcon sx={{ fontSize: 80, color: 'white' }} />
              </Box>
              
              <Typography 
                variant="h3" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                No Featured Branches Yet
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'text.secondary',
                  mb: 4,
                  maxWidth: 500,
                  mx: 'auto'
                }}
              >
                We're working on adding amazing branches to our network. Check back soon!
              </Typography>
              
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<RefreshIcon />}
                onClick={() => dispatch(getFeaturedBranches())}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderWidth: 2,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-3px)',
                    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
                  }
                }}
              >
                Refresh
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  // Main Content
  return (
    <Box 
      sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <Box sx={{ 
        position: 'absolute', 
        top: -150, 
        right: -150, 
        width: 500, 
        height: 500, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -100, 
        left: -100, 
        width: 400, 
        height: 400, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            label="Explore Our Network" 
            sx={{ 
              mb: 3,
              px: 2,
              py: 3,
              fontSize: '0.95rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              color: 'primary.main',
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.2)
            }} 
          />
          
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
            Featured Branches
          </Typography>
          
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', md: '1.25rem' }
            }}
          >
            Discover our premium locations designed for excellence in education and innovation
          </Typography>
          
          <Box sx={{ 
            width: 100, 
            height: 4, 
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: 2,
            margin: '2rem auto 0'
          }} />
        </Box>
        
        {/* Branches Grid */}
        <Grid container spacing={4} justifyContent="center">
          {featuredBranches.map((branch, index) => (
            <Grid item xs={12} sm={6} md={4} key={branch._id}>
              <Fade in timeout={600 + index * 200}>
                <StyledCard>
                  {/* Image Section */}
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 280 }}>
                    <CardMedia 
                      component="img" 
                      className="card-image"
                      sx={{ 
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }}
                      image={branch.branchImage 
                        ? `${import.meta.env.VITE_API_BASE_URL}/${branch.branchImage.replace(/\\/g, '/')}` 
                        : 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=600&h=400&fit=crop'
                      } 
                      alt={branch.branchName} 
                    />
                    
                    <ImageOverlay className="overlay">
                      <Button 
                        className="explore-btn"
                        variant="contained"
                        endIcon={<ArrowForwardIcon />}
                        sx={{
                          bgcolor: 'white',
                          color: 'primary.main',
                          fontWeight: 700,
                          px: 3,
                          py: 1.5,
                          borderRadius: 2,
                          opacity: 0,
                          transform: 'translateX(-20px)',
                          transition: 'all 0.4s ease 0.1s',
                          '&:hover': {
                            bgcolor: 'white',
                            transform: 'translateX(0) scale(1.05)',
                          }
                        }}
                      >
                        Explore
                      </Button>
                    </ImageOverlay>

                    {/* Office Type Badge */}
                    <Chip 
                      icon={<BusinessIcon sx={{ fontSize: 16 }} />}
                      label={branch.officeType}
                      sx={{ 
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'white',
                        fontWeight: 600,
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
                        '& .MuiChip-icon': {
                          color: 'primary.main'
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Content Section */}
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        lineHeight: 1.3
                      }}
                    >
                      {branch.branchName}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mt: 'auto' }}>
                      <LocationOnIcon sx={{ color: 'primary.main', fontSize: 20, mt: 0.5 }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: '0.95rem'
                        }}
                      >
                        {branch.address?.substring(0, 80)}
                        {branch.address?.length > 80 && '...'}
                      </Typography>
                    </Box>
                  </CardContent>
                </StyledCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
        
        {/* View More Button */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button 
            variant="outlined" 
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 2,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'none',
              borderWidth: 2,
              borderColor: 'primary.main',
              color: 'primary.main',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                transition: 'left 0.4s ease',
                zIndex: -1
              },
              '&:hover': {
                borderWidth: 2,
                color: 'white',
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)',
                '&::before': {
                  left: 0
                }
              }
            }}
          >
            View All Branches
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedBranches;