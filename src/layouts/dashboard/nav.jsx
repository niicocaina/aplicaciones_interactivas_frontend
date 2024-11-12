import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';  
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useResponsive } from 'src/hooks/use-responsive';
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { NAV } from './config-layout';
import navConfig from './config-navigation';
import axios from 'axios';
import SvgColor from 'src/components/svg-color';
import AuthContext from 'src/context/authContext';
// ----------------------------------------------------------------------
const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);
export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);  
  const [categories, setCategories] = useState(null);
  const [loading, setLoading] = useState(true);
  const upLg = useResponsive('up', 'lg');
  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);
  useEffect(() => {
    axios.get("http://localhost:3000/user")
      .then(response => {
        const userData = response.data[0];  
        setUser(userData);  
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then(response => 
        response.data.map(cat => ({
          title: cat.name,
          path: `/catalogue/${cat.id}`
        }))
      ).then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }, []);
  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      {}
      <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
        {user ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}` : 'U'}  {}
      </Avatar>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
        </Typography>
      </Box>
    </Box>
  );
  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );
  const renderCategories = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
    <NavItem key={"Catalogo"} item={{"path":"/catalogue/","title":"Zapatillas"}} />
      {loading === false ? categories.map((item) => (
        <NavItem key={item.name} item={item} />
      )) : "Loading..."}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
      {user?.role === "ADMIN" ? renderMenu : renderCategories}
      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
// ----------------------------------------------------------------------
function NavItem({ item }) {
  const pathname = usePathname();
  const active = item.path === pathname;
  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon ? item.icon : ""}
      </Box>
      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}
NavItem.propTypes = {
  item: PropTypes.object,
};
