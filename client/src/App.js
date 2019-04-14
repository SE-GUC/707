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
import getallcertificate from "./components/certificate.component.js";
import Createcertificate from "./components/createCertificate.component.js";
import updateCertificate  from "./components/updateCertificate.component.js";
import getallcertificateCandidate from "./components/candidateCertificatesAll.component.js";
import getallcertificateRecCandidate from "./components/candidateRECcertificates.component.js";
import getallcertificateConsultancy from "./components/consultancyCertificatesAll.component.js";
import getallcertificateRecConsultancy from "./components/conRECcertificates.component.js";
import createAnnouncement from "./components/createAnnouncement.component.js";
import viewAllAnnouncements_Candidate from "./components/viewAllAnnouncements_Candidate.component.js";
import viewAllAnnouncements_Admin from "./components/viewAllAnnouncements_Admin.component.js";
import deleteAnnouncements from "./components/deleteAnnouncements.component.js";
import deleteResearches from "./components/deleteResearches.component.js";
import viewAllAnnouncements_Consultant from "./components/viewAllAnnouncements_Consultant.component.js";
import getAnnouncementbyID_Admin from "./components/getAnnouncementbyID_Admin.component.js";
import updateAnnouncement from "./components/updateAnnouncement.component.js";
import getAnnouncementbyID_Partner from "./components/getAnnouncementbyID_Partner.component.js";
import getAnnouncementbyID_Candidate from "./components/getAnnouncementbyID_Candidate.component.js";
import getAnnouncementbyID_Consultant from "./components/getAnnouncementbyID_Consultant.component";

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
              <li className="navbar-item">
                  <Link to="/viewCandidatecertificate" className="nav-link">view all candidate Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewCandidatereccertificate" className="nav-link">view all candidate recommended Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewAllAnnouncements_Candidate" className="nav-link">
                    View Announcements
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/getAnnouncementbyID_Candidate" className="nav-link">
                    get Announcement by ID
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
        <Route path="/viewCandidatecertificate" component={getallcertificateCandidate}/>
        <Route path="/viewCandidatereccertificate" component={getallcertificateRecCandidate}/>
        <Route path="/viewAllAnnouncements_Candidate" component={viewAllAnnouncements_Candidate} />
        <Route path="/getAnnouncementbyID_Candidate" component={getAnnouncementbyID_Candidate} />

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
              <li className="navbar-item">
                  <Link to="/viewConsultancycertificate" className="nav-link">view all consultancy Certificates</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewConsultancyreccertificate" className="nav-link">view all consultancy recommended Certificates</Link>
                </li>
                
                <li className="navbar-item">
                  <Link to="/viewAllAnnouncements_Consultant" className="nav-link">
                    View Announcements for consultant
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewAllResearches" className="nav-link">
                    View Researches
                  </Link>
                </li>
                
                <li className="navbar-item">
                  <Link to="/deleteResearches" className="nav-link">
                    View Researches for delete
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/getAnnouncementbyID_Consultant" className="nav-link">
                    get announcement by ID 
                  </Link>
                </li>
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/consultancyProfile" component={Consultancy} />
        <Route path="/search" component={Search} />
        <Route path="/viewConsultancycertificate" component={getallcertificateConsultancy}/>
        <Route path="/viewConsultancyreccertificate" component={getallcertificateRecConsultancy}/>
        <Route path="/deleteResearches" component={deleteResearches} />
        <Route path="/viewAllAnnouncements_Consultant" component={viewAllAnnouncements_Consultant} />
        <Route path="/getAnnouncementbyID_Consultant" component={getAnnouncementbyID_Consultant} />

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
              <li className="navbar-item">
                <Link to="/getAnnouncementbyID_Partner" className="nav-link">
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
        <Route path="/getAnnouncementbyID_Partner" component={getAnnouncementbyID_Partner} />

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
                  <Link to="/createAnnouncement" className="nav-link">
                    Create Announcement
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewAllAnnouncements_Admin" className="nav-link">
                    View Announcements for admin
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/deleteAnnouncements" className="nav-link">
                    View Announcements for admin for delete
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/getAnnouncementbyID_Admin" className="nav-link">
                    Get an Announcement for admin
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/updateAnnouncement" className="nav-link">
                    Update Announcement for admin
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
        <Route path="/admincertificates" component={getallcertificate}/>
        <Route path="/createcertificate" component={Createcertificate}/>
        <Route path="/updatecertificate" component={updateCertificate}/>
        <Route path="/createAnnouncement" component={createAnnouncement} />
        <Route path="/viewAllAnnouncements_Admin" component={viewAllAnnouncements_Admin} />
        <Route path="/deleteAnnouncements" component={deleteAnnouncements} />
        <Route path="/getAnnouncementbyID_Admin" component={getAnnouncementbyID_Admin} />
        <Route path="/updateAnnouncement" component={updateAnnouncement} />
      </div>
    );
    return (
      // <Router>
      //   <div className="container">
      //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //       <a
      //         className="navbar-brand"
      //         href="http://localhost:3000/"
      //         target="_blank"
      //       >
      //         <img
      //           src={logo}
      //           width="287px"
      //           height="100px"
      //           alt="LirtenHub-Logo"
      //         />
      //       </a>
      //       <div className="collpase navbar-collapse">
      //         <ul className="navbar-nav mr-auto">
      //           <li className="navbar-item">
      //             <Link to="/" className="nav-link">
      //               Home
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/createaccount" className="nav-link">
      //               Register to LirtenHub
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/login" className="nav-link">
      //               Login
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/AdminProfile" className="nav-link">
      //               Show Admin Profile
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/consultancyProfile" className="nav-link">
      //               Show consultancy Profile
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/partnerProfile" className="nav-link">
      //               Show Partner Profile
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/candidateProfile" className="nav-link">
      //               Show candidate Profile
      //             </Link>
      //             <Link to="/awaitingprojects" className="nav-link">
      //               Awaiting Projects
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/adminprojects" className="nav-link">
      //               Admin Projects
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/candidatereports" className="nav-link">
      //               Candidate Reports
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/candidateresearches" className="nav-link">
      //               Candidate Researches
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/candidaterequestcertificate" className="nav-link">
      //               Candidate Request Certificate
      //             </Link>
      //           </li>
      //           <li className="navbar-item">
      //             <Link to="/search" className="nav-link">
      //               Search
      //             </Link>
      //           </li>
               
               
          //     </ul>
          //   </div>
          // </nav>
          // <br />
         
          
         
        // </div>
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
