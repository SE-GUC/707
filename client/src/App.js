import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.png";
import CreateAccount from "./components/create-account.component.js";
import SignIn from "./components/sign-in.component.js";
import Admin from "./components/admin.component.js";
import consultancy from "./components/consultancy.component.js";
import partner from "./components/partner.component.js";
import candidate from "./components/candidate.component.js";
import awaitingprojects from "./components/viewawaitingapproval.component.js";
import AdminProjects from "./components/admin-projects.component.js";
import CandidateReports from "./components/candidate-reports.component.js";
import CandidateResearches from "./components/candidate-researches.component.js";
import CandidateRequestCertificate from "./components/request-certificate.component.js";
import Search from "./components/search.component.js";
import getallcertificate from "./components/certificate.component.js";
import Createcertificate from "./components/createCertificate.component.js";
import updateCertificate  from "./components/updateCertificate.component.js";
import getallcertificateCandidate from "./components/candidateCertificatesAll.component.js";
import getallcertificateRecCandidate from "./components/candidateRECcertificates.component.js";
import getallcertificateConsultancy from "./components/consultancyCertificatesAll.component.js";
import getallcertificateRecConsultancy from "./components/conRECcertificates.component.js";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a
              className="navbar-brand"
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
                <li className="navbar-item">
                  <Link to="/admincertificates" className="nav-link">view all certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createcertificate" className="nav-link">Create Certificate</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/updatecertificate" className="nav-link">Update Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewCandidatecertificate" className="nav-link">view all candidate Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewCandidatereccertificate" className="nav-link">view all candidate recommended Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewConsultancycertificate" className="nav-link">view all consultancy Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewConsultancyreccertificate" className="nav-link">view all consultancy recommended Certificates</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Route path="/createaccount" component={CreateAccount} />
          <Route path="/login" component={SignIn} />
          <Route path="/AdminProfile" component={Admin} />
          <Route path="/consultancyProfile" component={consultancy} />
          <Route path="/partnerProfile" component={partner} />
          <Route path="/candidateProfile" component={candidate} />
          <Route path="/awaitingprojects" component={awaitingprojects} />
          <Route path="/adminprojects" component={AdminProjects} />
          <Route path="/candidatereports" component={CandidateReports} />
          <Route path="/candidateresearches" component={CandidateResearches} />
          <Route
            path="/candidaterequestcertificate"
            component={CandidateRequestCertificate}
          />
          <Route path="/search" component={Search} />
          <Route path="/admincertificates" component={getallcertificate}/>
          <Route path="/createcertificate" component={Createcertificate}/>
          <Route path="/updatecertificate" component={updateCertificate}/>
          <Route path="/viewCandidatecertificate" component={getallcertificateCandidate}/>
          <Route path="/viewCandidatereccertificate" component={getallcertificateRecCandidate}/>
          <Route path="/viewConsultancycertificate" component={getallcertificateConsultancy}/>
          <Route path="/viewConsultancyreccertificate" component={getallcertificateRecConsultancy}/>
        </div>
      </Router>
    );
  }
}
export default App;
