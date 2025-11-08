// components/Achievements.js - Enhanced with Modern Design & Animations
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Grid, Chip, alpha, useTheme } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// Floating animation
const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
`;

// Pulse animation
const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Achievement Card
const AchievementCard = styled(Box)(({ theme}) => ({
  position: 'relative',
  padding: '3rem 2.5rem',
  borderRadius: 24,
  background: 'white',
  border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '6px',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 20px 60px rgba(102, 126, 234, 0.25)',
    borderColor: alpha(theme.palette.primary.main, 0.3),
    '&::before': {
      transform: 'translateX(0)',
    },
    '& .icon-wrapper': {
      transform: 'scale(1.1) rotate(5deg)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.4)',
    },
    '& .achievement-number': {
      transform: 'scale(1.1)',
    }
  }
}));

// Counter Hook
const useCountUp = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

const Achievements = () => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const achievements = [
    { 
      id: 1, 
      number: 10000,
      suffix: '+',
      label: 'Students Graduated', 
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: '#667eea'
    },
    { 
      id: 2, 
      number: 500,
      suffix: '+',
      label: 'Industry Partners', 
      icon: <BusinessIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      color: '#f093fb'
    },
    { 
      id: 3, 
      number: 95,
      suffix: '%',
      label: 'Placement Rate', 
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      color: '#4facfe'
    },
    { 
      id: 4, 
      number: 100,
      suffix: '+',
      label: 'Award-Winning Faculty', 
      icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      color: '#fa709a'
    },
  ];

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box 
      ref={sectionRef}
      sx={{ 
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #f8f9ff 0%, #ffffff 50%, #f8f9ff 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative Background Elements */}
      <Box sx={{ 
        position: 'absolute', 
        top: '10%', 
        right: '-5%', 
        width: 300, 
        height: 300, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: `${float} 6s ease-in-out infinite`
      }} />
      <Box sx={{ 
        position: 'absolute', 
        bottom: '15%', 
        left: '-5%', 
        width: 400, 
        height: 400, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(118, 75, 162, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: `${float} 8s ease-in-out infinite`
      }} />

      {/* Floating Icons */}
      {[...Array(5)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
            opacity: 0.1,
            animation: `${float} ${5 + Math.random() * 5}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        >
          <StarIcon sx={{ fontSize: 30 + Math.random() * 20, color: 'primary.main' }} />
        </Box>
      ))}

      <Container maxWidth="xl">
        {/* Section Header */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
              px: 3,
              py: 1.5,
              borderRadius: 10,
              background: alpha(theme.palette.primary.main, 0.1),
              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}
          >
            <EmojiEventsIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography 
              sx={{ 
                fontWeight: 700,
                fontSize: '1rem',
                color: 'primary.main'
              }}
            >
              Our Success Story
            </Typography>
          </Box>

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
            Our Achievements
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
            Celebrating excellence, innovation, and transformative education that shapes tomorrow's leaders
          </Typography>
          
          <Box sx={{ 
            width: 100, 
            height: 4, 
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: 2,
            margin: '2rem auto 0'
          }} />
        </Box>

        {/* Achievement Cards Grid */}
        <Grid container spacing={4} justifyContent="center">
          {achievements.map((achievement, index) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const count = useCountUp(achievement.number, 2000, isVisible);
            
            return (
              <Grid item xs={12} sm={6} md={3} key={achievement.id}>
                <AchievementCard
                  sx={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease ${index * 0.15}s`
                  }}
                >
                  {/* Icon */}
                  <Box
                    className="icon-wrapper"
                    sx={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: alpha(achievement.color, 0.15),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      color: achievement.color,
                      transition: 'all 0.4s ease',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -10,
                        borderRadius: '50%',
                        background: achievement.gradient,
                        opacity: 0.2,
                        filter: 'blur(20px)',
                      }
                    }}
                  >
                    {achievement.icon}
                  </Box>

                  {/* Number Counter */}
                  <Typography
                    className="achievement-number"
                    sx={{
                      fontSize: { xs: '2.5rem', md: '3rem' },
                      fontWeight: 800,
                      background: achievement.gradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      transition: 'transform 0.3s ease'
                    }}
                  >
                    {count.toLocaleString()}{achievement.suffix}
                  </Typography>

                  {/* Label */}
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'text.primary',
                      lineHeight: 1.4
                    }}
                  >
                    {achievement.label}
                  </Typography>

                  {/* Decorative Dots */}
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 0.5,
                      justifyContent: 'center',
                      mt: 2
                    }}
                  >
                    {[0, 1, 2].map((dot) => (
                      <Box
                        key={dot}
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: achievement.gradient,
                          opacity: 0.5
                        }}
                      />
                    ))}
                  </Box>
                </AchievementCard>
              </Grid>
            );
          })}
        </Grid>

        {/* Bottom Decorative Element */}
        <Box
          sx={{
            mt: 8,
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              gap: 2,
              px: 4,
              py: 2,
              borderRadius: 10,
              background: 'white',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            {achievements.map((ach, i) => (
              <Box
                key={ach.id}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: ach.gradient,
                  animation: `${pulse} 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Achievements;