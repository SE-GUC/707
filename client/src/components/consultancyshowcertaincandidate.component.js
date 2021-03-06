import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
export default class consultancyassignedcandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    if (usertype !== "consultancy") {
      alert("Invalid access");
      window.location.replace("/");
    }
    const { task } = this.props.match.params;
    axios
      .get(
        "http://localhost:5000/api/consultancies/candidate/approvedTasks/" +
          { task }.task,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        const candidates = res.data.data;
        this.setState({ candidates });
      });
  }

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
              <th>Birthdate</th>
              <th>Education</th>
              <th>Occupation</th>
              <th>Skills</th>
              <th>Contact numbers</th>
              <th>Languages</th>
              <th>Courses</th>
              <th>Interests</th>
            </tr>
          </thead>
          {this.state.candidates.map(candidate => (
            <tbody>
              <tr>
                <td>{candidate.name}</td>
                <td> {candidate.email}</td>
                <td>{candidate.address}</td>
                <td>{candidate.yearsOfExperience}</td>
                <td>{candidate.birthdate}</td>
                <td>{candidate.education}</td>
                <td>{candidate.occupation}</td>
                <td>
                  {" "}
                  {candidate.skills.map(requiredSkills => {
                    return <li>{requiredSkills}</li>;
                  })}
                </td>
                <td>
                  {" "}
                  {candidate.contactNumbers.map(contact => {
                    return <li>{contact}</li>;
                  })}
                </td>
                <td>
                  {" "}
                  {candidate.languages.map(language => {
                    return <li>{language}</li>;
                  })}
                </td>
                <td>
                  {" "}
                  {candidate.courses.map(course => {
                    return <li>{course}</li>;
                  })}
                </td>
                <td>
                  {" "}
                  {candidate.interests.map(interest => {
                    return <li>{interest}</li>;
                  })}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

        {/* {this.state.candidates.map(candidate => (
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
            
        
              </li>
            ))} */}
      </ul>
    );
  }
}
