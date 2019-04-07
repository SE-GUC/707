import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class PartnerProjects extends Component {
    
    state = {
        projects: []
      }
   
      componentDidMount() {
         const cookies = new Cookies();
         const token= cookies.get('token')
        axios.get('https://lirtenhub-707.herokuapp.com/api/partners/projects', { headers: {
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
                <p>Project Names: {project}<br></br>
            </p>   </li>)}
          </ul>
        )
      }
    };