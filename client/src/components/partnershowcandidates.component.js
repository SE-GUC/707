import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class partnershowcandidate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            candidates: []
        };
      }

      componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {task}=this.props.match.params
        axios
          .get("http://localhost:5000/api/partners/candidate/pendingTasks/"+{task}.task, {
            headers: {
              Authorization: token
            }
          })
          .then(res => {
            const candidates = res.data.data;
            this.setState({ candidates });
          });
      }

      accept = id => { 
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {task}=this.props.match.params
        const {project}=this.props.match.params
        axios
        .post("http://localhost:5000/api/partners/candidate/pendingTasks/"+{project}.project+"/"+{task}.task+"/"+id,{}, {
          headers: {
            Authorization: token
          }
        }).then(res => {
            alert("You accepted a Candidate");
          })
       
    };
      
      render() {
        return (
          <ul>
            {this.state.candidates.map(candidate => (
              <li>
               <div className="form-group">
            <label>Name: {candidate.name}</label>
          </div>
          <div className="form-group">
            <label>Email: {candidate.email}</label>
          </div>
          <div className="form-group">
            <label>Address: {candidate.address}</label>
          </div>
          <div className="form-group">
            <label>Years of Experience: {candidate.yearsOfExperience}</label>
          </div>
          <div className="form-group">
            <label>Education: {candidate.education}</label>
          </div>
          <div className="form-group">
            <label>Occupation: {candidate.occupation}</label>
          </div>
          <div className="form-group">
            <label>Interests: </label>
            <li>{candidate.interests.map(interest => {
            return<li>{interest}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Contact numbers: </label>
            <li>{candidate.contactNumbers.map(contact => {
            return<li>{contact}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Skills: </label>
            <li>{candidate.skills.map(skill => {
            return<li>{skill}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Courses: </label>
            <li>{candidate.courses.map(course => {
            return<li>{course}</li>})}</li>
            <br />
          </div>
          <div className="form-group">
            <label>Languages: </label>
            <li>{candidate.languages.map(language => {
            return<li>{language}</li>})}</li>
            <br />
          </div>   


             
          <div className="form-group">
            <input
              type="submit"
              value="Accept"
              className="btn btn-primary"
               onClick={this.accept.bind(this,candidate._id)}
            />
          </div>
              </li>
            ))}
          </ul>
        );
      }


}
