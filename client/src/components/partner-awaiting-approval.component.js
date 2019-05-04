import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Cookies from "universal-cookie";
import AddTask from "./add-task.component.js";
import Table from "react-bootstrap/Table";
export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingProjects: [],
      editable: false,
      flag: false,
      project: {},
      name: "",
      description: "",
      type: "",
      deadline: "",
      hours: null,
      minCreditsHour: null,
      maxCreditsHour: null,
      chosenCreditHour: null,
      creditsPenalty: null,
      yearsOfExperience: null,
      contractSigned: false,
      requiredSkills: [],
      status: "Negotiation"
    };
  }
  onChangeProjectName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeChosenhours(e) {
    this.setState({ chosenCreditHour: e.target.value });
  }
  onChangeCredits(e) {
    this.setState({ creditsPenalty: e.target.value });
  }
  onChangeDeadlineType(e) {
    this.setState({ deadline: e.target.value });
  }
  onChangehours(e) {
    this.setState({ hours: e.target.value });
  }
  onChangeMaxhours(e) {
    this.setState({ maxCreditsHour: e.target.value });
  }
  onChangeMinhours(e) {
    this.setState({ minCreditsHour: e.target.value });
  }
  onChangeProjectDescription(e) {
    this.setState({ description: e.target.value });
  }
  onChangeProjectType(e) {
    this.setState({ type: e.target.value });
  }
  onChangeSkills(e) {
    this.setState({ requiredSkills: e.target.value.split(",") });
  }
  onChangeYearsofExperience(e) {
    this.setState({ yearsOfExperience: e.target.value });
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
      .get("http://localhost:5000/api/partners/pendingProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        let filteredProjects = res.data.data.filter(project => project != null);
        console.log(filteredProjects);

        this.setState({ pendingProjects: filteredProjects, editable: false });
      });
  }
  getmethod(Projectid) {
    const cookies = new Cookies();
    const token = cookies.get("token");

    axios
      .get("http://localhost:5000/api/partners/project/" + Projectid, {
        headers: {
          Authorization: token
        }
      })

      .then(res => {
        const projects = res.data.data;
        this.setState({ pendingProjects: [projects], flag: true });
        console.log(projects);
        this.rerender2(token, Projectid);
      });
  }
  editProject(project) {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (!this.state.editable) {
      console.log(this.state.name);

      this.setState({ project: project });
      console.log(this.state);
      this.setState({
        editable: true,
        name: project.name,
        description: project.description,
        type: project.type,
        deadline: project.deadline,
        hours: project.hours,
        minCreditsHour: project.minCreditsHour,
        maxCreditsHour: project.maxCreditsHour,
        chosenCreditHour: project.chosenCreditHour,
        creditsPenalty: project.creditsPenalty,
        yearsOfExperience: project.yearsOfExperience,
        contractSigned: project.contractSigned,
        requiredSkills: project.requiredSkills,
        status: project.status
      });
      console.log(this.state);
    } else {
      console.log(this.state);
      let updatedProject = {
        name: this.state.name,
        description: this.state.description,
        type: this.state.type,
        deadline: this.state.deadline,
        hours: this.state.hours,
        minCreditsHour: this.state.minCreditsHour,
        maxCreditsHour: this.state.maxCreditsHour,
        chosenCreditHour: this.state.chosenCreditHour,
        creditsPenalty: this.state.creditsPenalty,
        yearsOfExperience: this.state.yearsOfExperience,
        contractSigned: this.state.contractSigned,
        requiredSkills: this.state.requiredSkills,
        status: this.state.status
      };
      console.log(updatedProject);
      axios
        .put(
          "http://localhost:5000/api/partners/project/" +
            this.state.project._id,
          updatedProject,
          {
            headers: {
              Authorization: token
            }
          }
        )
        .then(
          console.log("h3ml update fe partner nawwww"),
          axios
            .put(
              "http://localhost:5000/api/partners/update/projects",
              {},
              {
                headers: {
                  Authorization: token
                }
              }
            )
            .then(res => {
              this.setState({
                editable: false,
                project: {},
                name: "",
                description: "",
                type: "",
                deadline: "",
                hours: null,
                minCreditsHour: null,
                maxCreditsHour: null,
                chosenCreditHour: null,
                creditsPenalty: null,
                yearsOfExperience: null,
                contractSigned: false,
                requiredSkills: [],
                status: "Negotiation"
              });
              console.log(res.data);
              // window.location.reload();
            })
        );
    }
  }

  addTask(projectID) {
    ReactDOM.render(
      <AddTask projectID={projectID} />,
      document.getElementById("root")
    );
  }
  delete(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete("http://localhost:5000/api/partners/project/" + id, {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if (res.data.msg === "This project has been deleted successfully") {
          alert("Deleted Successfully!");
        }
      })
      .then(res => {
        axios
          .put(
            "http://localhost:5000/api/partners/update/projects",
            {},
            {
              headers: {
                Authorization: token
              }
            }
          )
          .catch(error => {
            alert("Project cannot be deleted!");
          });
        window.location.reload();
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
  rerender(token) {
    axios
      .get("http://localhost:5000/api/partners/pendingProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const pendingProjects = res.data.data;
        this.setState({ pendingProjects });
      });
  }
  showtasks = id => {
    window.location.replace("/partnershowAwaitingtasks/" + id);
  };

  update(token) {
    axios
      .put("http://localhost:5000/api/partners/update/projects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        if (res.data.msg === "all projects are updated") {
          alert("updated successfully!");
        }
      });
  }

  render() {
    if (!this.state.editable && !this.state.flag) {
      return (
        <ul>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Project Description</th>
                {/* <th>Project Type</th>
                                <th>Project Deadline</th>
                                <th>Project Hours</th>
                                <th>Project Min Credits/Hr</th>
                                <th>Project Max Xredits/Hr</th>
                                <th>Project Chosen Credit Hr</th>
                                <th>Project Penalty</th>
                                <th>Project Years of experience</th>
                                <th>Project Contract signed</th>
                                <th>Project Required skills</th>
                                <th>Project status</th> */}

                <th>Show Tasks</th>
                <th>Add Task</th>
                <th>Get Project</th>
                <th>Edit Project</th>
                <th>Delete</th>
              </tr>
            </thead>
            {this.state.pendingProjects.map(project => (
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
                      value="AddTask"
                      className="btn btn-primary"
                      onClick={this.addTask.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="submit"
                      value="Get Project"
                      className="btn btn-primary"
                      onClick={this.getmethod.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="submit"
                      value="Edit Project"
                      className="btn btn-primary"
                      onClick={this.editProject.bind(this, project)}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Delete"
                      className="btn btn-primary"
                      onClick={this.delete.bind(this, project._id)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ul>
      );
    }
    if (this.state.flag) {
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
                <th>Add Task</th>
                <th>Get Project</th>
                <th>Edit Project</th>
                <th>Delete</th>
              </tr>
            </thead>
            {this.state.pendingProjects.map(project => (
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
                      value="AddTask"
                      className="btn btn-primary"
                      onClick={this.addTask.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="submit"
                      value="Get Project"
                      className="btn btn-primary"
                      onClick={this.getmethod.bind(this, project._id)}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="submit"
                      value="Edit Project"
                      className="btn btn-primary"
                      onClick={this.editProject.bind(this, project)}
                    />
                  </td>
                  <td>
                    <input
                      type="submit"
                      value="Delete"
                      className="btn btn-primary"
                      onClick={this.delete.bind(this, project._id)}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </ul>
      );
    } else
      return (
        <p>
          {console.log(this.state)}
          <div className="form-group">
            <label>Project Name: </label>
            <input
              type="text"
              className="content-editable"
              value={this.state.name}
              onChange={this.onChangeProjectName.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Project Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeProjectDescription.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Required Years of Experience: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.yearsOfExperience}
              onChange={this.onChangeYearsofExperience.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Hours: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.hours}
              onChange={this.onChangehours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Minimum Credit Hours: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.minCreditsHour}
              onChange={this.onChangeMinhours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Maximum Credit Hours: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.maxCreditsHour}
              onChange={this.onChangeMaxhours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Chosen Credit Hours: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.chosenCreditHour}
              onChange={this.onChangeChosenhours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Credits Penalty: </label>
            <input
              type="number"
              className="form-control"
              value={this.state.creditsPenalty}
              onChange={this.onChangeCredits.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Project type: </label>
            <input
              type="text"
              className="content-editable"
              value={this.state.type}
              onChange={this.onChangeProjectType.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Project deadline: </label>
            <input
              type="date"
              className="content-editable"
              value={this.state.deadline}
              onChange={this.onChangeDeadlineType.bind(this)}
            />
          </div>

          <p> Required Skills</p>
          {this.state.requiredSkills.map(requiredSkills => {
            return <li>{requiredSkills}</li>;
          })}
          <form name="myForm">
            <input
              type="text"
              className="form-control"
              value={this.state.requiredSkills}
              onChange={this.onChangeSkills.bind(this)}
            />
          </form>

          <button
            id="btn1"
            onClick={this.editProject.bind(this, this.state.project)}
          >
            Edit Project
          </button>
        </p>
      );
  }
}
