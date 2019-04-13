import React, { Component } from "react";
import Cookies from "universal-cookie";
const axios = require("axios");
export default class getconsultancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      type: ""
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/profiles/consultancy", {
        headers: {
          Authorization: token.data
        }
      })
      .then(res =>
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
          address: res.data.data.address,
          type: res.data.data.usertype
        })
      );
  }
  namechanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        name: e.target.value
      });
    }
  };
  emailchanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        email: e.target.value
      });
    }
  };
  addresschanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        address: e.target.value
      });
    }
  };
  updateinfo = () => {
    let updated = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address
    };
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/consultancy", updated, {
        headers: {
          Authorization: token.data
        }
      })
      .then(res => this.setState({}));
    alert("Updated successuflly");
  };
  deleteprofile = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/profiles/consultancy", {
        headers: {
          Authorization: token.data
        }
      })
      .then(res => this.setState({}));
    alert("deleted successuflly");
  };
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Your profile Info</h3>
        <form onSubmit={this.onSubmit}>
          <label>User type: {this.state.type}</label>
          <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={e => this.namechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.email}
              onChange={e => this.emailchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Address: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.address}
              onChange={e => this.addresschanged(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Update info"
              className="btn btn-primary"
              onClick={this.updateinfo}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Delete my profile"
              className="btn btn-primary"
              onClick={this.deleteprofile}
            />
          </div>
        </form>
      </div>
    );
  }
}
