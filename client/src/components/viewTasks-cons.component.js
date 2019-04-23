import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class viewAllTasks extends Component {

    state = {
        Tasks: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/Tasks", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const Tasks = res.data.data;
            this.setState({ Tasks });
          })
      }
    
      render() {
        return (
          <ul>
            { this.state.Tasks.map(person => <li>
                <p>
                Task name: {person.name}<br></br> 
                Task description: {person.description}<br></br>  
                Task type: {person.type}<br></br>  
                Task deadline: {String (person.deadline)}<br></br>  
                Task hours: {String (person.hours)}<br></br>  
                Task minimum credit hours: {String (person.minCreditsHour)}<br></br>  
                Task maximum credit hours: {String (person.maxCreditsHour)}<br></br>  
                Task Chosen Credit Hour: {String (person.chosenCreditHour)}<br></br>  
                Task Credits Penalty: {String (person.creditsPenalty)}<br></br>  
                Task required years of experience: {String (person.yearsOfExperience)}<br></br>  
                Task Contract signed: {String (person.contractSigned)}<br></br>   
                Task status: {String (person.status)}<br></br> 
                
                
            </p>   </li>)}
          </ul>
        )
      }
    

}