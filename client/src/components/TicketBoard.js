import React, { useState, useEffect } from "react";
import NewTicketForm from "./NewTicketForm";

function TicketBoard() {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/tickets")
        .then((response) => response.json())
        .then((data) => setTickets(data));
    }, []);

    function handleNewTicket(addTicket) {
        setTickets([...tickets, addTicket])
    }

    console.log(tickets)

    return (
        <div>
            <h1>Ticket board?!</h1>
            {tickets.map((ticket) => (
                <div key={ticket.id}>
                    <h3>{ticket.title}</h3>
                    <p>Ticket number {ticket.id}</p>
                    <p>Assigned to {ticket.technician.id}</p>
                    <p>Device {ticket.device.id}</p>
                    <p>User {ticket.user.name}</p>
                    <p>Status: {ticket.status}</p>
                    <p>Ticket created {ticket.created_at}</p>
                </div>
            ))}
            <NewTicketForm addTicket={handleNewTicket}/>
        </div>
    )
}

export default TicketBoard;