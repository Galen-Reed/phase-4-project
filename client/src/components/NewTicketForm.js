import { useEffect, useState } from "react";

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
            <h1>New ticket form!</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Enter ticket's title" value={formData.title} onChange={handleChange}/>
                <input type="text" name="description" placeholder="Enter ticket's description" value={formData.description} onChange={handleChange}/>
                <input type="text" name="status" placeholder="Enter ticket's status" value={formData.status} onChange={handleChange}/>
                <input type="text" name="user_id" placeholder="Enter affected user id" value={formData.user_id} onChange={handleChange}/>
                <input type="text" name="technician_id" placeholder="Enter assigned technician's id" value={formData.technician_id} onChange={handleChange}/>
                <input type="text" name="device_id" placeholder="Enter affected device id" value={formData.device_id} onChange={handleChange}/>
                <button type="submit">Create new ticket</button>
            </form>
        </div>
    )
}

export default NewTicketForm;