import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class partnershowcons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            consultancies: []
        };
      }

      componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {project}=this.props.match.params
        axios
          .get("http://localhost:5000/api/partners/consultancy/pendingProjects/"+{project}.project, {
            headers: {
              Authorization: token
            }
          })
          .then(res => {
            const consultancies = res.data.data;
            this.setState({ consultancies });
          });
      }

      accept = id => { 
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {project}=this.props.match.params
        axios
        .post("http://localhost:5000/api/partners/consultancy/pendingProjects/"+{project}.project+"/"+id,{}, {
          headers: {
            Authorization: token
          }
        }).then(res => {
            alert("You accepted a consultancy");
          })
       
    };
      
      render() {
        return (
          <ul>



<Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Years of experience</th>
                                <th>Establishment Date</th>
                                <th>Profession</th>
                                <th>Skills</th>
                                <th>Contact numbers</th>
                                <th>Interests</th>
                                <th>Accept</th>
                            </tr>
                        </thead>
                        {this.state.consultancies.map(consultancy =>

                            <tbody>
                                <tr >
                                    <td >{consultancy.name}</td>
                                    <td> {consultancy.email}</td>
                                    <td>{consultancy.address}</td>                                    
                                    <td>{consultancy.yearsOfExperience}</td>
                                    <td>{consultancy.establishmentDate}</td>
                                    <td>{consultancy.profession}</td>
                                    <td> {consultancy.skills.map(requiredSkills => {
                                          return <li>{requiredSkills}</li>;
                                               })}</td>
                                    <td> {consultancy.contactNumbers.map(contact => {
                                          return <li>{contact}</li>;
                                               })}</td>  
                                    <td> {consultancy.interests.map(interest => {
                                          return <li>{interest}</li>;
                                               })}</td>                      
                                    
                                    <td>
                                    <button id="btn1" onClick={this.accept.bind(this,consultancy._id)}>Accept</button></td>

                                </tr>
                            </tbody>
                        )}
                    </Table>

            {/* {this.state.consultancies.map(consultancy => (
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
            <label>Establishment date: {consultancy.establishmentDate}</label>
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
          </div> */}



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
          {/* <div className="form-group">
            <input
              type="submit"
              value="Accept"
              className="btn btn-primary"
               onClick={this.accept.bind(this,consultancy._id)}
            />
          </div>
              </li>
            ))} */}
          </ul>
        );
      }


}
