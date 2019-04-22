import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
const axios = require("axios");


export default class viewEvaluationbyId_Admin extends Component {
    constructor(props) {
      super(props);
      
     this.state = {
            evaluations:[]
         }
     }
     handleClick(evaluationid, e) {
        console.log(evaluationid);
        window.location.replace("/viewOneEvaluationbyId_Admin/"+evaluationid._id)        
      }
      showOneEvaluation = id =>{
        window.location.replace("/viewOneEvaluation_Admin/"+id)
      };
    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const {evaluation}=this.props.match.params;
     console.log({evaluation}.evaluation);
        
        axios.get('http://localhost:5000/api/admins/certificate/evaluationTests/'+{evaluation}.evaluation, {
          headers: {
            Authorization: token
          }
        })
          .then(res => {
              console.log(res.data.data);
            const evaluations = res.data.data;
            this.setState({ evaluations });
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
    <tr  onClick={this.showOneEvaluation.bind(this, person._id)}>
      <td>{person.type}</td>
      <td> {person.content}</td>
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