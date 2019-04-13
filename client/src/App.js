import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import CreateAccount from "./components/create-account.component.js";
import SignIn from "./components/sign-in.component.js";
import getAdmin from "./components/admin.component.js";
import consultancy from "./components/consultancy.component.js";
import partner from "./components/partner.component.js";
import candidate from "./components/candidate.component.js";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a
              class="navbar-brand"
              href="http://localhost:3000/"
              target="_blank"
            >
              <img
                src={logo}
                width="287px"
                height="100px"
                alt="LirtenHub-Logo"
              />
            </a>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createaccount" className="nav-link">
                    Register to LirtenHub
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/AdminProfile" className="nav-link">
                    Show Admin Profile
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/consultancyProfile" className="nav-link">
                    Show consultancy Profile
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/partnerProfile" className="nav-link">
                    Show Partner Profile
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/candidateProfile" className="nav-link">
                    Show candidate Profile
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/login" component={SignIn} />
          <Route path="/AdminProfile" component={getAdmin} />
          <Route path="/consultancyProfile" component={consultancy} />
          <Route path="/partnerProfile" component={partner} />
          <Route path="/candidateProfile" component={candidate} />
        </div>
      </Router>
    );
  }
}
export default App;
