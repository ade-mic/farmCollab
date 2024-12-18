import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AgricultureIcon from "@mui/icons-material/Agriculture";

export default function Navbar() {
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
          <AgricultureIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Home
        </Typography>
        <Button color="inherit">Login</Button>
        <Button color="inherit">Create Accouunt</Button>
      </Toolbar>
    </AppBar>
  );
}
