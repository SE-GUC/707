import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");

export default class getallCertificatesCandidate extends Component {

    state = {
        certificates: []
      }
    
      componentDidMount() {
        const cookies= new Cookies();
         const token= cookies.get('token')
        axios.get("http://localhost:5000/api/candidates/get/certificates", {  headers: {
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
                Certificate Name: {person}<br></br> 
            </p>   </li>)}
          </ul>
        )
      }
    

}