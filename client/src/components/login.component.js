import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import ReactDOM from "react-dom";
import App from "../App.js";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
export default class Loginuser extends Component {
  constructor(props) {
    super(props);
    this.onChangeuserEmail = this.onChangeuserEmail.bind(this);
    this.onChangeuserPassword = this.onChangeuserPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }
  onChangeuserEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  onChangeuserPassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    const cookies = new Cookies();
    axios
      .post("http://localhost:5000/api/login", user)
      .then(res => {
        if (res.status == 200) {
          this.setState({ redirect: true });
          cookies.set("token", res.data.data.token);
          if (res.data.data.user.usertype !== undefined)
            cookies.set("usertype", res.data.data.user.usertype);
          else cookies.set("usertype", "admin");
          console.log(cookies.get("token"));
          console.log(cookies.get("usertype"));
        }
      })
      .catch(e => {
        alert(e);
      });
    this.setState({
      email: "",
      password: ""
    });
  }
  renderRedirect = () => {
    if (this.state.redirect === true) {
      this.setState({ redirect: false });
      window.location.replace("/");
    }
  };
  render() {
    return (
      <Router>
        <div style={{ marginTop: 10 }}>
          <h3>Login</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeuserEmail}
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <input
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.onChangeuserPassword}
              />
            </div>
            <div className="form-group">
              <input
                type="submit"
                value="Login"
                className="btn btn-primary"
                onClick={this.renderRedirect()}
              />
            </div>
          </form>
        </div>
      </Router>
    );
  }
}
