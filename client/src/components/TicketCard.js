import React from "react";
import { useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function TicketCard({ ticket }) {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/ticket/${ticket.id}`);
    };


  return (
    <Card sx={{ margin: 2 }} onClick={handleClick}>
      <CardContent>
        <Typography variant="h6">{ticket.title}</Typography>
        <Typography>Ticket ID: {ticket.id}</Typography>
        <Typography>Status: {ticket.status}</Typography>
        <Typography>Assigned to: {ticket.technician.id}</Typography>
        <Typography>Device {ticket.device.id}</Typography>
        <Typography>User {ticket.user.name}</Typography>
        <Typography>Status: {ticket.status}</Typography>
        <Typography>Ticket created {ticket.created_at}</Typography>
      </CardContent>
    </Card>
  );
}


 export default TicketCard;