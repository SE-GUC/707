import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
const axios = require("axios");


export default class tasks extends Component {
    constructor(props){
        super(props)

        this.state = {
            tasks: []
          }
   
    }
      componentDidMount() { 
        console.log("hereee11111")
        console.log(this.props.match.params.projectID)
        const cookies = new Cookies();
        const token= cookies.get('token');
        console.log(token)
        axios.get('http://localhost:5000/api/admins/project/tasks/'+this.props.match.params.projectID, { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const tasks = res.data.data;
            this.setState({ tasks });
            console.log(tasks);
          })
      }


      onSubmit(id) {
          console.log(id)
        const cookies = new Cookies();
        const token= cookies.get('token');
        console.log(token)
        axios.delete('http://localhost:5000/api/admins/project/tasks/'+this.props.match.params.projectID+'/'+id, { headers: {
            Authorization: token.data}
          })
          .then(res => {
           
            this.rerender(token);
         
          })
    }
    rerender(token) { 
        
        axios.get('http://localhost:5000/api/admins/project/tasks/'+this.props.match.params.projectID, { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const tasks = res.data.data;
            this.setState({ tasks });
            console.log(tasks);
          })
      }
    
      render() {
        return (
          <ul>

            { this.state.tasks.map(task => <li>
                
                <p>Name: {task.name}<br></br>
                 Description: {task.description}<br></br>
                 Type: {task.type}<br></br>
                Deadline: {task.deadline}<br></br>
                Hours: {task.hours}<br></br>
                Min Credits/Hr: {task.minCreditsHour}<br></br>
                Max Credits/Hr: {task.maxCreditsHour}<br></br>
                Chosen Credit Hour: {task.chosenCreditHour}<br></br>
                Penalty: {task.creditsPenalty}<br></br>
                Years of Experience: {task.yearsOfExperience}<br></br>
                Contract Signed: {task.contractSigned}<br></br>
                Candidate Role: {task.candidateRole}<br></br>
                Required Skills: {task.requiredSkills.map(requiredSkills =>
                        <li>{requiredSkills}</li> 
                  )}<br></br>
                Status:{task.status} <br></br>
                Life Cycle:{task.taskcycle.map(cycle =>
                 <li>Description:{cycle.description}<br></br>
                 Status:{cycle.status}<br></br> 
                 Percentage:{cycle.percentage}</li>)}
                 <br></br>
                 
                
              
                <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, task._id)}>Delete</button>
                </p> 
              
                  </li>)}
          </ul>
        )
      }
    };