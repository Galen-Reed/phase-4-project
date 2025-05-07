import React from 'react';
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="https://static-00.iconduck.com/assets.00/ticket-icon-2048x1280-axjsethv.png" 
            alt="Tickets!" 
            style={{ width: 40, height: 40, marginRight: 10 }} 
          />
          <Typography variant="h6" component="div">
            Ticketing System
          </Typography>
        </Box>

        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/tickets">Tickets</Button>
          <Button color="inherit" component={Link} to="/devices">Devices</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;

