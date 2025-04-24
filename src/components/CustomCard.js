import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme, alpha } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CustomCard = ({ text, value, color, icon }) => {
  const theme = useTheme();
  
  // Generar un color secundario complementario para los efectos de gradiente
  const secondaryColor = theme.palette.mode === 'dark' 
    ? theme.palette.primary.main 
    : theme.palette.secondary.main;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '16px',
        backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.default, 0.98)} 100%)`,
        boxShadow: `0 8px 24px 0 ${alpha(theme.palette.mode === 'dark' ? '#000' : '#000', 0.1)}`,
        border: `1px solid ${alpha(color, 0.1)}`,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 28px 0 ${alpha(theme.palette.mode === 'dark' ? '#000' : '#000', 0.15)}`,
          border: `1px solid ${alpha(color, 0.2)}`,
        },
        // Efecto decorativo tipo crypto
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -10,
          left: -10,
          right: -10,
          bottom: -10,
          background: `radial-gradient(circle at top right, ${alpha(color, 0.2)}, transparent 65%)`,
          zIndex: 0,
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '90px',
          height: '90px',
          background: `linear-gradient(135deg, transparent 45%, ${alpha(color, 0.08)} 50%, ${alpha(color, 0.12)} 60%, transparent 70%)`,
          borderRadius: '0 0 0 90px',
        }}
      />
      <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Grid item xs={7}>
            <Typography
              variant='h6'
              sx={{
                color: alpha(theme.palette.text.secondary, 0.85),
                fontWeight: 600,
                fontSize: '0.9rem',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              {text}
            </Typography>
            <Typography
              variant='h3'
              sx={{
                color: theme.palette.text.primary,
                fontWeight: 700,
                fontSize: '2.2rem',
                lineHeight: 1.2,
                letterSpacing: '-0.5px',
                // Efecto de gradiente en el valor
                background: `linear-gradient(90deg, ${color} 0%, ${secondaryColor} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {value}
            </Typography>
          </Grid>
          <Grid item xs={5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${color} 0%, ${alpha(secondaryColor, 0.8)} 100%)`,
                boxShadow: `0 4px 15px ${alpha(color, 0.35)}`,
                // Efecto de brillo
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '30%',
                  background: 'linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0))',
                  borderRadius: '12px 12px 0 0',
                }
              }}
            >
              <FontAwesomeIcon
                icon={icon}
                size='lg'
                style={{
                  color: theme.palette.common.white,
                  filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
