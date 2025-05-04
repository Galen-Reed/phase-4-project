import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemText, Typography, Paper, ListItemIcon } from "@mui/material";
import { LaptopMac, PhoneAndroid, TabletAndroid } from "@mui/icons-material";

function DeviceList() {

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/devices")
        .then((response) => response.json())
        .then((data) => setDevices(data));
    }, []);

    const getDeviceIcon = (type) => {
        switch (type) {
            case 'laptop':
                return <LaptopMac />
            case 'phone':
                return <PhoneAndroid />
            case 'tablet':
                return <TabletAndroid />
            default:
                return null;
        }
    };

    console.log(devices);

    return (
        <Paper sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>
            <Typography variant="h6" gutterBottom>
                Inventory Sheet
            </Typography>
            <List>
            {devices.map((device) => (
                <ListItem key={device.id} divider>
                    <ListItemIcon>
                        {getDeviceIcon(device.type)}
                    </ListItemIcon>
                    <ListItemText 
                        primary={device.name}
                        secondary={`Type: ${device.type} | Assigned to User ID: ${device.user.id} | SN#${device.serial_number}`}
                    />
                </ListItem>
            ))}
            </List>
        </Paper>
    )
}

export default DeviceList;
