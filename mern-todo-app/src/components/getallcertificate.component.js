import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getallcertificate extends Component {

    state = {
        certificates: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:3000/api/admins/get/certificates", {  headers: {
          Authorization: token.data}
        })
          .then(res => {
            const certificates = res.data.data;
            this.setState({ certificates });
          })
      }
    
      render() {
        return (
          <ul>
            { this.state.certificates.map(person => <li>
                <p>
                Certificate Name: {person.name}<br></br> 
                Certificate Description: {person.description}<br></br>  
                Certificate Category: {person.category}<br></br> 
                Certificate available: {String(person.available)}<br></br> 
                Evaluation Content: {person.evaluationTest.evaluationContent}<br></br>
                Total Score: {person.evaluationTest.totalScore}<br></br>
                Passing Score: {person.evaluationTest.passingScore}<br></br>
                Candidate Score: {person.evaluationTest.candidateScore}<br></br>
                Passed: {String(person.evaluationTest.passed)}<br></br>
                
            </p>   </li>)}
          </ul>
        )
      }
    

}