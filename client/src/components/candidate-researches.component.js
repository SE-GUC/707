import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Table from "react-bootstrap/Table";
import Cookies from "universal-cookie";
export default class candidateresearches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      researches: [],
      viewResearch: false,
      research: {}
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype= cookies.get("usertype");
    if(usertype !== "candidate"){
      alert("Invalid Access")
      window.location.replace("/")
    }
    axios
      .get("http://localhost:5000/api/candidates/researches", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const researches = res.data.data;
        this.setState({ researches });
      }).catch(e =>{
        alert(e)
    });
  }
  onSubmit(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/research/" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const research = res.data.data;
        this.setState({viewResearch:true,research:research})
      });
  }
  
  render() {
    if(this.state.viewResearch === true)
 
      return (
        <ul>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Research Title</th>
                <th>Interests</th>
                <th>Research Content</th>
                </tr>
            </thead>
                <tbody>
              
                <td>{this.state.research.title}</td>
                  <td>
                    {" "}
                    {this.state.research.interests.map(interest => (
                      <p>{interest}</p>
                    ))}
                  </td>
                  <td>{this.state.research.Content}</td>
                  </tbody>
              
    </Table>
    </ul>
    );
    else 
    return (
      <ul>
        <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Research Title</th>
                <th>View Research</th>
                </tr>
            </thead>
        {this.state.researches.map(research => (

         <tbody>
                <tr>
            <td>{research.title}</td> 
              
             <td> <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit.bind(this, research._id)}
              >
                View
              </button></td>
            </tr>
            </tbody>
        ))}
        
        </Table>
      </ul>
    );
  }
}
