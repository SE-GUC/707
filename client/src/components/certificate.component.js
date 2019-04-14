
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getallcertificate extends Component {
    state = {
        certificates: [],
        evaluations:[]
      }
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/admins/certificates", {  headers: {
          Authorization: token.data}
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

        axios.get('http://localhost:5000/api/admins/certificate/'+ id, { headers: {

            Authorization: token.data}

          })

          .then(res => {

            const Certificate = res.data.data;

            console.log(Certificate);
            this.rerender(token,id);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/admins/certificate/'+id, { headers: {

            Authorization: token.data}

          })


          .then(res => {
            const certificates = [res.data.data];

            this.setState({ certificates });

            console.log(certificates);

          })

      }
      onSubmit2(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');

        console.log(token)

        axios.delete('http://localhost:5000/api/admins/certificate/'+ id, { headers: {

            Authorization: token.data}

          })

          .then(res => {

            const deletedCertificate = res.data.data;
            alert("You deleted this certificate successfully  ");
           
            this.rerender2(token);
          })

    }

    rerender2(token) {
        axios.get('http://localhost:5000/api/admins/certificates', { headers: {

            Authorization: token.data}

          })

          .then(res => {
            const certificates = res.data.data;

            this.setState({ certificates });

            console.log(certificates);

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
                Certificate Skills:{person.skills.map(skill=>
                 <p>
                    skill:{skill}
                  </p>    
                    )}<br></br> 
                Certificate available: {String(person.available)}<br></br> 
                 Evaluations:{person.evaluationTests.map(evaluation=> 
                     <p>
                        Evaluation Content:{evaluation.evaluationContent}<br></br>
                        Total Score: {evaluation.totalScore}<br></br>
                        evaluationType:{evaluation.evaluationType}<br></br>
                        Passing Score: {evaluation.passingScore}<br></br>
                        Candidate Score: {evaluation.score}<br></br>
                        Passed: {String(evaluation.passed)}<br></br>
                     </p>

                )}
                <br/>
             <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, person._id)}>view Certificate</button><br></br> 
             <br/>
             <button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this, person._id)}>Delete</button>

                
            </p>   </li>)}
          </ul>
        )
      }
    

};