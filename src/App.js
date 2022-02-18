import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


// page
import LoginPage from './app/page/login'
import HomePage from './app/page/home'

function App() {
  return (
    <div style={{ margin: "0", padding: "0" }}>
    <Router>
      <Switch>
        {/* Route User */}
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
  
      </Switch>
    </Router>
  </div>
  );
}

export default App;
