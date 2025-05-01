import React, { useState, useEffect } from "react";

function DeviceList() {

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/devices")
        .then((response) => response.json())
        .then((data) => setDevices(data));
    }, []);

    console.log(devices);

    return (
        <div>
            <h1>Devices by the million!</h1>
            {devices.map((device) => (
                <div key={device.id}>
                    <h3>Device name: {device.name}</h3>
                    <p>Device Id: {device.id}</p>
                    <p>Serial Number: {device.serial_number}</p>
                    <p>Status: {device.status}</p>
                    <p>Type: {device.type}</p>
                </div>
            ))}
        </div>
    )
}

export default DeviceList;