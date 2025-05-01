import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import DeviceList from "./DeviceList";
import Navbar from "./Navbar";
import TicketBoard from "./TicketBoard.js";
import NewTicketForm from "./NewTicketForm.js";


function App() {
  return (
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/">
        <TicketBoard />
        </Route>
        <Route exact path="/tickets/new">
        <NewTicketForm />
        </Route>
        <Route exact path="/devices">
          <DeviceList />
        </Route>
      </Switch>
    </main>
  )
}

export default App;
