import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Paper } from "@mui/material";

function DeviceList() {

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/devices")
        .then((response) => response.json())
        .then((data) => setDevices(data));
    }, []);

    console.log(devices);

    return (
        <Paper sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h6" gutterBottom>
                Inventory Sheet
            </Typography>
            <List>
            {devices.map((device) => (
                <ListItem key={device.id} divider>
                    <ListItemText 
                        primary={device.name}
                        secondary={`Type: ${device.type} | Assigned to User ID: ${device.user_id}`}
                    />
                </ListItem>
            ))}
            </List>
        </Paper>
    )
}

export default DeviceList;

{/* <h3>Device name: {device.name}</h3>
                    <p>Device Id: {device.id}</p>
                    <p>Serial Number: {device.serial_number}</p>
                    <p>Status: {device.status}</p>
                    <p>Type: {device.type}</p> */}