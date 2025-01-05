import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext); // Assuming cartItems is an array of items in the cart

  const handleLogin = () => navigate('/login');
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  const handleCreateAccount = () => navigate('/createAccount');
  const handleUserHome = () => navigate('/user-home');
  const handleAvailableProduce = () => navigate('/available-produce');
  const handleAvailableProjects = () => navigate('/available-projects');
  const handleCart = () => navigate('/shopping-cart');

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

        {/* Navigation Links */}
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

        {/* Shopping Cart */}
        <IconButton color="inherit" onClick={handleCart} sx={{ ml: 2 }}>
          <Badge badgeContent={cartItems?.length || 0} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Authentication Links */}
        {isLoggedIn ? (
          <>
            <Button
              color="inherit"
              onClick={handleUserHome}
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
              onClick={handleCreateAccount}
              sx={{ textTransform: 'none', '&:hover': { backgroundColor: '#4B5945' } }}
            >
              Create Account
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
