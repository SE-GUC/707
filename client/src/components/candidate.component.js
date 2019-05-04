import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class getcandidate extends Component {
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
      yearsOfExperience: "",
      skills: "",
      languages: "",
      education: "",
      courses: "",
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
          occupation: res.data.data.occupation,
          education: res.data.data.education,
          contractSigned: res.data.data.contractSigned,
          contactNumbers: res.data.data.contactNumbers,
          interests: res.data.data.interests,
          credits: res.data.data.credits,
          yearsOfExperience: res.data.data.yearsOfExperience,
          skills: res.data.data.skills,
          languages: res.data.data.languages,
          birthdate: res.data.data.birthdate,
          courses: res.data.data.courses
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
  occupationchanged = e => {
    if (e.target.value === "") {
    } else {
      this.setState({
        occupation: e.target.value
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
  interestschanged = e => {
    var interest = e.target.value.split(",");
    this.setState({
      interests: interest
    });
  };
  languageschanged = e => {
    var language = e.target.value.split(",");
    this.setState({
      languages: language
    });
  };
  courseschanged = e => {
    var course = e.target.value.split(",");
    this.setState({
      courses: course
    });
  };
  contactnumberschanged = e => {
    var contactnumber = e.target.value.split(",");
    this.setState({
      contactNumbers: contactnumber
    });
  };
  educationchanged = e => {
    this.setState({
      education: e.target.value
    });
  };
  yofchanged = e => {
    this.setState({
      yearsOfExperience: e.target.value
    });
  };
  updateinfo = () => {
    let updated;
    if (this.state.password === "") {
      updated = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        occupation: this.state.occupation,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests,
        yearsOfExperience: this.state.yearsOfExperience,
        birthdate: this.state.birthdate,
        education: this.state.education,
        languages: this.state.languages,
        courses: this.state.courses
      };
    } else {
      updated = {
        name: this.state.name,
        email: this.state.email,
        address: this.state.address,
        occupation: this.state.occupation,
        contractSigned: this.state.contractSigned,
        contactNumbers: this.state.contactNumbers,
        interests: this.state.interests,
        yearsOfExperience: this.state.yearsOfExperience,
        birthdate: this.state.birthdate,
        education: this.state.education,
        languages: this.state.languages,
        courses: this.state.courses,
        password: this.state.password
      };
    }
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .put("http://localhost:5000/api/profiles/candidate", updated, {
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
      .delete("http://localhost:5000/api/profiles/candidate", {
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
            <label>Education: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.education}
              onChange={e => this.educationchanged(e)}
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
            <label>Courses: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.courses}
              onChange={e => this.courseschanged(e)}
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
            <label>Languages: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.languages}
              onChange={e => this.languageschanged(e)}
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
