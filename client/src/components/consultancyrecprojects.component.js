
import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from 'react-bootstrap/Table';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class consultancyrecprojects extends Component {
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
      .get("http://localhost:5000/api/consultancies/projects", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
        axios.get( "http://localhost:5000/api/consultancies/pendingProjects",
          {
            headers: {
              Authorization: token
            }
          }).then(
            res1=>{
              const projects = res.data.data;
              const pendingProjects = res1.data.data;
              const result = this.manageProjects(projects,pendingProjects)
              this.setState({ projects: result });      
            }
        )
      });
  }
  manageProjects(projects, pendingProjects){
    const result=[]
    projects.forEach(element => {
      element["buttonId"] = "notpending"
        pendingProjects.forEach(pt => {
            if(pt._id == element._id){
              element["buttonId"] = "pending";
              
            }
        })
        result.push(element)
    });
      return result
}
  
onSubmitApply(id) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios
    .post(
      "http://localhost:5000/api/consultancies/project/" + id,{},
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
        alert("Applied Successfully!")
        window.location.reload()
    }).catch(e =>{
      alert(e)
  });
}
onSubmitDisapply(id) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios
    .delete(
      "http://localhost:5000/api/consultancies/project/" + id,
      {
        headers: {
          Authorization: token
        }
      }
    )
    .then(res => {
        alert("Disapplied Successfully!")
        window.location.reload()

    });
}


  render() {
    return (
      <ul>

<Table striped bordered hover variant="dark">
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
                                <th>Project type</th>
                                <th>Signed Contract</th>
                                <th>Required Skills</th>
                                <th>Project deadline</th>
                                <th>Apply or Disapply</th>
                                
                            </tr>
                        </thead>
                        {this.state.projects.map(project =>

                            <tbody>
                                <tr >
                                    <td >{project.name}</td>
                                    <td> {project.description}</td>
                                    <td>{project.yearsOfExperience}</td>
                                    <td>{project.hours}</td>
                                    <td>{project.minCreditsHour}</td>
                                    <td>{project.maxCreditsHour}</td>
                                    <td>{project.chosenCreditHour}</td>
                                    <td>{project.creditsPenalty}</td>
                                    <td>{project.type}</td>
                                    <td>{String(project.contractSigned)}</td>
                                    <td> {project.requiredSkills.map(requiredSkills => {
                                          return <li>{requiredSkills}</li>;
                                               })}</td>
                                    <td>{project.deadline}</td>           
                                    
                                   <td> <input type="button" className="btn btn-primary"
                                            onClick={project.buttonId === "pending"? this.onSubmitDisapply.bind(this, project._id) : 
                                            this.onSubmitApply.bind(this, project._id)}
                                            value = {project.buttonId === "pending"? "Disapply" : 
                                            "Apply"}
                                              >
                                             </input></td>

                                </tr>
                            </tbody>
                        )}
                    </Table>



        {/* {this.state.projects.map(project => (
          <li>
            <div className="form-group">
              <label>Project Name: </label>
              <input
                type="text"
                className="content-editable"
                value={project.name}
              />
            </div>
            <div className="form-group">
              <label>Project Description: </label>
              <input
                type="text"
                className="form-control"
                value={project.description}
              />
            </div>
            <div className="form-group">
              <label>Required Years of Experience: </label>
              <input
                type="number"
                className="form-control"
                value={project.yearsOfExperience}
              />
            </div>
            <div className="form-group">
              <label>Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.hours}
              />
            </div>
            <div className="form-group">
              <label>Minimum Credit Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.minCreditsHour}
              />
            </div>
            <div className="form-group">
              <label>Maximum Credit Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.maxCreditsHour}
              />
            </div>
            <div className="form-group">
              <label>Chosen Credit Hours: </label>
              <input
                type="number"
                className="form-control"
                value={project.chosenCreditHour}
              />
            </div>
            <div className="form-group">
              <label>Credits Penalty: </label>
              <input
                type="number"
                className="form-control"
                value={project.creditsPenalty}
              />
            </div>
            <div className="form-group">
              <label>Project type: </label>
              <input
                type="text"
                className="content-editable"
                value={project.type}
              />
            </div>
            <div className="form-group">
              <label>Project deadline: </label>
              <input
                type="date"
                className="content-editable"
                value={project.deadline}
              />
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="true"
                value="true"
                checked={this.state.type === "true"}
              />
              <label className="form-check-label">Signed Contract</label>
            </div>
            <div className="list">
              <p> Required Skills</p>
              {project.requiredSkills.map(requiredSkills => {
                return <li>{requiredSkills}</li>;
              })}
            </div>

            <input
                type="button"
                className="btn btn-primary"
                onClick={project.buttonId === "pending"? this.onSubmitDisapply.bind(this, project._id) : 
                this.onSubmitApply.bind(this, project._id)}
                value = {project.buttonId === "pending"? "Disapply" : 
                "Apply"}
              >
              </input>
            <br />
            <br />
          </li>
        ))} */}
      </ul>
    );
  }
}
