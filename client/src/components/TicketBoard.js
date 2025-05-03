import React, { useState, useEffect } from "react";
import NewTicketForm from "./NewTicketForm";
import TicketCard from "./TicketCard";



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

    return (

            <div>
                <h1>Ticket board?!</h1>
                <NewTicketForm addTicket={handleNewTicket}/>
                {tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                ))}

            </div>

    )
}

export default TicketBoard;