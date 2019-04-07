import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class AdminProjects extends Component {
    
    state = {
        projects: []
      }
   
      componentDidMount() {
         const cookies = new Cookies();
         const token= cookies.get('token')
        axios.get('https://lirtenhub-707.herokuapp.com/api/admins/get/projects', { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const projects = res.data.data;
            this.setState({ projects });
          })
      }
   
      render() {
        return (
          <ul>
            { this.state.projects.map(project => <li>
                <p>Project Name: {project.name}<br></br>
                Project Description: {project.description}<br></br>
                Project Type: {project.type}<br></br>
               Tasks: {project.tasks}<br></br>
               
            </p>   </li>)}
          </ul>
        )
      }
    };