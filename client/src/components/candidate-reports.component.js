import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Report from "./report.component.js";
import Table from "react-bootstrap/Table";
import Cookies from "universal-cookie";
export default class candidatereports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: [],
      viewReport: false,
      report: {}
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/reports", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const reports = res.data.data;
        this.setState({ reports });
      }).catch(e =>{
        alert(e)
    });
  }
  onSubmit(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/candidates/report/" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const report = res.data.data;
        this.setState({viewReport:true,report:report})
      });
  }
  
  render() {
    if(this.state.viewReport === true)
 
      return (
        <ul>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Interests</th>
                <th>Report Content</th>
                </tr>
            </thead>
                <tbody>
              
                <td>{this.state.report.title}</td>
                  <td>
                    {" "}
                    {this.state.report.interests.map(interest => (
                      <p>{interest}</p>
                    ))}
                  </td>
                  <td>{this.state.report.Content}</td>
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
                <th>Report Title</th>
                <th>View Report</th>
                </tr>
            </thead>
        {this.state.reports.map(report => (

         <tbody>
                <tr>
            <td>{report.title}</td> 
              
             <td> <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit.bind(this, report._id)}
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
