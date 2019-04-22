import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import AddTask from "./add-task.component.js";
export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingProjects: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get("http://localhost:5000/api/partners/pendingProjects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        const pendingProjects = res.data.data;
        this.setState({ pendingProjects });
      }).catch(e =>{
        alert(e)
    });
  }
  

  addTask(projectID){
    ReactDOM.render(
      <AddTask projectID={projectID} />,
      document.getElementById("root")
    );
  }
  
  render() {
    return (
      <Router>
        <ul>
          {this.state.pendingProjects.map(project => (
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
                Life Cycle:
                {project.projectcycle.map(cycle => (
                  <li>
                    Description: {cycle.description}
                    <br />
                    Status: {cycle.status}
                    <br />
                    Percentage: {cycle.percentage}
                  </li>
                 ) )}
                <br />
              
                <div className="form-group">
                        <input type="submit" value="Add Task" className="btn btn-primary" onClick={this.addTask.bind(this,project._id)}/>
                    </div>
                <br />
                
              </p>
            </li>
          ))}
        </ul>
      </Router>
    );
  }
}
