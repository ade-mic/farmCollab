import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleDashboard = () => navigate('/user-home');
  const handleAvailableProduce = () => navigate('/available-produce');
  const handleAvailableProjects = () => navigate('/available-projects');
  const handleCart = () => navigate('/shopping-cart');

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      PaperProps={{
        style: { width: '200px' },
      }}
    >
      <div>
      <MenuItem onClick={handleAvailableProjects}>Projects</MenuItem>
      <MenuItem onClick={handleAvailableProduce}>Produce</MenuItem>
      <MenuItem onClick={handleCart}>Shopping Cart</MenuItem>
      {isLoggedIn ? (
        <>
          <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={handleLogin}>Login</MenuItem>
          <MenuItem onClick={() => navigate('/createAccount')}>Create Account</MenuItem>
        </>
      )}
      </div>
    </Menu>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#28a745', color: '#fff', width: '100%' }}>
      <Toolbar>
        {/* Logo */}
        <IconButton size="large" edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
            <img src="/images/logo.svg" alt="logo" style={{ height: '50px', width: '100px' }} />
          </a>
        </IconButton>

        {/* Title */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
            FarmCollab
          </a>
        </Typography>

        {isMobile ? (
          <>
            {/* Mobile Menu */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            {renderMenu}
          </>
        ) : (
          <>
            {/* Desktop Links */}
            <Button
              color="inherit"
              sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
              onClick={handleAvailableProjects}
            >
              Projects
            </Button>
            <Button
              color="inherit"
              sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
              onClick={handleAvailableProduce}
            >
              Produce
            </Button>
            <IconButton color="inherit" onClick={handleCart} sx={{ ml: 2 }}>
              <Badge badgeContent={cartItems?.length || 0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {isLoggedIn ? (
              <>
                <Button
                  color="inherit"
                  onClick={handleDashboard}
                  sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
                >
                  Dashboard
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={handleLogin}
                  sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate('/createAccount')}
                  sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
                >
                  Create Account
                </Button>
              </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
