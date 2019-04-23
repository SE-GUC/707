import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Table from 'react-bootstrap/Table';
const axios = require("axios");

export default class getallcertificateRecCandidate extends Component {
    state = {
        certificates: [],
        evaluations:[]
      }
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/candidates/recommendedCertificates", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const certificates = res.data.data;
            this.setState({ certificates });
          })
      }
      onSubmit(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.get('http://localhost:5000/api/candidates/certificate/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const Certificate = res.data.data;

            console.log(Certificate);
            this.rerender(token,id);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/candidates/certificate/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const certificates = [res.data.data];

            this.setState({ certificates });

            console.log(certificates);

          })

      }

      onSubmit2(id) {
        console.log(id);
        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.post('http://localhost:5000/api/candidates/certificate/'+id, { },
        { headers: {
            Authorization: token
        }


          })

          .then(res => alert("You applied successfully for this certificate"))
          .catch(err=>console.log(err))
           

    }
     
      render() {
        
        return (
          <ul>
             <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Certificate Name</th>
                                <th>Certificate Description</th>
                                <th>Certificate Category</th>
                                <th>Certificate Skills</th>
                                <th>Certificate available</th>
                                <th>Evaluations</th>
                                <th>View</th>
                                <th>Apply</th>
                            </tr>
                        </thead>
            { this.state.certificates.map(person => 
            <tbody>
            <tr >
               <th>{person.name}<br></br></th> 
                <th>{person.description}<br></br></th>   
                <th>{person.category}<br></br></th> 
                <th>{person.skills.map(skill=>
                 <p>
                    skill:{skill}
                  </p>    
                    )}<br></br></th> 
                 <th>{String(person.available)}<br></br></th> 
                <th>{person.evaluationTests.map(evaluation=> 
                     <p>
                        Evaluation Content:{evaluation.evaluationContent}<br></br>
                        Total Score: {evaluation.totalScore}<br></br>
                        evaluationType:{evaluation.evaluationType}<br></br>
                        Passing Score: {evaluation.passingScore}<br></br>
                        Candidate Score: {evaluation.score}<br></br>
                        Passed: {String(evaluation.passed)}<br></br>
                     </p>

                )}</th>

  <th><button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, person._id)}>view Certificate</button><br></br></th> 
 
  <th><button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this,person._id)}>Apply on Certificate</button><br></br></th> 
  </tr>
                           <tr>     
                  </tr>
                            </tbody>
                            )}
                             </Table>
                             <br/>  
             <br/>
             </ul>
        )
      }
    

};