import React from "react";
import { useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";

function TicketCard({ ticket, onDelete }) {

    const history = useHistory();

    const handleClick = () => {
        history.push(`/ticket/${ticket.id}`);
    };


  return (
    <Card className="ticket-card" sx={{
      backgroundColor: (theme) => {
        const status = ticket.status.toLowerCase();
        if (status === 'open') return theme.palette.warning.light;
        if (status === 'in progress') return theme.palette.info.light;
        if (status === 'resolved') return theme.palette.success.light;
        if (status === 'closed') return theme.palette.error.light;
        return theme.palette.background.paper;
      },
      mb: 2,
      p: 2,
    }} onClick={handleClick}>
      <CardContent>
        <Typography variant="h6">{ticket.title}</Typography>
        <Typography>{ticket.description}</Typography>
        <Typography>Ticket ID: {ticket.id}</Typography>
        <Typography>Status: {ticket.status}</Typography>
        <Typography>Assigned to: {ticket.technician.name}</Typography>
        <Typography>Device: {ticket.device.id}</Typography>
        <Typography>User: {ticket.user.name}</Typography>
        <Typography>Ticket created: {ticket.created_at}</Typography>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={(e) => {
          e.stopPropagation();
          onDelete(ticket.id);
        }}>
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}


 export default TicketCard;