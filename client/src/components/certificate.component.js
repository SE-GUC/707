
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form'

const axios = require("axios");

export default class getallcertificate extends Component {
   
  state = {
        certificates: [],
        evaluations:[],
        evaluationContent:'',
        evaluationType:'',
        evaluationTotalScore:0,
        evaluationPassingScore:0
      }
      onChangeEvalContent(e) {
        this.setState({
          evaluationContent: e.target.value
        });
      }
      onChangeEvalType(e) {
        this.setState({
          evaluationType: e.target.value
        });
      }
      onChangeTotalScore(e) {
        this.setState({
          evaluationTotalScore: e.target.value
        });
      }
      onChangePassingScore(e) {
        this.setState({
          evaluationPassingScore: e.target.value
        });
      }

      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/admins/certificates", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const certificates = res.data.data;
            this.setState({ certificates });
          })
      }
      rerender3(token) {
        axios.get("http://localhost:5000/api/admins/certificates", {  headers: {
          Authorization: token}
        })
          .then(res => {
            const certificates = res.data.data;
            this.setState({ certificates });
          })
      }
      showAllEvaluations = id =>{
        window.location.replace("/viewEvaluationbyId_Admin/"+id)
      };
      onSubmit(id) {
        
                const cookies = new Cookies();
        
                const token= cookies.get('token');
        
                console.log(token)
        
                axios.get('http://localhost:5000/api/admins/certificate/'+ id, { headers: {
        
                    Authorization: token}
        
                  })
        
                  .then(res => {
        
                    const Certificate = res.data.data;
        
                    console.log(Certificate);
                    this.rerender(token,id);
        
                  })
        
            }
      onSubmit3(id) {

        const cookies = new Cookies();

        const token= cookies.get('token');
        let Eval={
          evaluationContent:this.state.evaluationContent,
          totalScore:this.state.evaluationTotalScore,
          passingScore:this.state.evaluationPassingScore,
          evaluationType:this.state.evaluationType
        }
        console.log(Eval)

        axios.post('http://localhost:5000/api/admins/certificate/evaluationTests/'+ id,Eval, { headers: {

            Authorization: token}

          })

          .then(res => {

            

            console.log(res.data);
            this.rerender3(token);

          })

    }
    rerender(token,id) {
        axios.get('http://localhost:5000/api/admins/certificate/'+id, { headers: {

            Authorization: token}

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

            Authorization: token}

          })

          .then(res => {

            const deletedCertificate = res.data.data;
            alert("You deleted this certificate successfully  ");
           
            this.rerender2(token);
          })

    }

    rerender2(token) {
        axios.get('http://localhost:5000/api/admins/certificates', { headers: {

            Authorization: token}

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
                
                Certificate Name: {person.name}<br></br>   
                Certificate Description: {person.description}<br></br>  
                Certificate Category: {person.category}<br></br> 
                Certificate Skills:{person.skills.map(skill=>
                 <p>
                    skill:{skill}
                  </p>    
                    )}<br></br> 
                Certificate available: {String(person.available)}<br></br> 
                 Evaluations:{person.evaluationTests.map(evaluation=> (
                <div key={evaluation._id}>

</div>
 )
  )}
                
                <Form>
                     <Form.Row>
                       <Form.Group as={Col} controlId="formGridContent">
                         <Form.Label>Evaluation Content</Form.Label>
                         <Form.Control type="text" placeholder="Write brief description about the evaluation" 
                         onChange={e => this.onChangeEvalContent(e)}/>
 
                       </Form.Group>

                     </Form.Row>


                     <Form.Row>
                   
                       <Form.Group as={Col} controlId="formGridType">
                         <Form.Label>Type</Form.Label>
                         <Form.Control as="select"  onChange={e => this.onChangeEvalType(e)}>
                           <option>Choose...</option>
                           <option>MCQ</option>
                           <option>Complete</option>
                           <option>TrueFalse</option>
                           <option>Mixed</option>
                           <option>Project</option>
                           <option>Meeting</option>
                           <option>Another</option>

                         </Form.Control>
                       </Form.Group>
                       </Form.Row>

                       <Form.Row>

                       <Form.Group as={Col} controlId="formGridTotal">
                         <Form.Label>Total Score</Form.Label>
                         <Form.Control  onChange={e => this.onChangeTotalScore(e)}/>
                       </Form.Group>
                       <Form.Group as={Col} controlId="formGridPassing">
                         <Form.Label>Passing Score</Form.Label>
                         <Form.Control  onChange={e => this.onChangePassingScore(e)}/>
                       </Form.Group> 
                     </Form.Row>
                   
                   <Form.Row>
                   <Form.Group as={Col} controlId="formGridCreateEval">
                   <button type="button" className="btn btn-danger" onClick={this.onSubmit3.bind(this, person._id)}>Add Evaluation</button><br></br> 
                     </Form.Group> 
                     &nbsp;  &nbsp;
                     <Form.Group as={Col} controlId="formGridViewCert">
                     <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, person._id)}>view Certificate</button><br></br> 
                     </Form.Group> 
                     &nbsp;  &nbsp;
                     <Form.Group as={Col} controlId="formShowAllCertificates">
                     <button type="button" className="btn btn-danger" onClick={this.showAllEvaluations.bind(this, person._id)}>Show All Evaluations Information</button>
                     </Form.Group> 
                     &nbsp;  &nbsp;
                     <Form.Group as={Col} controlId="formDeleteCert">
                     <button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this, person._id)}>Delete</button>
                     </Form.Group> 
                     </Form.Row>
                   </Form>
                  

              
             <br/>  
             <br/>

                
             </li>)}
          </ul>
        )
      }
    

};