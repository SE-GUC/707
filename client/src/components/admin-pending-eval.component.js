import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
export default class evaluations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certificates:[],
      pendingEvaluations: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/admins/certificates", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const certificates = res.data.data;
        this.setState({ certificates });
      });
  }
  
  getAnswers(certId, evalId) {
      console.log(certId)
      console.log(evalId)
      
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/admins/candidate/pendingCertificates/"+certId+"/"+evalId, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        console.log(res.data.data)
        return res.data.data
      })
      .catch(e =>{
          alert(e)
      });
  }

  
  
  render() {
    return (
      <Router>
        <ul>
          {this.state.certificates.map(certificate => (
            <li>
              <p>
              Certificate Name: {certificate.name}<br></br>  
                 <br />
                Evaluations: {certificate.evaluationTests.map(eval1 => 
                (
                    <p>
                        Answer: <br></br>
                        {this.getAnswers(eval1._id,certificate._id)}
                    </p>
                ))              
               
                }
              
                
                <br />
                
              </p>
            </li>
          ))}
        </ul>
      </Router>
    );
  }
}
