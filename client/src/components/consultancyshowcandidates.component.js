import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
export default class consultancyshowcandidates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: []
    };
  }

  accept = id => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    if (usertype !== "consultancy") {
      alert("Invalid access");
      window.location.replace("/");
    }
    const { task } = this.props.match.params;
    const { project } = this.props.match.params;
    axios
      .post(
        "http://localhost:5000/api/consultancies/candidate/pendingTasks/" +
          { project }.project +
          "/" +
          { task }.task +
          "/" +
          id,
        {},
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        alert("You accepted a Candidate");
      });
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { task } = this.props.match.params;
    axios
      .get(
        "http://localhost:5000/api/consultancies/candidate/pendingTasks/" +
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
        <h3>Candidates applied for this task</h3>

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
              <th>Accept</th>
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
                <td>
                  {" "}
                  <input
                    type="submit"
                    value="Accept"
                    className="btn btn-primary"
                    onClick={this.accept.bind(this, candidate._id)}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </Table>

        {/* {this.state.candidates.map(candidate => (
          <li>
             
            <div className="form-group">
        <label>Name: {candidate.name}</label><br />
      </div>
      <div className="form-group">
        <label>Email: {candidate.email}</label><br />
      </div>
      <div className="form-group">
        <label>Credits: {candidate.credits}</label><br /><br />
      </div>
      <div className="form-group">
        <label>Address: {candidate.address}</label><br />
      </div>
      <div className="form-group">
        <label>Years of Experience: {candidate.yearsOfExperience}</label><br />
      </div>
      <div className="form-group">
        <label>birthdate: {candidate.birthdate}</label><br />
        </div>
      <div className="form-group">
        <label>Education: {candidate.education}</label><br />
      </div>
      <div className="form-group">
        <label>Occupation: {candidate.occupation}</label><br />
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
        ))} */}
      </ul>
    );
  }
}
