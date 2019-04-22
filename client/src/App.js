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
import awaitingprojects from "./components/viewawaitingapproval.component.js";
import updatetask from "./components/updatetaskattribute.component.js";
import updateSkills from "./components/candidateupdateskills.component.js";
import consproj from "./components/viewapprovedprojconsul.component.js";
import updateconsttask from "./components/updateconstaskattribute.component.js";
import createresearch from "./components/createresearch.component.js";
import updateconsSkills from "./components/consultancyupdateskills.component.js";
import consviewallresearches from "./components/consviewallresearches.component.js";
import updateresearch from "./components/consviewupdateresearch.component.js";
import consultancyapprovedprojects from "./components/consultancyshowapprovedprojects.component.js";
import  consultancyaddtask from "./components/Consultancyaddtaskinproject.component.js";
import  consultancyshowtask from "./components/Consultancyshowtasksinproject.component.js";
import  consultancyshowcandidates from "./components/consultancyshowcandidates.component.js";
import getResearchbyID_Admin from "./components/getResearchbyID_Admin.component.js";
import getProjectbyID_Admin from "./components/getProjectbyID_Admin.component.js";
import getResearchbyID_Partner from "./components/getResearchbyID_Partner.component.js";
import getreportbyID_Admin from "./components/viewReportbyid-admin.component";
import getreportbyID_cons from "./components/viewReportsbyid-cons.component";
import getreportbyID_part from "./components/viewReportsbyid-partners.component";
import deleteReport_cons from "./components/deleteReport-cons.component";
import updateReport_cons from "./components/updateReport-cons.component";
import createReport from "./components/createReport-cons.component";
import ConsultancyRequestCertificate from "./components/consultancy-request-certificate.component.js";
import PartnerCreateProjects from "./components/partner-create-projects.component.js";
import PartnerAwaitingApproval from "./components/partner-awaiting-approval.component.js";
import CreateEmail from "./components/emails.component.js";
import CandidateTasks from "./components/candidate-tasks.component.js";
import CandidateApprovedTasks from "./components/candidate-approved-tasks.component.js";
import consultancyrecommendedprojects from "./components/consultancyrecprojects.component.js";
import partnerapprovedprojects from "./components/partnerapprovedprojects.component.js";
import partnerconsultancyappliedonproject from "./components/partnerconsultanciesappliedonproject.component.js";
import partnerassignedconsultancy from "./components/partnerassignedconsultancy.component.js";
import partnershowtasks from "./components/partnershowtasksinproject.component.js";
import partnershowcandidate from "./components/partnershowcandidates.component.js";
import partnershowassignedcandidate from "./components/partnershowassignedcandidate.component.js";
import viewAllEvaluations_Admin from "./components/viewAllEvaluations_Admin.component.js";
import viewEvaluationbyId_Admin from "./components/viewEvaluationbyId_Admin.component.js";
import viewOneEvaluation_Admin from "./components/viewOneEvaluation_Admin.component.js";
import getallSentEmails from "./components/viewSentMails.component.js";
import getallRecievedEmails from "./components/viewRecievedMails.component.js";

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
                <li className="navbar-item">
                  <Link to="/candidateskillsupdate" className="nav-link">Update Candidate Skills</Link>
                </li>  
                <li className="navbar-item">
                  <Link to="/viewsentmails" className="nav-link">View Sent Mails</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/viewrecievedemails" className="nav-link">View Recieved Mails</Link>
                </li> 

                <li className="navbar-item">
                  <Link to="/viewtasks" className="nav-link"> Candidate Tasks</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/viewapprovedtasks" className="nav-link"> Candidate Approved Tasks</Link>
                </li>
                
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/candidateskillsupdate" component={updateSkills} />
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
        <Route path= "/createEmail" component={CreateEmail} />
        <Route path= "/viewsentmails" component={getallSentEmails} />
        <Route path= "/viewrecievedemails" component={getallRecievedEmails} />

        <Route path="/viewtasks" component={CandidateTasks} />
        <Route path="/viewapprovedtasks" component={CandidateApprovedTasks} />


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
                <Link to="/consultancyrequestcertificate" className="nav-link">
                  Consultancy Request Certificate
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
                <li className="navbar-item">
                  <Link to="/consapprovedproject" className="nav-link">View Consultancy Approved Projects</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/consresearchcreate" className="nav-link">Create New Research</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/consultancyskillsupdate" className="nav-link">Update Consultancy Skills</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/consultancyviewresearches" className="nav-link">View all researches</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/consappprojects" className="nav-link">
                    consultancy approved projects
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewReportbyid-cons" className="nav-link">
                    View Reports for consultancy by id 
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/deleteReport-cons" className="nav-link">
                    delete reports for consultancy
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/updateReport-cons" className="nav-link">
                    update Reports for consultancies
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/createReport-cons" className="nav-link">
                    create Reports for consultancy
                  </Link>
                </li>
                 <li>
                  <Link to="/recommendedprojects" className="nav-link">
                    Recommended projects
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewsentmails" className="nav-link">View Sent Mails</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/viewrecievedemails" className="nav-link">View Recieved Mails</Link>
                </li> 
            </ul>
          </div>
        </nav>
        <br />
        
        <Route path="/logout" component={Logout} />
        <Route path="/consultancyProfile" component={Consultancy} />
        <Route path="/search" component={Search} />
        <Route path="/consultancyrequestcertificate" component={ConsultancyRequestCertificate}/>
        <Route path="/viewConsultancycertificate" component={getallcertificateConsultancy}/>
        <Route path="/viewConsultancyreccertificate" component={getallcertificateRecConsultancy}/>
          <Route path="/deleteResearches" component={deleteResearches} />
          <Route path="/viewAllAnnouncements_Consultant" component={viewAllAnnouncements_Consultant} />
          <Route path="/getAnnouncementbyID_Consultant" component={getAnnouncementbyID_Consultant} />
          <Route path="/consapprovedproject" component={consproj}/>
          <Route path='/updateconstaskattribute/:task/:project' component={updateconsttask}/>
          <Route path='/consresearchcreate' component={createresearch}/>
          <Route path="/consultancyskillsupdate" component={updateconsSkills} />
          <Route path="/consultancyviewresearches" component={consviewallresearches} />
          <Route path='/researchvieworupdate/:research' component={updateresearch}/>
          <Route path="/consappprojects" component={consultancyapprovedprojects} />
          <Route path="/consaddtask/:project" component={consultancyaddtask} />
          <Route path="/consshowtasks/:project" component={consultancyshowtask} />
          <Route path="/conshowcand/:project/:task" component={consultancyshowcandidates} />
          <Route path="/viewReportbyid-cons" component={getreportbyID_cons} />
          <Route path="/deleteReport-cons" component={deleteReport_cons} />
          <Route path="/updateReport-cons" component={updateReport_cons} />
          <Route path="/createReport-cons" component={createReport} />
          <Route path= "/createEmail" component={CreateEmail} />
          <Route path="/recommendedprojects" component={consultancyrecommendedprojects} />
          <Route path= "/viewsentmails" component={getallSentEmails} />
          <Route path= "/viewrecievedemails" component={getallRecievedEmails} />
          

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
                <Link to="/partnercreateprojects" className="nav-link">
                Create Projects
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/partnerawaitingapprovalprojects" className="nav-link">
                Awaiting Approval Projects
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/getAnnouncementbyID_Partner" className="nav-link">
                  View Announcements
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/getResearchbyID_Partner" className="nav-link">
                  View Researches
                </Link>
              </li>
              <li className="navbar-item">
                  <Link to="/viewReportbyid-partners" className="nav-link">
                    View Reports for Partner by id 
                  </Link>
                </li>
                <li>
                  <Link to="/partnerapprovedprojects" className="nav-link">
                    My Approved projects 
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewsentmails" className="nav-link">View Sent Mails</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/viewrecievedemails" className="nav-link">View Recieved Mails</Link>
                </li> 
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/partnerProfile" component={Partner} />
        <Route path="/search" component={Search} />
        <Route path="/partnercreateprojects" component={PartnerCreateProjects}/>
        <Route path="/partnerawaitingapprovalprojects" component={PartnerAwaitingApproval}/>
        <Route path="/getAnnouncementbyID_Partner" component={getAnnouncementbyID_Partner} />
        <Route path="/getResearchbyID_Partner" component={getResearchbyID_Partner} />
        <Route path="/viewReportbyid-partners" component={getreportbyID_part} />
        <Route path= "/createEmail" component={CreateEmail} />
        <Route path="/partnerapprovedprojects" component={partnerapprovedprojects} />
        <Route path="/partnershowconsultancies/:project" component={partnerconsultancyappliedonproject} />

        {/* <Route path="/partnershowassignedconsultancy/:project" component={partnerassignedconsultancy} /> */}
        <Route path="/sacons/:project" component={partnerassignedconsultancy} />
        <Route path="/partnershowtask/:project" component={partnershowtasks} />
        <Route path="/partnershowcandidates/:project/:task" component={partnershowcandidate} />
        <Route path="/sacand/:task" component={partnershowassignedcandidate} />
        <Route path= "/viewsentmails" component={getallSentEmails} />
        <Route path= "/viewrecievedemails" component={getallRecievedEmails} />

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
              <Link to="/awaitingprojects" className="nav-link">Awaiting Projects</Link>
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
                <li className="navbar-item">
                  <Link to="/getResearchbyID_Admin" className="nav-link">
                    View Researches
                  </Link>
                </li>
                <li className="navbar-item">
                <Link to="/getProjectbyID_Admin" className="nav-link">
                  Admin Projects
                </Link>
              </li>
              <li className="navbar-item">
                  <Link to="/viewReportbyid-admin" className="nav-link">
                    View Reports for Admin by id 
                  </Link>
                </li>
                <li>
                  <Link to="/viewAllEvaluations_Admin" className="nav-link">
                    View All Evaluations
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/viewsentmails" className="nav-link">View Sent Mails</Link>
                </li> 
                <li className="navbar-item">
                  <Link to="/viewrecievedemails" className="nav-link">View Recieved Mails</Link>
                </li> 
            </ul>
          </div>
        </nav>
        <br />
        <Route path="/logout" component={Logout} />
        <Route path="/AdminProfile" component={Admin} />
        <Route path="/awaitingprojects" component={awaitingprojects} />
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
        <Route path="/getResearchbyID_Admin" component={getResearchbyID_Admin} />
        <Route path="/getProjectbyID_Admin" component={getProjectbyID_Admin} />
        <Route path="/viewReportbyid-admin" component={getreportbyID_Admin} />
        <Route path= "/createEmail" component={CreateEmail} />
        <Route path="/viewAllEvaluations_Admin" component={viewAllEvaluations_Admin} />
        <Route path='/viewEvaluationbyId_Admin/:evaluation' component={viewEvaluationbyId_Admin}/>
        <Route path='/updatetaskattribute/:task/:project' component={updatetask}/>
        <Route path='/viewOneEvaluation_Admin/:evaluation' component={viewOneEvaluation_Admin}/>
        <Route path= "/viewsentmails" component={getallSentEmails} />
        <Route path= "/viewrecievedemails" component={getallRecievedEmails} />

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
