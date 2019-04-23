import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Cookies from "universal-cookie";
export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      tasks: [],
      projectID: ""
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype=cookies.get("usertype")
    if(usertype !== "admin"){
      alert("Invalid Access")
      window.location.replace("/")
    }
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
      })
      .catch(e => {
        alert(e);
      });
  }
  viewTasks(projectID) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/admins/project/tasks/" + projectID, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const tasks = res.data.data;
        this.setState({ tasks: tasks, showTasks: true, projectID: projectID });
      });
  }

  onSubmitTask(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete(
        "http://localhost:5000/api/admins/project/tasks/" +
          this.state.projectID +
          "/" +
          id,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        this.rerender2(token);
      })
      .catch(e => {
        alert(e);
      });
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
      })
      .catch(e => {
        alert(e);
      });
  }
  rerender2(token) {
    axios
      .get(
        "http://localhost:5000/api/admins/project/tasks/" +
          this.state.projectID,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        const tasks = res.data.data;
        this.setState({ tasks });
      })
      .catch(e => {
        alert(e);
      });
  }

  render() {
    if (this.state.showTasks === true)
      return (
        <ul>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Task Description</th>
                <th>Years of Experience</th>
                <th>Hours</th>
                <th>Minimum Credit Hours</th>
                <th>Maximum Credit Hours</th>
                <th>Chosen Credit Hours</th>
                <th>Credits Penalty</th>
                <th>Task Type</th>
                <th>Signed Contract</th>
                <th>Required Skills</th>
                <th>Task Deadline</th>
                <th>Status</th>
                <th>Candidate Role</th>
                <th>Task Cycle</th>
                <th>Delete</th>
              </tr>
            </thead>
            {this.state.tasks.map(task => (
              <tbody>
                <tr>
                  <td>{task.name}</td>
                  <td> {task.description}</td>
                  <td>{task.yearsOfExperience}</td>
                  <td>{task.hours}</td>
                  <td>{task.minCreditsHour}</td>
                  <td>{task.maxCreditsHour}</td>
                  <td>{task.chosenCreditHour}</td>
                  <td>{task.creditsPenalty}</td>
                  <td>{task.type}</td>
                  <td>{String(task.contractSigned)}</td>
                  <td>
                    {" "}
                    {task.requiredSkills.map(requiredSkills => (
                      <li>{requiredSkills}</li>
                    ))}
                  </td>
                  <td>{task.deadline}</td>
                  <td>{task.status}</td>
                  <td>{task.candidateRole}</td>
                  <td>
                    {" "}
                    {task.taskcycle.map(cycle => (
                      <p>
                        Description: {cycle.description}
                        <br />
                        Status: {cycle.status}
                        <br />
                        Percentage: {cycle.percentage}
                      </p>
                    ))}
                  </td>

                  <td>
                    {" "}
                    <button
                      id="btn2"
                      className="btn btn-primary"
                      onClick={this.onSubmitTask.bind(this, task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ul>
      );
  
    else
      return (
        <ul>
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                <th>Required Years of Experience</th>
                <th>Hours</th>
                <th>Minimum Credit Hours</th>
                <th>Maximum Credit Hours</th>
                <th>Chosen Credit Hours</th>
                <th>Credits Penalty</th>
                <th>Project Type</th>
                <th>Signed Contract</th>
                <th>Required Skills</th>
                <th>Project Deadline</th>
                <th>Status</th>
                <th>Project Cycle</th>
                <th>Tasks</th>
                <th>Delete</th>
              </tr>
            </thead>
            {this.state.projects.map(project => (
              <tbody>
                <tr>
                  <td>{project.name}</td>
                  <td> {project.description}</td>
                  <td>{project.yearsOfExperience}</td>
                  <td>{project.hours}</td>
                  <td>{project.minCreditsHour}</td>
                  <td>{project.maxCreditsHour}</td>
                  <td>{project.chosenCreditHour}</td>
                  <td>{project.creditsPenalty}</td>
                  <td>{project.type}</td>
                  <td>{String(project.contractSigned)}</td>
                  <td>
                    {" "}
                    {project.requiredSkills.map(requiredSkills => (
                      <li>{requiredSkills}</li>
                    ))}
                  </td>
                  <td>{project.deadline}</td>
                  <td>{project.status}</td>

                  <td>
                    {" "}
                    {project.projectcycle.map(cycle => (
                      <li>
                        Description: {cycle.description}
                        <br />
                        Status: {cycle.status}
                        <br />
                        Percentage: {cycle.percentage}
                      </li>
                    ))}
                  </td>

                  <td>
                    <button
                      id="btn1"
                      className="btn btn-primary"
                      onClick={this.viewTasks.bind(this, project._id)}
                    >
                      Show
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      id="btn2"
                      className="btn btn-primary"
                      onClick={this.onSubmit.bind(this, project._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ul>
      );
  }
  //   render() {
  //     return (
  //       <Router>
  //         <ul>
  //           {this.state.projects.map(project => (
  //             <li>
  //               <p>
  //                 Name: {project.name}
  //                 <br />
  //                 Description: {project.description}
  //                 <br />
  //                 Type: {project.type}
  //                 <br />
  //                 Deadline: {project.deadline}
  //                 <br />
  //                 Hours: {project.hours}
  //                 <br />
  //                 Min Credits/Hr: {project.minCreditsHour}
  //                 <br />
  //                 Max Credits/Hr: {project.maxCreditsHour}
  //                 <br />
  //                 Chosen Credit Hour: {project.chosenCreditHour}
  //                 <br />
  //                 Penalty: {project.creditsPenalty}
  //                 <br />
  //                 Years of Experience: {project.yearsOfExperience}
  //                 <br />
  //                 Contract Signed: {project.contractSigned}
  //                 <br />
  //                 Required Skills:{" "}
  //                 {project.requiredSkills.map(requiredSkills => (
  //                   <li>{requiredSkills}</li>
  //                 ))}
  //                 <br />
  //                 Status: {project.status} <br />
  //                 Life Cycle:{" "}
  //                 {project.projectcycle.map(cycle => (
  //                   <li>
  //                     Description: {cycle.description}
  //                     <br />
  //                     Status: {cycle.status}
  //                     <br />
  //                     Percentage: {cycle.percentage}
  //                   </li>
  //                 ))}
  //                 <br />

  //                  <NavLink
  //                   onClick={this.viewTasks.bind(this, project._id)}
  //                 >
  //                   View Tasks
  //                  </NavLink>

  //                 <br />
  //                 <button
  //                   type="button"
  //                   className="btn btn-danger"
  //                   onClick={this.onSubmit.bind(this, project._id)}
  //                 >
  //                   Delete
  //                 </button>
  //               </p>
  //             </li>
  //           ))}
  //         </ul>
  //       </Router>
  //     );
  //   }
}
