import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NewAccount from "./components/auth/NewAccount";
import Proyects from "./components/proyects/Proyects";
import StateProyect from "./context/proyects/StateProyect";
import StateTask from "./context/tasks/StateTask";
import StateAlert from "./context/alerts/StateAlert";
import StateAuth from "./context/auth/StateAuth";
import tokenAuth from "./config/authToken";
import PrivateRute from "./components/rutes/PrivateRute";

// check if token exists
const token = localStorage.getItem("token");
if (token) {
  tokenAuth(token);
}

function App() {
  return (
    <StateProyect>
      <StateTask>
        <StateAlert>
          <StateAuth>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <PrivateRute exact path="/proyects" component={Proyects} />
              </Switch>
            </Router>
          </StateAuth>
        </StateAlert>
      </StateTask>
    </StateProyect>
  );
}

export default App;
