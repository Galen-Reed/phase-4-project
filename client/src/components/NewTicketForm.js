import { TextField } from "@mui/material";
import Button from "@mui/material/Button"
import { useState } from "react";

function NewTicketForm( { addTicket }) {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: "",
        user_id: "",
        technician_id: "",
        device_id: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        fetch("http://127.0.0.1:5555/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then((response) => response.json())
            .then((newTicket) => {
                addTicket(newTicket)
            });
        setFormData({ title: "", description: "", status: "", user_id: "", technician_id: "", device_id: ""});
    }

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div className="ticket-form">
            <h1>Create a new ticket!</h1>
            <form onSubmit={handleSubmit}>
            <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="User ID"
                name="user_id"
                value={formData.user_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Technician ID"
                name="technician_id"
                value={formData.technician_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Device ID"
                name="device_id"
                value={formData.device_id}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Create Ticket
            </Button>
            </form>
        </div>
    )
}

export default NewTicketForm;