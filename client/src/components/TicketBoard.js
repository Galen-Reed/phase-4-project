import React from "react";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import NewTicketForm from "./NewTicketForm";
import TicketCard from "./TicketCard";



function TicketBoard({ tickets, showForm, setShowForm, addTicket, handleDelete }) {


    return (

            <div>
                <Button variant="contained" sx={{ mt: 2, mb: 2 }} onClick={() => setShowForm((prev) => !prev)}>
                    {showForm ? "Cancel" : "Create Ticket"}
                </Button>
                <Collapse in={showForm}>
                    <NewTicketForm addTicket={addTicket} />
                </Collapse>
                {tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} onDelete={handleDelete}/>
                ))}

            </div>

    )
}

export default TicketBoard;