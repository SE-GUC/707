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
  

  updateinfo = () => { 
    let updated = {
      name: this.state.name,
      email: this.state.email
    };
    const cookies = new Cookies();
    const token = cookies.get("token");

    axios
      .put("http://localhost:5000/api/profiles/admin", updated, {
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
      .delete("http://localhost:5000/api/profiles/admin", {
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
