import { useState, useEffect, useContext } from 'react';  
import { useNavigate } from 'react-router-dom';  
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';  
import AuthContext from 'src/context/authContext';

const MENU_OPTIONS = [
  {
    label: 'Profile',
    icon: 'eva:person-fill',
    path: '/blog',
  },
];

export default function AccountPopover() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logout } = useContext(AuthContext);  
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    if (path === '/login') {
      localStorage.removeItem('user'); 
    }
    navigate(path); 
    handleClose(); 
  };


  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then((response) => {
        const userData = response.data[0];  
        setUser(userData);  
      })
      .catch((error) => {
        console.error('Error al obtener los datos del perfil:', error);
      });
  }, []);  

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(anchorEl && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          sx={{
            bgcolor: 'primary.main',
            width: 40,
            height: 40,
          }}
        >
          {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'U'}  
        </Avatar>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />
        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            onClick={() => handleNavigate(option.path)}  
          >
            {option.label}
          </MenuItem>
        ))}
        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />
        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={logout}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
