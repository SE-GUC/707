import axios from "axios";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import Cookies from "universal-cookie";
import PartnerTasks from "./admin-tasks.component.js";
import AddTask from "./add-task.component.js";

export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pendingProjects: [],
      editable: false,
      project: {},
      name: '',
      description: '',
      type: '',
      deadline: '',
      hours: null,
      minCreditsHour: null,
      maxCreditsHour: null,
      chosenCreditHour: null,
      creditsPenalty: null,
      yearsOfExperience: null,
      contractSigned: false,
      requiredSkills: [],
      status: "Negotiation"
    }
  }
  onChangeProjectName(e) {
    this.setState({ name: e.target.value })
  }
  onChangeChosenhours(e) {
    this.setState({ chosenCreditHour: e.target.value })
  }
  onChangeCredits(e) {
    this.setState({ creditsPenalty: e.target.value })
  }
  onChangeDeadlineType(e) {
    this.setState({ deadline: e.target.value })
  }
  onChangehours(e) {
    this.setState({ hours: e.target.value })
  }
  onChangeMaxhours(e) {
    this.setState({ maxCreditsHour: e.target.value })
  }
  onChangeMinhours(e) {
    this.setState({ minCreditsHour: e.target.value })
  }
  onChangeProjectDescription(e) {
    this.setState({ description: e.target.value })
  }
  onChangeProjectType(e) {
    this.setState({ type: e.target.value })
  }
  onChangeSkills(e) {
    this.setState({ requiredSkills: e.target.value.split(',') })
  }
  onChangeYearsofExperience(e) {
    this.setState({ yearsOfExperience: e.target.value })
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
        console.log(pendingProjects);
        let filteredProjects = res.data.data.filter(project => project != null)
        console.log(filteredProjects);

        this.setState({ pendingProjects: filteredProjects,
        editable:false });
      });
  }

  editProject(project){
    const cookies = new Cookies();
    const token = cookies.get('token');
    console.log(this.state.editable);
    console.log(project);
    
    if (!this.state.editable) {

      console.log(this.state.name);

      this.setState({project:project});
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
          console.log(this.state)
        
    }
    else {
      console.log('ana fl else !!!!!!!!!!!!!!!!')
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
      }
      console.log(updatedProject);
      axios.put('http://localhost:5000/api/partners/project/' + this.state.project._id, updatedProject, {
        headers: {
          Authorization: token
        }
      }).then(
        console.log("h3ml update fe partner nawwww"),
        axios.put('http://localhost:5000/api/partners/update/projects', {}, {
          headers: {
            Authorization: token
          }
        })
          .then(res => {
            this.setState({
              editable: false,
              project: {},
              name: '',
              description: '',
              type: '',
              deadline: '',
              hours: null,
              minCreditsHour: null,
              maxCreditsHour: null,
              chosenCreditHour: null,
              creditsPenalty: null,
              yearsOfExperience: null,
              contractSigned: false,
              requiredSkills: [],
              status: "Negotiation"
            })
            console.log(res.data);
           // window.location.reload();
          }
          ))

    }
  };


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
        if(res.data.msg==='This project has been deleted successfully'){      
          alert('Deleted Successfully!');
        }

      }).then(res => {
        axios.put('http://localhost:5000/api/partners/update/projects',{},{
            headers: {
                Authorization: token
            }
        }).catch(error=>{ alert('Project cannot be deleted!')});
    window.location.reload();
    })}
      getmethod(Projectid) {

        const cookies = new Cookies();
    
        const token= cookies.get('token');
    
        console.log(token)
    
        axios.get('http://localhost:5000/api/partners/project/'+ Projectid, { headers: {
    
            Authorization: token}
    
          })
    
          .then(res => {
            const projects = res.data.data;
            this.setState({pendingProjects:[projects]})
            console.log(projects);
            this.rerender2(token,Projectid);
    
          })
    
    }
    
rerender2(token,Projectid) {
  axios.get('http://localhost:5000/api/partners/project/'+Projectid, { headers: {

      Authorization: token}

    })


    .then(res => {
      const projects = [res.data.data];
      this.setState({ projects });

    })

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
      window.location.replace("/partnershowAwaitingtasks/"+id)
    };
     
     update(token){
       axios
         .put("http://localhost:5000/api/partners/update/projects",{
         headers:{
           Authorization: token
         }
       })
       .then(res => {
         if(res.data.msg==='all projects are updated'){
              alert('updated successfully!')
         }
       });
     }
  
  render() {
    if (!this.state.editable)
      return (
        <ul>
          {console.log(this.state)}
          {this.state.pendingProjects.map(project => (
            <p>

              <li> Name:{project.name}</li>
              <li>Description: {project.description}</li>
              <li> Type: {project.type}</li>
              <br />
              <li>Deadline: {project.deadline}</li>
              <br />
              <li>Hours: {project.hours}</li>
              <br />
              <li>Min Credits/Hr: {project.minCreditsHour}</li>
              <br />
              <li>Max Credits/Hr: {project.maxCreditsHour}</li>
              <br />
              <li>Chosen Credit Hour: {project.chosenCreditHour}</li>
              <br />
              <li>Penalty: {project.creditsPenalty}</li>
              <br />
              <li>Years of Experience: {project.yearsOfExperience}</li>
              <br />
              <li>Contract Signed: {project.contractSigned}</li>
              <br />
              <li>Required Skills:
                {project.requiredSkills.map(requiredSkills => (
                  <li>{requiredSkills}</li>
                ))}</li>
              <br />
              <li>Status: {project.status} <br /></li>
              <li>Life Cycle:
                {project.projectcycle.map(cycle => (
                  <li>
                    Description: {cycle.description}
                    <br />
                    Status: {cycle.status}
                    Percentage: {cycle.percentage}
                  </li>
                 ) )}
                <br />
              
                <div className="form-group">
                        <input type="submit" value="Add Task" className="btn btn-primary" onClick={this.addTask.bind(this,project._id)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Get Project" className="btn btn-primary" onClick={this.getmethod.bind(this,project._id)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Delete" className="btn btn-primary" onClick={this.delete.bind(this,project._id)}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Show Tasks" className="btn btn-primary" onClick={this.showtasks.bind(this,project._id)}/>
                    </div>

                    
                <br />
                
             
            </li>

              <button id="btn1" onClick={ this.editProject.bind(this,project)}>Edit Project</button>
              <br />
              <br />

            </p>
          ))}
        </ul>

      );
    else
      return (
        <p>
          {console.log(this.state)}
          <div className="form-group">
            <label>Project Name: </label>
            <input type="text"
              className="content-editable"
              value={this.state.name}
              onChange={this.onChangeProjectName.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Project Description: </label>
            <input type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeProjectDescription.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Required Years of Experience: </label>
            <input type="number"
              className="form-control"
              value={this.state.yearsOfExperience}
              onChange={this.onChangeYearsofExperience.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Hours: </label>
            <input type="number"
              className="form-control"
              value={this.state.hours}
              onChange={this.onChangehours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Minimum Credit Hours: </label>
            <input type="number"
              className="form-control"
              value={this.state.minCreditsHour}
              onChange={this.onChangeMinhours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Maximum Credit Hours: </label>
            <input type="number"
              className="form-control"
              value={this.state.maxCreditsHour}
              onChange={this.onChangeMaxhours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Chosen Credit Hours: </label>
            <input type="number"
              className="form-control"
              value={this.state.chosenCreditHour}
              onChange={this.onChangeChosenhours.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Credits Penalty: </label>
            <input type="number"
              className="form-control"
              value={this.state.creditsPenalty}
              onChange={this.onChangeCredits.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Project type: </label>
            <input type="text"
              className="content-editable"
              value={this.state.type}
              onChange={this.onChangeProjectType.bind(this)}
            />
          </div>
          <div className="form-group">
            <label>Project deadline: </label>
            <input type="date"
              className="content-editable"
              value={this.state.deadline}
              onChange={this.onChangeDeadlineType.bind(this)}
            />
          </div>


          <p> Required Skills</p>
          {this.state.requiredSkills.map(requiredSkills => {
            return <li>{requiredSkills}</li>
          })}
          <form name="myForm">
            <input type="text"
              className="form-control"
              value={this.state.requiredSkills}
              onChange={this.onChangeSkills.bind(this)}
            />


          </form>


            
          <button id="btn1" onClick={this.editProject.bind(this, this.state.project)}>Edit Project</button>
        </p>)
  }

}
