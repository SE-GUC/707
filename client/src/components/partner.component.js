import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class getpartner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      type: "",
      birthdate: "",
      occupation: "",
      contractSigned: "",
      contactNumbers: "",
      interests: "",
      credits: "",
      password: ""
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/profiles", {
        headers: {
          Authorization: token
        }
      })
      .then(res =>
        this.setState({
          name: res.data.data.name,
          email: res.data.data.email,
          address: res.data.data.address,
          type: res.data.data.usertype,
          birthdate: res.data.data.birthdate,
          occupation: res.data.data.occupation,
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits
        })
      );
  }
  passwordchanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        password: e.target.value
      });
    }
  };
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
  birthdatechanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        birthdate: e.target.value
      });
    }
  };
  occupationchanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        occupation: e.target.value
      });
    }
  };
  interestschanged = e => {
    var interest = e.target.value.split(",");
    this.setState({
      interests: interest
    });
  };
  contactnumberschanged = e => {
    var contactnumber = e.target.value.split(",");
    this.setState({
      contactNumbers: contactnumber
    });
  };
  updateinfo = () => {
    let updated;
    if (this.state.password === "") {
      updated = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        birthdate: this.state.birthdate,
        occupation: this.state.occupation,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests
      };
    } else {
      updated = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        birthdate: this.state.birthdate,
        occupation: this.state.occupation,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests,
        password: this.state.password
      };
    }
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/partner", updated, {
        headers: {
          Authorization: token
        }
      })
      .then(res => this.setState({}));
    alert("Updated successuflly");
  };
  deleteprofile = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/profiles/partner", {
        headers: {
          Authorization: token
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
          <br />
          <label>Contract Signed: {String(this.state.contractSigned)}</label>
          <br />
          <label>Credits: {String(this.state.credits)}</label>
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
            <label>Birthdate: {this.state.birthdate}</label>
            <input
              type="date"
              className="form-control"
              value={Date(this.state.birthdate)}
              onChange={e => this.birthdatechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Occupation: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.occupation}
              onChange={e => this.occupationchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Interests: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.interests}
              onChange={e => this.interestschanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Contact numbers: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.contactNumbers}
              onChange={e => this.contactnumberschanged(e)}
            />
          </div>
          <div className="form-group">
            <label>password: (type in case you want to update it) </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.passwordchanged(e)}
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
