
import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class partnerapprovedprojects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  
  

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/partners/approvedProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const projects = res.data.data;
        this.setState({ projects });
      });
  }
  
 
  showconsultancy = id => {
    window.location.replace("/partnershowconsultancy/"+id)
    
  };
  showassignedconsultancy = id => {
    window.location.replace("/sacons/"+id)
    
  };
  showtasks = id => {
    window.location.replace("/partnershowtask/"+id)
    
  };

  render() {
    return (
      <ul>
        {this.state.projects.map(project => (
          <li>
            <div className="form-group">
              <label>Project Name: </label>
              <input
                type="text"
                className="content-editable"
                value={project.name}
              />
            </div>
            <div className="form-group">
              <label>Project Description: </label>
              <input
                type="text"
                className="form-control"
                value={project.description}
              />
            </div>
            <div className="form-group">
              <label>Required Years of Experience: </label>
              <input
                type="number"
                className="form-control"
                value={project.yearsOfExperience}
              />
            </div>
            <div className="form-group">
              <label>Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.hours}
              />
            </div>
            <div className="form-group">
              <label>Minimum Credit Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.minCreditsHour}
              />
            </div>
            <div className="form-group">
              <label>Maximum Credit Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.maxCreditsHour}
              />
            </div>
            <div className="form-group">
              <label>Chosen Credit Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.chosenCreditHour}
              />
            </div>
            <div className="form-group">
              <label>Credits Penalty: </label>
              <input
                type="number"
                className="form-control"
                value={project.creditsPenalty}
              />
            </div>
            <div className="form-group">
              <label>Project type: </label>
              <input
                type="text"
                className="content-editable"
                value={project.type}
              />
            </div>
            <div className="form-group">
              <label>Project deadline: </label>
              <input
                type="date"
                className="content-editable"
                value={project.deadline}
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="true"
                value="true"
                checked={project.type === "true"}
              />
              <label className="form-check-label">Signed Contract</label>
            </div>
            <div className="list">
              <p> Required Skills</p>
              {project.requiredSkills.map(requiredSkills => {
                return <li>{requiredSkills}</li>;
              })}
            </div>

            <div className="form-group">
            <input
              type="submit"
              value="Show Tasks"
              className="btn btn-primary" 
              onClick={this.showtasks.bind(this,project._id)}
            />
          </div>
            <div className="form-group">
            <input
              type="submit"
              value="Show Applied Consultancies"
              className="btn btn-primary"
              onClick={this.showconsultancy.bind(this,project._id)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Show consultancy assigned to this project"
              className="btn btn-primary"
              onClick={this.showassignedconsultancy.bind(this,project._id)}
            />
            
          </div>
            <br />
            <br />
          </li>
        ))}
      </ul>
    );
  }
}
