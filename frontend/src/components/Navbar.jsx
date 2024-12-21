import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleCreateAccount = () => {
    navigate("/createAccount");
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "#28a745", color: "#fff" }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
          <AgricultureIcon />
          </a>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
          </a>
        </Typography>
        <Button color="inherit" onClick={handleLogin} >Login</Button>
        <Button color="inherit" onClick={handleCreateAccount} >Create Accouunt</Button>
      </Toolbar>
    </AppBar>
  );
}
