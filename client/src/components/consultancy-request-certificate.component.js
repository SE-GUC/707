import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export default class requestCertificate extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const cookies = new Cookies();
    const token = cookies.get("token");
    const certificate = {
      name: this.state.name
    };

    axios
      .post(
        "http://localhost:5000/api/consultancies/certificate",
        certificate,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => alert("Requested Successfully!"))
      .catch(e => {
        alert(e);
      });

    this.setState({
      name: ""
    });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Request New Certificate</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Request" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
