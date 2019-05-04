import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
export default class getprojectbyID_cons extends Component {
  state = {
    projects: []
  };

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/consultancies/projects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const projects = res.data.data;
        this.setState({ projects });
      });
  }
  onSubmit(id) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .get("http://localhost:5000/api/consultancies/project/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const projects = res.data.data;
        this.setState({ projects: [projects] });
        console.log(projects);
        this.rerender(token, id);
      });
  }
  rerender(token, id) {
    axios
      .get("http://localhost:5000/api/consultancies/project/" + id, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const projects = [res.data.data];
        this.setState({ projects });
        console.log(projects);
      });
  }
  render() {
    return (
      <ul>
        {this.state.projects.map(person => (
          <li>
            <p>
              Project name: {person.name}
              <br />
              Project description: {person.description}
              <br />
              Project type: {person.type}
              <br />
              Project deadline: {String(person.deadline)}
              <br />
              Project hours: {String(person.hours)}
              <br />
              Project minimum credit hours: {String(person.minCreditsHour)}
              <br />
              Project maximum credit hours: {String(person.maxCreditsHour)}
              <br />
              Project Chosen Credit Hour: {String(person.chosenCreditHour)}
              <br />
              Project Credits Penalty: {String(person.creditsPenalty)}
              <br />
              Project required years of experience:{" "}
              {String(person.yearsOfExperience)}
              <br />
              Project Contract signed: {String(person.contractSigned)}
              <br />
              Project status: {String(person.status)}
              <br />
              <button
                type="button"
                className="btn btn-success"
                onClick={this.onSubmit.bind(this, person._id)}
              >
                Get project
              </button>
              <br />
            </p>{" "}
          </li>
        ))}
      </ul>
    );
  }
}
