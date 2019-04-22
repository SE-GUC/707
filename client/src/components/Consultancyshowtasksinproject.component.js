import axios from "axios";
import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import Cookies from "universal-cookie";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class showtasksofproject extends Component {
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
        const {project}=this.props.match.params
        window.location.replace("/conshowcan/"+{project}.project+"/"+id)
        
      };
      
      render() {
        return (
          <ul>
             <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Task Name</th>
                                <th>Task Description</th>
                                <th>type</th>
                                <th>Deadline</th>
                                <th>hours</th>
                                <th>Minimum Credits Hour</th>
                                <th>Maximum Credits Hour</th>
                                <th>Credits Penalty</th>
                                <th>Minimum Years Of Experience</th>
                                <th>Required Skills</th>
                                <th>Candidate Role</th>
                                <th>Contract Signed</th>
                                <th>Applied Candidates</th>
                            </tr>
                        </thead>
                        {this.state.tasks.map(task =>

                            <tbody>
                                <tr >
                                    <td >{task.name}</td>
                                    <td> {task.description}</td>
                                    <td>{task.type}</td>                                    
                                    <td>{task.deadline}</td>
                                    <td>{task.hours}</td>
                                    <td>{task.minCreditsHour}</td>
                                    <td>{task.maxCreditsHour}</td>
                                    <td>{task.creditsPenalty}</td>
                                    <td>{task.yearsOfExperience}</td>
                                    <td> {task.requiredSkills.map(requiredSkills => {
                                          return <li>{requiredSkills}</li>;
                                               })}</td>           
                                    <td>{task.candidateRole}</td>
                                    <td>{String(task.contractSigned)}</td>
                                    
                                    <td>
                                    <button id="btn1" onClick={this.showcandidates.bind(this,task._id)}>Show applied candidates</button></td>

                                </tr>
                            </tbody>
                        )}
                    </Table>


            {/* {this.state.tasks.map(project => (
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
            <label>Contract Signed: {Strng(project.contractSigned)}i</label>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Show candidates"
              className="btn btn-primary"
              onClick={this.showcandidates.bind(this,project._id)}
            />
          </div>
              </li>
            ))} */}
          </ul>
        );
      }


}
