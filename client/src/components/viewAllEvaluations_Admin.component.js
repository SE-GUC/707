import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';

const axios = require("axios");

export default class viewAllEvaluations_Admin extends Component {

    state = {
        evaluations: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/admins/evaluationTests", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const evaluations = res.data.data;
            this.setState({ evaluations });
            console.log(res);
            console.log(evaluations);
          })
      }
    
      render() {
        return (
          <ul>

  <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Evaluation Type</th>
      <th>Evaluation Content</th>
      <th>Evaluation Total Score</th>
      <th>Evaluation Passing Score</th>
    </tr>
  </thead>
  { this.state.evaluations.map(person => 
         
  <tbody>
    <tr>
      <td>{person.evaluationType}</td>
      <td> {person.evaluationContent}</td>
      <td>{person.totalScore}</td>
      <td>{person.passingScore}</td>
    </tr>
  </tbody>
   )}
</Table>
                
                
         
          </ul>
        )
      }
    

}