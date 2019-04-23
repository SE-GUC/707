
import axios from "axios";
import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class consultancyapprovedProjects extends Component {
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
      .get("http://localhost:5000/api/consultancies/approvedProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const projects = res.data.data;
        this.setState({ projects });
      });
  }

  addtask = id => {
    window.location.replace("/consultancyaddtask/"+id)
    
  };
  showtasks = id => {
    window.location.replace("/consultancyshowtasks/"+id)
    
  };
  
  render() {
    return (
      <ul>
                           
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Project Name</th>
                                <th>Project Description</th>
                                <th>Required Years of Experience</th>
                                <th>Hours</th>
                                <th>Minimum Credit Hours</th>
                                <th>Maximum Credit Hours</th>
                                <th>Chosen Credit Hours</th>
                                <th>Credits Penalty</th>
                                <th>Project type</th>
                                <th>Signed Contract</th>
                                <th>Required Skills</th>
                                <th>Project deadline</th>
                                <th>Add task</th>
                                <th>Show tasks</th>
                            </tr>
                        </thead>
                        {this.state.projects.map(project =>

                            <tbody>
                                <tr >
                                    <td >{project.name}</td>
                                    <td> {project.description}</td>
                                    <td>{project.yearsOfExperience}</td>
                                    <td>{project.hours}</td>
                                    <td>{project.minCreditsHour}</td>
                                    <td>{project.maxCreditsHour}</td>
                                    <td>{project.chosenCreditHour}</td>
                                    <td>{project.creditsPenalty}</td>
                                    <td>{project.type}</td>
                                    <td>{String(project.contractSigned)}</td>
                                    <td> {project.requiredSkills.map(requiredSkills => {
                                          return <li>{requiredSkills}</li>;
                                               })}</td>
                                    <td>{project.deadline}</td>           
                                    <td>
                                    <button id="btn1" onClick={this.addtask.bind(this, project._id)}>Add Task</button></td>
                                   <td> <button id="btn2" onClick={this.showtasks.bind(this, project._id)}>Show Tasks</button></td>

                                </tr>
                            </tbody>
                        )}
                    </Table>










        {/* {this.state.projects.map(project => (
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
                checked={this.state.type === "true"}
              />
              <label className="form-check-label">Signed Contract</label>
            </div>
            <div className="list">
              <p> Required Skills</p>
              {project.requiredSkills.map(requiredSkills => {
                return <li>{requiredSkills}</li>;
              })}
            </div>
          <div key={project._id}>
          <Link to={`consaddtask/${project._id}`}>Add task</Link>
          </div>

          <div key={project._id}>
          <Link to={`consshowtasks/${project._id}`}>Show tasks</Link>
          </div>
            <br />
            <br />
          </li>
        ))} */}
      </ul>
    );
  }
}
