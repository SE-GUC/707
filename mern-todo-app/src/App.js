import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateAccount from "./components/create-account.component.js";
import SignIn from "./components/sign-in.component.js";
import AdminProjects  from "./components/ViewProjects.component.js";
import ConsultancyProjects  from "./components/ConsultancyProject.component.js";
import PartnerProjects  from "./components/Partner.component.js";
import CandidateAssignedProjects from "./components/view-candidate-assigned-projects.component.js";
import ConsultancyAssignedProjects from "./components/view-consultancy-assigned-projects.component.js";
import getCandidate from "./components/showCandidateProfile.components.js";
import availableprojects from "./components/view-projects.component.js";
import getallCertificatesCandidate from "./components/View_certificates_candidate.component.js";
import ApprovedProjects from "./components/view-approved-projects.component.js";
import availableprojects from "./components/view-projects.component.js";
import getadminprof from "./components/getadmin.component.js";
import getconsprof from "./components/getcons.component.js";
import getallcertificates from "./components/getallcertificate.component.js";
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
               <li className="navbar-item">
                  <Link to="/getCandidate" className="nav-link">Candidate Profile</Link>
                    </li>
                <li className="navbar-item">
                  <Link to="/candidateassignedprojects" className="nav-link">View Candidate's Assigned Projects</Link>
                  <Link to="/consultancyassignedprojects" className="nav-link">View Consultancy's Assigned Projects</Link>

                  <Link to="/showallcertificatesCandidate" className="nav-link">show all Candidate certificates</Link>
                  <Link to="/candidateproject" className="nav-link">View Candidate Project</Link>
                 </li>
                      <li className="navbar-item">
                  <Link to="/showconsultancyprofile" className="nav-link">show consultancy profile</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/showallcertificates" className="nav-link">show all certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/showadminprofile" className="nav-link">show admin profile</Link>
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
          <Route path="/candidateassignedprojects" component={CandidateAssignedProjects}/>
          <Route path="/consultancyassignedprojects" component={ConsultancyAssignedProjects}/>
          <Route path="/getCandidate" component={getCandidate}/>
          <Route path="/showallcertificatesCandidate" component={getallCertificatesCandidate}/>
          <Route path="/candidateproject" component={availableprojects} />
          <Route path="/showadminprofile" component={getadminprof}/>
          <Route path="/showconsultancyprofile" component={getconsprof}/>
          <Route path="/showallcertificates" component={getallcertificates}/>
        </div>
      </Router>
    );
  }
}

export default App;