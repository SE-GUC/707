import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import AdminTasks from "./admin-tasks.component.js";
export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/admins/projects", {
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
    axios
      .delete("http://localhost:5000/api/admins/project/" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const deletedProject = res.data.data;
        this.rerender(token);
      });
  }
  viewTasks(projectID) {
    ReactDOM.render(
      <AdminTasks projectID={projectID} />,
      document.getElementById("root")
    );
  }
  rerender(token) {
    axios
      .get("http://localhost:5000/api/admins/projects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const projects = res.data.data;
        this.setState({ projects });
      });
  }
  render() {
    return (
      <Router>
        <ul>
          {this.state.projects.map(project => (
            <li>
              <p>
                Name: {project.name}
                <br />
                Description: {project.description}
                <br />
                Type: {project.type}
                <br />
                Deadline: {project.deadline}
                <br />
                Hours: {project.hours}
                <br />
                Min Credits/Hr: {project.minCreditsHour}
                <br />
                Max Credits/Hr: {project.maxCreditsHour}
                <br />
                Chosen Credit Hour: {project.chosenCreditHour}
                <br />
                Penalty: {project.creditsPenalty}
                <br />
                Years of Experience: {project.yearsOfExperience}
                <br />
                Contract Signed: {project.contractSigned}
                <br />
                Required Skills:{" "}
                {project.requiredSkills.map(requiredSkills => (
                  <li>{requiredSkills}</li>
                ))}
                <br />
                Status: {project.status} <br />
                Life Cycle:{" "}
                {project.projectcycle.map(cycle => (
                  <li>
                    Description: {cycle.description}
                    <br />
                    Status: {cycle.status}
                    <br />
                    Percentage: {cycle.percentage}
                  </li>
                ))}
                <br />
                <NavLink
                  to={`tasks/${project._id}`}
                  onClick={this.viewTasks.bind(this, project._id)}
                >
                  View Tasks
                </NavLink>
                <br />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.onSubmit.bind(this, project._id)}
                >
                  Delete
                </button>
              </p>
            </li>
          ))}
        </ul>
      </Router>
    );
  }
}
