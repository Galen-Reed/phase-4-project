import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import NewTicketForm from "./NewTicketForm";
import TicketCard from "./TicketCard";



function TicketBoard() {

    const [tickets, setTickets] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/tickets")
        .then((response) => response.json())
        .then((data) => setTickets(data));
    }, []);

    function handleNewTicket(addTicket) {
        setTickets([...tickets, addTicket]);
        setShowForm(false);
    }

    return (

            <div>
                <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Cancel" : "Create Ticket"}
                </Button>
                <Collapse in={showForm}>
                    <NewTicketForm addTicket={handleNewTicket} />
                </Collapse>
                {tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}

            </div>

    )
}

export default TicketBoard;