import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";
export default class partnerapprovedprojects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: false,
      projects: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype = cookies.get("usertype");
    if (usertype !== "partner") {
      alert("Invalid access");
      window.location.replace("/");
    }
    axios
      .get("http://localhost:5000/api/partners/approvedProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const projects = res.data.data;
        this.setState({ projects });
      });
  }

  showconsultancy = id => {
    window.location.replace("/partnershowconsultancy/" + id);
  };
  showassignedconsultancy = id => {
    window.location.replace("/saconsultancy/" + id);
  };
  showtasks = id => {
    window.location.replace("/partnershowtaskss/" + id);
  };
  getProject(Projectid) {
    const cookies = new Cookies();

    const token = cookies.get("token");

    console.log(token);

    axios
      .get("http://localhost:5000/api/partners/project/" + Projectid, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const projects = res.data.data;
        this.setState({ projects: [projects], flag: true });
        console.log(projects);

        this.rerender2(token, Projectid);
      });
  }

  rerender2(token, Projectid) {
    axios
      .get("http://localhost:5000/api/partners/project/" + Projectid, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const projects = [res.data.data];
        this.setState({ projects });
      });
  }

  render() {
    if (!this.state.flag) {
      return (
        <ul>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Show Tasks</th>
                <th>Show Applied Consultancies</th>
                <th>Show Assigned Consultancy</th>
                <th>Get project</th>
              </tr>
            </thead>
            {this.state.projects.map(project => (
              <tbody>
                <tr>
                  <td>{project.name}</td>
                  <td> {project.description}</td>
                  <td>
                    <input
                      type="submit"
                      value="Show Tasks"
                      className="btn btn-primary"
                      onClick={this.showtasks.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Show Applied Consultancies"
                      className="btn btn-primary"
                      onClick={this.showconsultancy.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="submit"
                      value="Show assigned consultancy"
                      className="btn btn-primary"
                      onClick={this.showassignedconsultancy.bind(
                        this,
                        project._id
                      )}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Get Project"
                      className="btn btn-primary"
                      onClick={this.getProject.bind(this, project._id)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ul>
      );
    } else {
      return (
        <ul>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Project Type</th>
                <th>Project Deadline</th>
                <th>Project Hours</th>
                <th>Project Min Credits/Hr</th>
                <th>Project Max Xredits/Hr</th>
                <th>Project Chosen Credit Hr</th>
                <th>Project Penalty</th>
                <th>Project Years of experience</th>
                <th>Project Contract signed</th>
                <th>Project Required skills</th>
                <th>Project status</th>

                <th>Show Tasks</th>
                <th>Show Applied Consultancies</th>
                <th>Show Assigned Consultancy</th>
              </tr>
            </thead>
            {this.state.projects.map(project => (
              <tbody>
                <tr>
                  <td>{project.name}</td>
                  <td> {project.description}</td>
                  <td> {project.type}</td>
                  <td> {project.deadline}</td>
                  <td> {project.hours}</td>
                  <td> {project.minreditsHour}</td>
                  <td> {project.maxCreditsHour}</td>
                  <td> {project.chosenCreditHour}</td>
                  <td> {project.creditsPenalty}</td>
                  <td> {project.yearsOfExperience}</td>
                  <td> {project.contractsSigned}</td>
                  <td> {project.requiredSkills}</td>
                  <td> {project.status}</td>
                  <td>
                    <input
                      type="submit"
                      value="Show Tasks"
                      className="btn btn-primary"
                      onClick={this.showtasks.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Show Applied Consultancies"
                      className="btn btn-primary"
                      onClick={this.showconsultancy.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="submit"
                      value="Show assigned consultancy"
                      className="btn btn-primary"
                      onClick={this.showassignedconsultancy.bind(
                        this,
                        project._id
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ul>
      );
    }
  }
}
