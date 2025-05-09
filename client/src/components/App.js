import React from "react";
import { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import DeviceList from "./DeviceList";
import Navbar from "./Navbar";
import TicketBoard from "./TicketBoard.js";
import Home from "./Home.js"
import TicketDetail from "./TicketDetail.js";


function App() {

  const [tickets, setTickets] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
      fetch("http://127.0.0.1:5555/tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);

  const handleDelete = (id) => {
      fetch(`http://localhost:5555/tickets/${id}`, {
        method: 'DELETE',
      }).then((res) => {
        if (res.ok) {
          setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
        }
      });
    };

  function handleNewTicket(addTicket) {
      setTickets([...tickets, addTicket]);
      setShowForm(false);
  }

  function handleUpdateTicket(updatedTicket) {
    setTickets((prevTickets) =>
    prevTickets.map((ticket) => ticket.id === updatedTicket.id ? updatedTicket: ticket)
    );
  }

 

  useEffect(() => {
      fetch("http://127.0.0.1:5555/devices")
      .then((response) => response.json())
      .then((data) => setDevices(data));
  }, []);


  return (

      <main>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home tickets={tickets} devices={devices}/>
          </Route>
          <Route exact path="/tickets">
            <TicketBoard tickets={tickets} showForm={showForm} setShowForm={setShowForm} addTicket={handleNewTicket} handleDelete={handleDelete}/>
          </Route>
          <Route exact path="/ticket/:id">
            <TicketDetail onUpdateTicket={handleUpdateTicket}/>
          </Route>
          <Route exact path="/devices">
            <DeviceList devices={devices}/>
          </Route>
        </Switch>
      </main>

  );
}

export default App;
