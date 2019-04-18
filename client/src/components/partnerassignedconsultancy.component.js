import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class partnerassignedconsultancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultancies: []
            // name: "",
            // email: "",
            // address: "",
            // contactNumbers: "",
            // interests: "",
            // credits: "",
            // establishmentDate: "",
            // profession: "",
            // yearsOfExperience: "",
            // skills: "",
          };
      }



      componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {project}=this.props.match.params
        axios
          .get("http://localhost:5000/api/partners/consultancy/approvedProjects/"+{project}.project, {
            headers: {
              Authorization: token
            }
          })
          .then(res =>{
                const consultancies = res.data.data;
                this.setState({ consultancies });
            //   name: res.data.data.name,
            //   email: res.data.data.email,
            //   address: res.data.data.address,
            //   contactNumbers: res.data.data.contactNumbers,
            //   interests: res.data.data.interests,
            //   establishmentDate: res.data.data.establishmentDate,
            //   profession: res.data.data.profession,
            //   yearsOfExperience: res.data.data.yearsOfExperience,
            //   skills: res.data.data.skills
          });
      }
    //   componentDidMount() {
    //     const cookies = new Cookies();
    //     const token = cookies.get("token");
    //     const {project}=this.props.match.params
    //     axios
    //       .get("http://localhost:5000/api/partners/consultancy/approvedProjects/"+{project}.project, {
    //         headers: {
    //           Authorization: token
    //         }
    //       })
    //       .then(res => {
    //         const consultancies = res.data.data;
    //         this.setState({ consultancies });
    //       });
    //   }

     
    // render() {
    //     return (
    //       <div style={{ marginTop: 10 }}>
    //         <form onSubmit={this.onSubmit}>
    //           <div className="form-group">
    //             <label>Name: {this.state.name}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Email: {this.state.email}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Address: {this.state.address}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Years of Experience: </label>
    //           </div>
    //           <div className="form-group">
    //             <label>Profession: {this.state.profession}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Establishment date: {this.state.establishmentDate}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Interests: {this.state.interests}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Contact numbers: {this.state.contactNumbers}</label>
    //           </div>
    //           <div className="form-group">
    //             <label>Skills: {this.state.skills}</label>
    //           </div>
              
    //         </form>
    //       </div>
    //     );
    //   }
      render() {
        return (
          <ul>
              {
                  <h>saad</h>
              }
            {this.state.consultancies.map(consultancy => (
              <li>
               <div className="form-group">
            <label>Name: {consultancy.name}</label>
          </div>
          <div className="form-group">
            <label>Email: {consultancy.email}</label>
          </div>
          <div className="form-group">
            <label>Address: {consultancy.address}</label>
          </div>
          <div className="form-group">
            <label>Years of Experience: {consultancy.yearsOfExperience}</label>
          </div>
          <div className="form-group">
            <label>Profession: {consultancy.profession}</label>
          </div>
          <div className="form-group">
            <label>Establishment date: {this.state.establishmentDate}</label>
          </div>
          <div className="form-group">
            <label>Interests: </label>
            <li>{consultancy.interests.map(interest => {
            return<li>{interest}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Contact numbers: </label>
            <li>{consultancy.contactNumbers.map(contact => {
            return<li>{contact}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Skills: </label>
            <li>{consultancy.skills.map(skill => {
            return<li>{skill}</li>})}</li>
            <br />
          </div>



                {/* <div className="form-group">
            <label>Task Name: {project.name}</label><br />
          </div>
          <div className="form-group">
            <label>description: {project.description}</label><br />
          </div>
          <div className="form-group">
            <label>Type:  {project.type}</label><br /><br />
          </div>
          <div className="form-group">
            <label>Deadline: {project.deadline}</label><br />
          </div>
          <div className="form-group">
            <label>hours: {project.hours}</label><br />
          </div>
          <div className="form-group">
            <label>Minimum Credits Hour: {project.minCreditsHour}</label><br />
            </div>
          <div className="form-group">
            <label>Maximum Credits Hour: {project.maxCreditsHour}</label><br />
          </div>
          <div className="form-group">
            <label>Credits Penalty: {project.creditsPenalty}</label><br />
          </div>
          <div className="form-group">
            <label>Minimum Years Of Experience: {project.yearsOfExperience}</label><br />
          </div>
          <div className="form-group">
            <label>Required Skills:</label><li>{project.requiredSkills.map(skill => {
            return<li>{skill}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Candidate Role: {project.candidateRole}</label><br />
          </div>
          <div className="form-group">
            <label>Contract Signed: {String(project.contractSigned)}</label>
          </div> */}
          {/* <div key={project._id}>
          <Link to={`consshowcandidate/${project._id}`}>Show candidates applied on this task</Link>
          </div> */}
        
              </li>
            ))}
          </ul>
        );
      }


}
