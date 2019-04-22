
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table';
const axios = require("axios");

export default class getallcertificate extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSkills2=this.onChangeSkills2.bind(this);
    this.onAvaliable = this.onAvaliable.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



   
  this.state = {
        certificates: [],
        certificate:{},
        evaluations:[],
        evaluationContent:'',
        evaluationType:'',
        evaluationTotalScore:0,
        evaluationPassingScore:0,
        certificateName:'',
        certificateDescription:'',
        tempSkills:'',
        certificateCategory:'',
        skills:[],
        contexteditable:false,
        createEvaluation:false,
        createCertificate:false,
        name: '',
        description: '',
        category: '',
        Cskills:'',
        Cavailable:'' 
      }}
      onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeCategory(e) {
        this.setState({
            category: e.target.value
        });
    }
    onChangeSkills2(e) {

        this.setState({
            Cskills: e.target.value
        });
    }
    onAvaliable(e) {

        this.setState({
            Cavailable: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        
        console.log(`certificate submitted:`);
        console.log(`Name: ${this.state.name}`);
        console.log(`description: ${this.state.description}`);
        console.log(`category: ${this.state.category}`);
        const certificate = {
            name: this.state.name,
            description: this.state.description,
            category: this.state.category,
            skills:this.state.Cskills,
            available:this.state.Cavailable,
        };
         const cookies= new Cookies();
         const token= cookies.get('token')
        axios.post("http://localhost:5000/api/admins/certificate",certificate ,{  headers: {
            Authorization: token}
          })
            .then(res => alert("You created a certificate successfully "));
            this.setState({
                name: '',
                description: '',
                category: '',
                Cskills:'',
                Cavailable:''
            })
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
      onChangeCertificateName(e) {
       
        this.setState({
   
              name: e.target.value,
 });
    }
    onChangeCertificateDescription(e) {
      this.setState({
       
            description: e.target.value
            
        });
  }
  onChangeCategory(e) {
   
    this.setState({
      category: e.target.value
      
  });
           
        }
        onChangeSkills(e) {
          this.setState({
            tempSkills:e.target.value
          })      
  
                 
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
      onSubmit4(id) {
        
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
          content:this.state.evaluationContent,
          totalScore:this.state.evaluationTotalScore,
          passingScore:this.state.evaluationPassingScore,
          type:this.state.evaluationType
        }
        console.log(Eval)

        axios.post('http://localhost:5000/api/admins/certificate/evaluationTests/'+ id,Eval, { headers: {

            Authorization: token}

          })

          .then(res => {

           

            console.log(res.data);
            window.location.reload();

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
      async updateCertificate(certificate){
        const cookies=new Cookies();
        const token= cookies.get('token');
        if (!this.state.contexteditable){
       

                    this.setState({
                       certificate:certificate,
                        contexteditable: true,
                        certificateName:certificate.name,
                        certificateDescription:certificate.description,
                        certificateCategory:certificate.category,
                        skills:certificate.skills

                    });
                    console.log(this.state);
                    


        }else{
          var words = this.state.tempSkills.split(',');
          if(this.state.tempSkills){
           this.setState({
             skills:words
           })
          }
         let certificate2={
         name: this.state.name,
         description: this.state.description,
         category: this.state.category,
         skills:this.state.skills,
        
    }

       console.log(certificate._id);
          axios.put('http://localhost:5000/api/admins/certificate/'+certificate._id,certificate2,{ headers: {
           Authorization: token}}).then(res => {
            this.setState({
              name: '',
              description: '',
              category: '',
              skills:'',
              available:'',
              contexteditable: false
            })
            alert("You updated the certificate successfully ")
            console.log(res.data.data);
            window.location.reload();
        })
           
        }
        }
       async newEvaluation(certificate) {
         this.setState({certificate:certificate,
        createEvaluation:true})
       }
       async CreateCertificate(){
        this.setState({createCertificate:true})
       }
    

     
      render() {
       
        if(this.state.createCertificate){
          return (
            
            
            <div style={{marginTop: 10}}>
                <h3>Create New Certificate</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeName}
                                />
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                />
                    </div>
                    <div className="form-group">
                    <label>Category: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.category}

                                    onChange={this.onChangeCategory}
                                    />
                            
                        </div>
                        <div className="form-group">
                    <label>Skills: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.Cskills}

                                    onChange={this.onChangeSkills2}
                                    />
                            
                        </div>
                        <div className="form-group">
                        <label>Avaliable: </label>
                            <input   type="text" 
                                    className="form-control"
                                    value={this.state.available}

                                    onChange={this.onAvaliable}
                                    />
                            
                        </div>
                      
                        
                           
                            
                      
                       
                   

                    <div className="form-group">
                        <input type="submit" value="Create Certificate" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    
        }
       else{
        if (!this.state.contexteditable && !this.state.createEvaluation)
        return (
          <ul>
            <button type="button" className="btn btn-danger" onClick={this.CreateCertificate.bind(this)}>Create Certificate</button>
            <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Certificate Name</th>
                                <th>Certificate Description</th>
                                <th>Certificate Category</th>
                                <th>Certificate Skills</th>
                                <th>Certificate available</th>
                                <th>Evaluations</th>
                                <th>New Evaluation</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                <th>View</th>
                            </tr>
                        </thead>
            { this.state.certificates.map(person => 
            <tbody>
            <tr >
                <td >{person.name}</td>
                <td> {person.description}</td>
                <td> {person.category}</td>
                <td>{person.skills.map(skill=>
                 <p>
                    skill:{skill}
                  </p>    
                    )}</td>
                   <td>{String(person.available)}</td> 
                   <td> 
 <button type="button" className="btn btn-danger" onClick={this.showAllEvaluations.bind(this, person._id)}>Show All Evaluations Information</button>


</td>
         <td><button type='button' onClick={this.newEvaluation.bind(this,person)}>New Evaluation</button><br/></td>
        <td><button type='update' onClick={this.updateCertificate.bind(this,person)}>Edit</button><br/></td>
       <td><button type="button" className="btn btn-danger" onClick={this.onSubmit2.bind(this, person._id)}>Delete</button></td>
       <td><button type="button" className="btn btn-danger" onClick={this.onSubmit4.bind(this,person._id)}>View</button><br></br></td>
                                </tr>
                           <tr>     
                  </tr>
                            </tbody>
                            
                        )}
                    </Table>
              
             <br/>  
             <br/>
             </ul>
        );
          else
          if(this.state.contexteditable)
          return (
            <Form>
                <Form.Group controlId="formName">
                    <Form.Label>Certificate Name</Form.Label>
                    <Form.Control type="text" placeholder={this.state.certificateName} onChange={e => this.onChangeCertificateName(e)}/>
                    <Form.Text className="text-muted">
                        Please Enter the content to update</Form.Text>
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Certificate Description</Form.Label>
                    <Form.Control type="text" placeholder={this.state.certificateDescription} onChange={e => this.onChangeCertificateDescription(e)} />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Certificate Category</Form.Label>
                    <Form.Control type="text" placeholder={this.state.certificateCategory} onChange={e => this.onChangeCategory(e)} />
                </Form.Group>
                <Form.Group controlId="formSkills">
                    <Form.Label>Certificate Skills</Form.Label>
                    <Form.Control type="text" placeholder={this.state.skills} onChange={e => this.onChangeSkills(e)} />
                </Form.Group>
                <button id="btn1" onClick={this.updateCertificate.bind(this,this.state.certificate)}>Edit</button>


            </Form>
        );  
        else
        return(
          <Form>
                     <Form.Row>
                       <Form.Group as={Col} controlId="formGridContent">
                         <Form.Label>Evaluation Content</Form.Label>
                         <Form.Control type="text" placeholder="Write a berif description about the evaluation" 
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
                    <button type="button" className="btn btn-danger" onClick={this.onSubmit3.bind(this, this.state.certificate._id)}>Add Evaluation</button><br></br>
                     </Form.Group> 
                     &nbsp;  &nbsp;
                     <Form.Group as={Col} controlId="formGridViewCert">
                     {/* <button type="button" className="btn btn-danger" onClick={this.onSubmit.bind(this, person._id)}>view Certificate</button><br></br>  */}
                     </Form.Group> 
                     </Form.Row>
                   </Form>
        )   
         
      }
}

};
