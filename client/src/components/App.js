import React from "react";
import { Switch, Route } from "react-router-dom";
import DeviceList from "./DeviceList";
import Navbar from "./Navbar";
import TicketBoard from "./TicketBoard.js";
import Home from "./Home.js"
import TicketDetail from "./TicketDetail.js";


function App() {
  return (

      <main>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/tickets">
            <TicketBoard />
          </Route>
          <Route exact path="/ticket/:id">
            <TicketDetail />
          </Route>
          <Route exact path="/devices">
            <DeviceList />
          </Route>
        </Switch>
      </main>

  );
}

export default App;
