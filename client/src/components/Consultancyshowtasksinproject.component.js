import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class addtaskinproject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
      }

      componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {project}=this.props.match.params
        axios
          .get("http://localhost:5000/api/consultancies/project/tasks/"+{project}.project, {
            headers: {
              Authorization: token
            }
          })
          .then(res => {
            const tasks = res.data.data;
            this.setState({ tasks });
          });
      }
      
      showcandidates = id => {
        window.location.replace("/consshowcandidate/"+id)
        
      };
      
      render() {
        return (
          <ul>
            {this.state.tasks.map(project => (
              <li>
               
                <div className="form-group">
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
          </div>
          {/* <div key={project._id}>
          <Link to={`consshowcandidate/${project._id}`}>Show candidates applied on this task</Link>
          </div> */}
          <div className="form-group">
            <input
              type="submit"
              value="Show candidates"
              className="btn btn-primary"
              onClick={this.showcandidates.bind(this,project._id)}
            />
          </div>
              </li>
            ))}
          </ul>
        );
      }


}
