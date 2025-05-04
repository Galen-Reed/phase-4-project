import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function TicketDetail() {
  const { id } = useParams();
  const history = useHistory(); 

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "",
    user_id: "",
    technician_id: "",
    device_id: "",
  })

  useEffect(() => {
    fetch(`/tickets/${id}`)
      .then((response) => response.json())
      .then((data) => 
        setFormData({
            title: data.title || "",
            description: data.description || "",
            status: data.status || "",
            user_id: data.user_id || "",
            technician_id: data.technician_id || "",
            device_id: data.device_id || "",
        })
      );
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" 
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => history.push("/tickets"));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Edit Ticket</h1>
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
        Update Ticket
      </Button>
    </form>
  );
}

export default TicketDetail;
