import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Cookies from 'universal-cookie';
import AdminTasks from "./admin-tasks.component.js";
const axios = require("axios");


export default class projects extends Component {
    constructor(props){
        super(props)

    this.state = {
        projects: []
      }
    }
      componentDidMount() { 
        const cookies = new Cookies();
        const token= cookies.get('token');
        console.log(token)
        axios.get('http://localhost:5000/api/admins/projects', { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const projects = res.data.data;
            this.setState({ projects });
            console.log(projects);
          })
      }


      onSubmit(id) {
        const cookies = new Cookies();
        const token= cookies.get('token');
        console.log(token)
        axios.delete('http://localhost:5000/api/admins/project/'+ id, { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const deletedProject = res.data.data;
            console.log(deletedProject);
            this.rerender(token);
         
          })
    }

    viewTasks(projectID){
      ReactDOM.render(
        <AdminTasks projectID={projectID} />,
        document.getElementById('root')
      );  

    }
    rerender(token) { 
        
        axios.get('http://localhost:5000/api/admins/projects', { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const projects = res.data.data;
            this.setState({ projects });
            console.log(projects);
          })
      }
    
      render() {
        return (
          <Router>
          <ul>

            { this.state.projects.map(project => <li>
                
                <p>Name: {project.name}<br></br>
                 Description: {project.description}<br></br>
                 Type: {project.type}<br></br>
                Deadline: {project.deadline}<br></br>
                Hours: {project.hours}<br></br>
                Min Credits/Hr: {project.minCreditsHour}<br></br>
                Max Credits/Hr: {project.maxCreditsHour}<br></br>
                Chosen Credit Hour: {project.chosenCreditHour}<br></br>
                Penalty: {project.creditsPenalty}<br></br>
                Years of Experience: {project.yearsOfExperience}<br></br>
                Contract Signed: {project.contractSigned}<br></br>
                Required Skills: {project.requiredSkills.map(requiredSkills =>
                        <li>{requiredSkills}</li> 
                  )}<br></br>
                Status: {project.status} <br></br>
                Life Cycle: {project.projectcycle.map(cycle =>
                 <li>Description: {cycle.description}<br></br>
                 Status: {cycle.status}<br></br> 
                 Percentage: {cycle.percentage}</li>)}<br></br>

                
                  <NavLink to={`tasks/${project._id}`} onClick={this.viewTasks.bind(this,project._id)} >View Tasks</NavLink>
                 
                <br></br>
              
                <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, project._id)}>Delete</button>
                </p> 
              
                  </li>)}
          </ul>
          
           </Router>
        )
      }
    };