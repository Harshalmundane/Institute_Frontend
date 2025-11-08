// components/FeaturedCourses.js - Enhanced with Modern Design
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
  useTheme,
  IconButton,
  Stack
} from '@mui/material';
import { getFeaturedCourses } from '../../redux/slice/courseSlice';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { styled } from '@mui/material/styles';

// Styled Components
const StyledCourseCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 24,
  overflow: 'hidden',
  position: 'relative',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background: 'white',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  '&:hover': {
    transform: 'translateY(-16px)',
    boxShadow: '0 24px 48px rgba(102, 126, 234, 0.2)',
    '& .course-image': {
      transform: 'scale(1.1) rotate(2deg)',
    },
    '& .play-button': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
    '& .gradient-overlay': {
      opacity: 0.6,
    },
    '& .course-badge': {
      transform: 'translateY(0)',
      opacity: 1,
    }
  }
}));

const GradientOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.7) 100%)',
  opacity: 0,
  transition: 'opacity 0.4s ease',
});

const PlayButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.8)',
  opacity: 0,
  transition: 'all 0.4s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  width: 70,
  height: 70,
  '&:hover': {
    backgroundColor: 'white',
    transform: 'translate(-50%, -50%) scale(1.1)',
  }
});

const FeaturedCourses = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { featuredCourses, loading, error } = useSelector((state) => state.courses);

  useEffect(() => {
    if (featuredCourses.length === 0) {
      dispatch(getFeaturedCourses());
    }
  }, [dispatch, featuredCourses.length]);

  // Loading State
  if (loading) {
    return (
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          position: 'absolute', 
          bottom: -100, 
          left: -100, 
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
              Featured Courses
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
                  <Skeleton variant="rectangular" height={240} animation="wave" />
                  <CardContent sx={{ p: 3 }}>
                    <Skeleton variant="text" height={35} width="70%" sx={{ mb: 1 }} />
                    <Skeleton variant="text" height={20} width="100%" />
                    <Skeleton variant="text" height={20} width="90%" />
                    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="circular" width={40} height={40} />
                    </Box>
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
                Unable to Load Courses
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
                onClick={() => dispatch(getFeaturedCourses())}
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
                Retry
              </Button>
            </Box>
          </Fade>
        </Container>
      </Box>
    );
  }

  // Empty State
  if (!featuredCourses || featuredCourses.length === 0) {
    return (
      <Box 
        sx={{ 
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)'
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
                <MenuBookIcon sx={{ fontSize: 80, color: 'white' }} />
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
                No Courses Available
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
                We're curating amazing courses for you. Stay tuned for exciting updates!
              </Typography>
              
              <Button 
                variant="outlined" 
                size="large"
                startIcon={<RefreshIcon />}
                onClick={() => dispatch(getFeaturedCourses())}
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
        background: 'linear-gradient(180deg, #ffffff 0%, #f8f9ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background */}
      <Box sx={{ 
        position: 'absolute', 
        top: -100, 
        left: -100, 
        width: 500, 
        height: 500, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: -150, 
        right: -150, 
        width: 600, 
        height: 600, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(118, 75, 162, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip 
            icon={<TrendingUpIcon />}
            label="Top Rated Courses" 
            sx={{ 
              mb: 3,
              px: 2,
              py: 3,
              fontSize: '0.95rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
              color: 'primary.main',
              border: '1px solid',
              borderColor: alpha(theme.palette.primary.main, 0.3),
              '& .MuiChip-icon': {
                color: 'primary.main'
              }
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
            Featured Courses
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
            Master new skills with our expertly crafted courses designed for real-world success
          </Typography>
          
          <Box sx={{ 
            width: 100, 
            height: 4, 
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: 2,
            margin: '2rem auto 0'
          }} />
        </Box>
        
        {/* Courses Grid */}
        <Grid container spacing={4} justifyContent="center">
          {featuredCourses.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={course._id}>
              <Fade in timeout={600 + index * 200}>
                <StyledCourseCard>
                  {/* Image Section */}
                  <Box sx={{ position: 'relative', overflow: 'hidden', height: 260 }}>
                    <CardMedia 
                      component="img" 
                      className="course-image"
                      sx={{ 
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      image={course.courseImages?.[0] 
                        ? `${import.meta.env.VITE_API_BASE_URL}/${course.courseImages[0].replace(/\\/g, '/')}` 
                        : 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop'
                      } 
                      alt={course.courseName} 
                    />
                    
                    <GradientOverlay className="gradient-overlay" />
                    
                    <PlayButton className="play-button">
                      <PlayCircleOutlineIcon 
                        sx={{ 
                          fontSize: 40, 
                          color: 'primary.main'
                        }} 
                      />
                    </PlayButton>

                    {/* Trending Badge */}
                    <Chip 
                      className="course-badge"
                      icon={<StarIcon sx={{ fontSize: 16 }} />}
                      label="Popular"
                      size="small"
                      sx={{ 
                        position: 'absolute',
                        top: 16,
                        left: 16,
                        bgcolor: 'rgba(255, 193, 7, 0.95)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)',
                        transform: 'translateY(-10px)',
                        opacity: 0,
                        transition: 'all 0.4s ease 0.2s',
                        '& .MuiChip-icon': {
                          color: 'white'
                        }
                      }}
                    />

                    {/* Rating Badge */}
                    <Box 
                      sx={{ 
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        bgcolor: 'rgba(0, 0, 0, 0.7)',
                        backdropFilter: 'blur(10px)',
                        px: 1.5,
                        py: 0.75,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <StarIcon sx={{ fontSize: 16, color: '#ffc107' }} />
                      <Typography sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                        4.8
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Content Section */}
                  <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        color: 'text.primary',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {course.courseName}
                    </Typography>
                    
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 3,
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flexGrow: 1
                      }}
                    >
                      {course.courseDescription?.substring(0, 120)}...
                    </Typography>
                    
                    {/* Course Meta Info */}
                    <Stack 
                      direction="row" 
                      spacing={2} 
                      sx={{ 
                        pt: 2, 
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AccessTimeIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          12 weeks
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PeopleIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          2.5k enrolled
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </StyledCourseCard>
              </Fade>
            </Grid>
          ))}
        </Grid>
        
        {/* View More Button */}
        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Button 
            variant="contained"
            size="large"
            endIcon={<ArrowForwardIcon />}
            sx={{
              px: 5,
              py: 2,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 700,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #5568d3 0%, #66408b 100%)',
                transition: 'left 0.4s ease',
              },
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.5)',
                '&::before': {
                  left: 0
                }
              }
            }}
          >
            Explore All Courses
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedCourses;