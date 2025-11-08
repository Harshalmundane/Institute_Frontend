// components/CampusPhotos.js - Enhanced Modern Gallery
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Grid, 
  alpha, 
  useTheme,
  IconButton,
  Chip,
  Modal,
  Fade,
  Backdrop
} from '@mui/material';
import { styled,} from '@mui/material/styles';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// Shimmer animation


// Styled Photo Card
const PhotoCard = styled(Box)(() => ({
  position: 'relative',
  height: 320,
  borderRadius: 20,
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.12)',
  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
    zIndex: 1
  },
  '&:hover': {
    transform: 'translateY(-12px)',
    boxShadow: '0 25px 60px rgba(102, 126, 234, 0.3)',
    '&::before': {
      opacity: 1
    },
    '& .photo-image': {
      transform: 'scale(1.15)',
    },
    '& .photo-overlay': {
      opacity: 1,
      transform: 'translateY(0)'
    },
    '& .zoom-icon': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)'
    }
  }
}));

const PhotoImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
});

const PhotoOverlay = styled(Box)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: '1.5rem',
  zIndex: 2,
  opacity: 0,
  transform: 'translateY(20px)',
  transition: 'all 0.4s ease',
});

const ZoomIconButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) scale(0.8)',
  opacity: 0,
  transition: 'all 0.4s ease',
  zIndex: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  width: 70,
  height: 70,
  '&:hover': {
    backgroundColor: 'white',
    transform: 'translate(-50%, -50%) scale(1.1)',
  }
});

const CampusPhotos = () => {
  const theme = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
      title: 'Modern Campus Architecture',
      location: 'Main Building',
      category: 'Architecture'
    },
    {
      url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
      title: 'State-of-the-Art Library',
      location: 'Knowledge Center',
      category: 'Facilities'
    },
    {
      url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      title: 'Collaborative Learning Spaces',
      location: 'Study Hub',
      category: 'Learning'
    },
    {
      url: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop',
      title: 'Innovation Lab',
      location: 'Tech Center',
      category: 'Technology'
    },
    {
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
      title: 'Vibrant Student Life',
      location: 'Campus Grounds',
      category: 'Community'
    },
    {
      url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop',
      title: 'Inspiring Lecture Halls',
      location: 'Academic Block',
      category: 'Education'
    },
    {
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      title: 'Student Collaboration',
      location: 'Group Study Area',
      category: 'Learning'
    },
    {
      url: 'https://images.unsplash.com/photo-1567168544646-208fa5d408b9?w=800&h=600&fit=crop',
      title: 'Green Campus',
      location: 'Central Garden',
      category: 'Environment'
    }
  ];

  const handleOpenModal = (photo) => {
    setSelectedImage(photo);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

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
        right: -100, 
        width: 500, 
        height: 500, 
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

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
            <CameraAltIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography 
              sx={{ 
                fontWeight: 700,
                fontSize: '1rem',
                color: 'primary.main'
              }}
            >
              Visual Tour
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
            Campus Life
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
            Experience the vibrant atmosphere and world-class facilities that make our campus extraordinary
          </Typography>
          
          <Box sx={{ 
            width: 100, 
            height: 4, 
            background: 'linear-gradient(90deg, #667eea, #764ba2)',
            borderRadius: 2,
            margin: '2rem auto 0'
          }} />
        </Box>

        {/* Photo Gallery Grid */}
        <Grid container spacing={3}>
          {photos.map((photo, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Fade in timeout={600 + index * 100}>
                <PhotoCard onClick={() => handleOpenModal(photo)}>
                  {/* Image */}
                  <PhotoImage 
                    className="photo-image"
                    src={photo.url}
                    alt={photo.title}
                    loading="lazy"
                  />

                  {/* Category Badge */}
                  <Chip
                    label={photo.category}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 2,
                      bgcolor: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
                    }}
                  />

                  {/* Zoom Icon */}
                  <ZoomIconButton className="zoom-icon">
                    <ZoomInIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                  </ZoomIconButton>

                  {/* Photo Overlay */}
                  <PhotoOverlay className="photo-overlay">
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'white', 
                        fontWeight: 700,
                        mb: 0.5,
                        textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {photo.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: 'white' }} />
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'white',
                          opacity: 0.9,
                          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                        }}
                      >
                        {photo.location}
                      </Typography>
                    </Box>
                  </PhotoOverlay>
                </PhotoCard>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Gallery Stats */}
        <Box 
          sx={{ 
            mt: 8, 
            display: 'flex', 
            justifyContent: 'center',
            gap: 4,
            flexWrap: 'wrap'
          }}
        >
          {[
            { icon: <CameraAltIcon />, value: '500+', label: 'Photos' },
            { icon: <LocationOnIcon />, value: '10+', label: 'Locations' },
            { icon: <FavoriteIcon />, value: '5K+', label: 'Likes' }
          ].map((stat, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                px: 4,
                py: 2,
                borderRadius: 10,
                background: 'white',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.2)'
                }
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {stat.label}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Fullscreen Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: 'rgba(0, 0, 0, 0.95)' }
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: { xs: '95%', md: '90%', lg: '80%' },
              maxWidth: 1200,
              bgcolor: 'transparent',
              outline: 'none',
              p: { xs: 2, md: 4 }
            }}
          >
            {selectedImage && (
              <Box>
                {/* Close Button */}
                <IconButton
                  onClick={handleCloseModal}
                  sx={{
                    position: 'absolute',
                    top: { xs: -10, md: 0 },
                    right: { xs: -10, md: 0 },
                    bgcolor: 'white',
                    zIndex: 10,
                    '&:hover': {
                      bgcolor: 'white',
                      transform: 'scale(1.1)'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>

                {/* Image */}
                <Box
                  component="img"
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: 3,
                    boxShadow: '0 25px 100px rgba(0, 0, 0, 0.5)'
                  }}
                />

                {/* Image Info */}
                <Box
                  sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2
                  }}
                >
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {selectedImage.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {selectedImage.location}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                      }}
                    >
                      <FavoriteIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                    <IconButton 
                      sx={{ 
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                      }}
                    >
                      <ShareIcon sx={{ color: 'primary.main' }} />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default CampusPhotos;