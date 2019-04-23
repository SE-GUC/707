import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Report from "./report.component.js";
import Cookies from "universal-cookie";
export default class candidatereports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reports: []
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
        ReactDOM.render(
          <Report report={report} />,
          document.getElementById("root")
        );
      });
  }
  render() {
    return (
      <ul>
        {this.state.reports.map(report => (
          <li>
            <p>
              Report Title: {report.title}
              <br />
              <br />
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit.bind(this, report._id)}
              >
                View
              </button>
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
