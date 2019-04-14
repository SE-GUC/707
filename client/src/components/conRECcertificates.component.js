import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getallcertificateRecConsultancy extends Component {
    state = {
        certificates: [],
        evaluations:[]
      }
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/consultancies/recommendedCertificates", {  headers: {
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

        axios.get('http://localhost:5000/api/consultancies/certificate/'+ id, { headers: {

            Authorization: token}

          })

          .then(res => {

            const Certificate = res.data.data;

            console.log(Certificate);
            this.rerender(token,id);

          })

    }
    onSubmit2(id) {
      console.log(id);
      const cookies = new Cookies();

      const token= cookies.get('token');

      console.log(token)

      axios.post('http://localhost:5000/api/consultancies/certificate/'+id, { },
      { headers: {
          Authorization: token
      }


        })

        .then(res => alert("You applied successfully for this certificate"))
        .catch(err=>console.log(err))
         

  }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/consultancies/certificate/'+id, { headers: {

            Authorization: token}

          })


          .then(res => {
            const certificates = [res.data.data];

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
      <button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this,person._id)}>Apply on Certificate</button><br></br>     
            </p>   </li>)}
          </ul>
        )
      }
    

};