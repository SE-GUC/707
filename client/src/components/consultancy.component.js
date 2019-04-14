import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class getconsultancy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      type: "",
      contractSigned: "",
      contactNumbers: "",
      interests: "",
      credits: "",
      establishmentDate: "",
      profession: "",
      yearsOfExperience: "",
      skills: "",
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
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits,
          establishmentDate: res.data.data.establishmentDate,
          profession: res.data.data.profession,
          yearsOfExperience: res.data.data.yearsOfExperience,
          skills: res.data.data.skills
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
  passwordchanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        password: e.target.value
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
  yofchanged = e => {
    this.setState({
      yearsOfExperience: e.target.value
    });
  };
  professionchanged = e => {
    this.setState({
      profession: e.target.value
    });
  };
  establishchanged = e => {
    this.setState({
      establishmentDate: e.target.value
    });
  };
  updateinfo = () => {
    if (this.state.password === "") {
      var updated = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests,
        contactNumbers: this.state.contactNumbers,
        establishmentDate: this.state.establishmentDate,
        profession: this.state.profession,
        yearsOfExperience: this.state.yearsOfExperience
      };
    } else {
      var updated = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests,
        contactNumbers: this.state.contactNumbers,
        establishmentDate: this.state.establishmentDate,
        profession: this.state.profession,
        yearsOfExperience: this.state.yearsOfExperience,
        password: this.state.password
      };
    }
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/consultancy", updated, {
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
      .delete("http://localhost:5000/api/profiles/consultancy", {
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
          <br />
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
            <label>password: (type in case you want to update it) </label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.passwordchanged(e)}
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
            <label>Years of Experience: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.yearsOfExperience}
              onChange={e => this.yofchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Profession: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.profession}
              onChange={e => this.professionchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Establishment date: {this.state.establishmentDate}</label>
            <input
              type="date"
              className="form-control"
              value={this.state.establishmentDate}
              onChange={e => this.establishchanged(e)}
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
            <label>Skills: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.skills}
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
