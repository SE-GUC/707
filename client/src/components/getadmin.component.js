import React, { Component } from "react";
import Cookies from "universal-cookie";
const axios = require("axios");
export default class getadmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: ""
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/profiles", {
        headers: {
          Authorization: token.data
        }
      })
      .then(res =>
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email
        })
      );
  }
  onKeyPress = e => {
    const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (e.target.value === "" || !regEx.test(e.target.value)) {
    } else {
      this.setState({
        name: this.state.name,
        email: e.target.value
      });
    }
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Your profile Info</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onchange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={e => this.onKeyPress(e)}
            />
          </div>
        </form>
      </div>
    );
  }
}
