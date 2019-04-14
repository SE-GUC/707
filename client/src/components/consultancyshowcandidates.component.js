
import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class consultancyshowcandidates extends Component {
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
      .get("http://localhost:5000/api/consultancies/candidate/pendingTasks/"+{task}.task, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const candidates = res.data.data;
        this.setState({ candidates });
      });
  }
  render() {
    return (
      <ul>
          
        {this.state.candidates.map(candidate => (
          <li>
              <h3>Candidates applied for this task</h3>
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

      
          </li>
        ))}
      </ul>
    );
  }

}
