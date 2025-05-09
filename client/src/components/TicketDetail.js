import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function TicketDetail({ onUpdateTicket }) {

  const { id } = useParams();
  const history = useHistory(); 
  const [note, setNote] = useState("");
  const [allNotes, setAllNotes] = useState([]);
  const currentUserId = 2;

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
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          title: data.title || "",
          description: data.description || "",
          status: data.status || "",
          user_id: data.user_id || "",
          technician_id: data.technician_id || "",
          device_id: data.device_id || "",
        });
      });
  
      fetch(`/tickets/${id}/notes`)
      .then((res) => res.json())
      .then((notes) => {
        setAllNotes(notes || []);
        const userNote = notes.find((nt) => parseInt(nt.user_id) === currentUserId);
        if (userNote) {
          setNote(userNote.notes || "");
        }
      });
  }, [id]);
  
  function handleNoteChange(e) {
    setNote(e.target.value);
  }

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((updatedTicket) => {
        onUpdateTicket(updatedTicket);
  
        const userNote = allNotes.find((nt) => parseInt(nt.user_id) === currentUserId);
        const method = userNote ? "PATCH" : "POST";
        const url = userNote
          ? `/tickets/${id}/notes/${currentUserId}`
          : `/tickets/${id}/notes`;
  
        fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: currentUserId, notes: note }),
        })
          .then((res) => res.json())
          .then(() => {
            history.push("/tickets");
          });
      });
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
      <TextField
        label="Notes"
        multiline
        minRows={3}
        fullWidth
        margin="normal"
        value={note}
        onChange={handleNoteChange}
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Update Ticket
      </Button>
      <h2>All Notes</h2>
{allNotes.length === 0 ? (
  <p>No notes yet.</p>
) : (
  allNotes.map((nt) => (
    <div key={`${nt.user_id}-${nt.ticket_id}`} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
      <p><strong>User ID:</strong> {nt.user_id}</p>
      <p><strong>Note:</strong> {nt.notes}</p>
      <p><strong>Timestamp:</strong> {new Date(nt.timestamp).toLocaleString()}</p>
    </div>
  ))
)}

    </form>

  );
}

export default TicketDetail;
