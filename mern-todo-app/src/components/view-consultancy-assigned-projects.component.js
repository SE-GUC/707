import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie'; 

export default class consultancyAssignedProjects extends Component {
    state = {
        assignedProjects: []
    
      }
    componentDidMount(){
        const cookies = new Cookies();
        const token= cookies.get('token');
        console.log(token)
        axios.get('https://lirtenhub-707.herokuapp.com/api/consultancies/projects', { headers: {
            Authorization: token.data}
          })
          .then(res => {
            console.log(res.data)
            const assignedProjects = res.data.data;
            this.setState({  assignedProjects });
          })

    }
  render() {
    return (
        
        <div>
        <ul class="list-group">
        { this.state.assignedProjects.map(project => 
       <li class="list-group-item disabled" aria-disabled="true" >
        <p>  My Projects<br></br>
            <br></br>
         <li>Project Name: {project}<br></br></li>   
           
       
    </p>
        </li>)}

     </ul>
      
    </div>
      
    )
  
}}