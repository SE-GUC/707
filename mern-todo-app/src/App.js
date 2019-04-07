import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateAccount from "./components/create-account.component.js";
import SignIn from "./components/sign-in.component.js";
import AdminProjects  from "./components/ViewProjects.component.js";
import ConsultancyProjects  from "./components/ConsultancyProject.component.js";
import PartnerProjects  from "./components/Partner.component.js";


import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="http://localhost:3000/" target="_blank">
              <img src={logo} width="287px" height="100px" alt="LirtenHub-Logo" />
            </a>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">  
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createaccount" className="nav-link">Register to LirtenHub</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/adminProject" className="nav-link">view all admin projects</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/consultancyProject" className="nav-link">view all consultancy projects</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/partnerProject" className="nav-link">view all partner projects</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>

          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/login" component={SignIn}/>
          <Route path="/adminProject" component={AdminProjects}/>   
          <Route path="/consultancyProject" component={ConsultancyProjects}/>   
          <Route path="/partnerProject" component={PartnerProjects}/>   
        </div>
      </Router>
    );
  }
}

export default App;