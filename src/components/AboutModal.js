import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const style = (theme) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 340,
  maxWidth: 420,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  outline: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
});

const AboutModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="about-modal-title">
      <Box sx={style}>
        <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 2,
    position: 'relative',
    width: '100%',
  }}
>
  <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '12px',
    height: 38,
    width: 38,
    background: 'linear-gradient(135deg, #b993f4 0%, #5f72bd 100%)',
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.15)',
    mr: 1.5,
  }}
>
  <FontAwesomeIcon icon={faChartLine} style={{ fontSize: 22, color: '#fff' }} />
</Box>
  <Typography variant="h5" sx={{ fontWeight: 700, color: '#fff', letterSpacing: 1, lineHeight: 1 }}>
    TokenView
  </Typography>
  <IconButton
    aria-label="close"
    onClick={handleClose}
    sx={{
      position: 'absolute',
      right: 0,
      top: 0,
      color: '#fff',
    }}
  >
    <CloseIcon />
  </IconButton>
</Box>
        <Typography variant="subtitle1" sx={{ color: '#b2bac2', textAlign: 'center', mb: 2 }}>
        Your real-time window into the crypto market.
        </Typography>
        <Box
          sx={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 3,
            p: 3,
            mb: 2,
            width: '100%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
          }}
        >
          <Typography variant="body1" sx={{ color: '#e3e3e3', mb: 1, textAlign: 'center' }}>
  <b>👋 Welcome to TokenView<br/>Your real-time window into the crypto market.</b>
</Typography>
<Typography variant="body2" sx={{ color: '#b2bac2', textAlign: 'center' }}>
  Explore the crypto world with clarity.<br/>
  TokenView lets you view real-time prices, compare tokens, and access key stats from a clean and intuitive dashboard.
</Typography>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 2 }}>
  <button
    style={{
      background: 'linear-gradient(135deg, #b993f4 0%, #5f72bd 100%)',
      color: '#fff',
      border: 'none',
      borderRadius: 10,
      padding: '8px 22px',
      fontWeight: 600,
      fontSize: '0.98rem',
      boxShadow: '0 2px 8px rgba(95,114,189,0.13)',
      cursor: 'pointer',
      transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
      outline: 'none',
      letterSpacing: '0.03em',
      minWidth: 110,
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-2px) scale(1.035)';
      e.currentTarget.style.boxShadow = '0 6px 18px rgba(95,114,189,0.18)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'none';
      e.currentTarget.style.boxShadow = '0 2px 8px rgba(95,114,189,0.13)';
    }}
    onClick={handleClose}
  >
    Try Now
  </button>
</Box>

      </Box>
    </Modal>
  );
};

export default AboutModal;
