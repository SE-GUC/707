import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "universal-cookie";
import logo from "./logo.png";
import Register from "./components/register.component.js";
import Login from "./components/login.component.js";
import Logout from "./components/logout.component.js";
import Admin from "./components/admin.component.js";
import Consultancy from "./components/consultancy.component.js";
import Partner from "./components/partner.component.js";
import Candidate from "./components/candidate.component.js";
import Awaitingprojects from "./components/viewawaitingapproval.component.js";
import AdminProjects from "./components/admin-projects.component.js";
import CandidateReports from "./components/candidate-reports.component.js";
import CandidateResearches from "./components/candidate-researches.component.js";
import CandidateRequestCertificate from "./components/request-certificate.component.js";
import Search from "./components/search.component.js";
class App extends Component {
  render() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    const guestLinks = (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http://localhost:3000/">
            <img src={logo} width="300px" height="100px" alt="LirtenHub-Logo" />
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
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/createaccount" component={Register} />
        <Route path="/login" component={Login} />
      </div>
    );
    const candidateLinks = (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http://localhost:3000/">
            <img src={logo} width="300px" height="100px" alt="LirtenHub-Logo" />
          </a>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/candidatereports" className="nav-link">
                  Candidate Reports
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/candidateresearches" className="nav-link">
                  Candidate Researches
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/candidaterequestcertificate" className="nav-link">
                  Candidate Request Certificate
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/search" className="nav-link">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/candidateProfile" component={Candidate} />
        <Route path="/candidatereports" component={CandidateReports} />
        <Route path="/candidateresearches" component={CandidateResearches} />
        <Route
          path="/candidaterequestcertificate"
          component={CandidateRequestCertificate}
        />
        <Route path="/search" component={Search} />
      </div>
    );
    const consultancyLinks = (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http://localhost:3000/">
            <img src={logo} width="300px" height="100px" alt="LirtenHub-Logo" />
          </a>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/consultancyProfile" className="nav-link">
                  Show consultancy Profile
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/search" className="nav-link">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/consultancyProfile" component={Consultancy} />
        <Route path="/search" component={Search} />
      </div>
    );
    const partnerLinks = (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http://localhost:3000/">
            <img src={logo} width="300px" height="100px" alt="LirtenHub-Logo" />
          </a>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/partnerProfile" className="nav-link">
                  Show Partner Profile
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/search" className="nav-link">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/partnerProfile" component={Partner} />
        <Route path="/search" component={Search} />
      </div>
    );
    const adminLinks = (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="http://localhost:3000/">
            <img src={logo} width="300px" height="100px" alt="LirtenHub-Logo" />
          </a>
          <div className="collpase navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/logout" className="nav-link">
                  Logout
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/AdminProfile" className="nav-link">
                  Show Admin Profile
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/awaitingprojects" className="nav-link">
                  Awaiting Projects
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/adminprojects" className="nav-link">
                  Admin Projects
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/search" className="nav-link">
                  Search
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/AdminProfile" component={Admin} />
        <Route path="/awaitingprojects" component={Awaitingprojects} />
        <Route path="/adminprojects" component={AdminProjects} />
        <Route path="/search" component={Search} />
      </div>
    );
    return (
      <Router>
        {usertype === "candidate"
          ? candidateLinks
          : usertype === "consultancy"
          ? consultancyLinks
          : usertype === "partner"
          ? partnerLinks
          : usertype === "undefined"
          ? adminLinks
          : guestLinks}
      </Router>
    );
  }
}
export default App;
