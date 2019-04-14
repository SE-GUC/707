import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class updateCertificate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      temp:'',
      certificates: [],
      updatedCertificate:{
            name: '',
            description: '',
            category: '',
            skills:[],
            available:''
      }
    }
}
 
      onChangeCertificateName(certificate,e) {
        certificate.name=e.target.value;        
        this.setState({
            updatedCertificate:{
              name: certificate.name,
              description: certificate.description,
              category: certificate.category,
              skills:certificate.skills,
              available:certificate.available
              
         } });
    }
    onChangeCertificateDescription(certificate,e) {
        certificate.description=e.target.value;        
      this.setState({
        updatedCertificate:{
            name: certificate.name,
            description: certificate.description,
            category: certificate.category,
            skills:certificate.skills,
            available:certificate.available
            
       } });
  }
  onChangeCategory(certificate,e) {
   
    certificate.category=e.target.value;        
    this.setState({
        updatedCertificate:{
            name: certificate.name,
            description: certificate.description,
            category: certificate.category,
            skills:certificate.skills,
            available:certificate.available
            
       } });
           
        }
        onChangeSkills(certificate,e) {
          this.setState({
            temp:e.target.value
          })      
          certificate.skills=this.state.temp.split(',');
          this.setState({
            updatedCertificate:{
                name: certificate.name,
                description: certificate.description,
                category: certificate.category,
                skills:certificate.skills,
                available:certificate.available
                
           } });
                 
              }
        save(e,certificate,foo) {
          const Req=certificate.skills;
          console.log(Req);
          console.log(foo);
         Req.push(foo);
         certificate.skills.push(foo);
         this.setState({
            updatedCertificate:{
                name: certificate.name,
                description: certificate.description,
                category: certificate.category,
                skills:certificate.skills,
                available:certificate.available
                
           } });
       }
        onChangeAvaliable(certificate,e) {
         
            certificate.available=e.target.value;        
          this.setState({
            updatedCertificate:{
                name: certificate.name,
                description: certificate.description,
                category: certificate.category,
                skills:certificate.skills,
                available:certificate.available
                
           } });
                 
              }
      componentDidMount() {
         const cookies = new Cookies();
         const token= cookies.get('token')
        axios.get('http://localhost:5000/api/admins/certificates', { headers: {
            Authorization: token}
          })
          .then(res => {
            const certificates = res.data.data;
            this.setState({ certificates });
          })
      }
      rerender(token) {
       axios.get('http://localhost:5000/api/admins/certificates', { headers: {
           Authorization: token}
         })
         .then(res => {
           const certificates = res.data.data;
           this.setState({ certificates });
         })
     }
   async updateCertificate(e,certificate){
       const cookies=new Cookies();
       const token= cookies.get('token');
       var words = this.state.temp.split(',');
       if(this.state.temp){
        certificate.skills=words
       }
 let certificate2={
    name: certificate.name,
    description: certificate.description,
    category: certificate.category,
    skills:certificate.skills,
    available:certificate.available,
    evaluationTests:certificate.evaluationTests
 }
    console.log(this.state.updatedCertificate.description);
    console.log(this.state.updatedCertificate.name);
    console.log(certificate._id);
       axios.put('http://localhost:5000/api/admins/certificate/'+certificate._id,certificate2,{ headers: {
        Authorization: token}});
        alert("You updated the certificate successfully ")
        //this.rerender(token);

   }

      render() {
        return (
          <ul>
            { this.state.certificates.map(certificate => <li>
                <p>Certificate Name: {certificate.name}<br></br>
                Certificate Description:{certificate.description}<br></br>
                Certificate Category: {certificate.category}<br></br>
                Skills: {certificate.skills}<br></br>
                Available:{certificate.available}<br/>
              
               <div className="form-group"> 
                        <label>Certificate Name: </label>
                        <input  type="text"
                                className="content-editable"
                                value={certificate.name}
                                onChange={(e) => this. onChangeCertificateName(certificate, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label> Certificate Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={certificate.description}
                                onChange={(e) => this.onChangeCertificateDescription(certificate, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Certificate Category: </label>
                        <input  type="text"
                                className="form-control"
                                value={certificate.category}
                                onChange={(e) => this.onChangeCategory(certificate, e)}
                                />
                    </div>               
                            <div className="list">
              <h1> Skills</h1>
              {certificate.skills.map(skills=> {
                      return <li>{skills}</li>
                 })}
              <form name="myForm"> 
              <input  type="text"
                                className="form-control"
                                value={certificate.skills}
                                onChange={(e) => this.onChangeSkills(certificate, e)}
                                />
              <ul>
             
               
              </ul>
              </form>
            </div>
                           
                      
               <button type='update' onClick={(event)=>this.updateCertificate(event,certificate)}>Update</button><br/>
            </p>   </li>)}

          </ul>
        )
      }
    };