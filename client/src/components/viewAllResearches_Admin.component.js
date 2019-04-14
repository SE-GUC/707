import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class viewAllResearches_Admin extends Component {

    state = {
        researches: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/admins/researches", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const researches = res.data.data;
            this.setState({ researches });
          })
      }
    
      render() {
        return (
          <ul>
            { this.state.researches.map(person => <li>
                <p>
                Research title: {person.title}<br></br> 
                Research interests: {person.interests}<br></br>  
                Research content: {person.content}<br></br> 
                
                
            </p>   </li>)}
          </ul>
        )
      }
    

}