import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateAccount = () => {
    navigate('/createAccount');
  };

  const handleUserHome = () => {
    navigate('/user-home');
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#28a745', color: '#fff', width: '100%' }}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
           <img src='/images/logo.svg' alt='logo' style={{ height: '50px', width: '100px' }} />
          </a>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Home
          </a>
        </Typography>
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
