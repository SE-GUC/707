import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import ReactDOM from 'react-dom';
import ApprovedProject from "./viewapprovedprojconsul.component.js";

const axios = require("axios");


export default class updateconstaskattribute extends Component {
    constructor(props) {
      super(props);
      this.onChangeType = this.onChangeType.bind(this);
      
     this.state = {
         temp:'',
         type:false,
        task:{
            name: '',
            description: '',
            type: '',
            deadline: '',
            hours: '',
            minCreditsHour: '',
            maxCreditsHour: '',
            chosenCreditHour: '',
            creditsPenalty: '',
            yearsOfExperience: '',
            candidateRole: '',
            contractSigned: '',
            requiredSkills: [],
            status: ''
        }
     } 
    }
    onChangeProjectName(project, e) {
        project.name = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
        // console.log(this.state.updatedProject.name);
      }
      onChangeProjectDescription(project, e) {
        project.description = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeProjectType(project, e) {
        project.type = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeStatus(project, e) {
    
        project.status = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
    
      }
      onChangeSkills(project, e) {
        this.setState({
          temp: e.target.value
        })
        project.requiredSkills = this.state.temp.split(',');
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
    
      }

      onChangeType(e) {
    
        this.setState({
          type: e.target.value
        });
      }
      onChangeYearsofExperience(project, e) {
    
        project.yearsOfExperience = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
    
      }
      onChangehours(project, e) {
    
        project.hours = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeMinhours(project, e) {
    
        project.minCreditsHour = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeMaxhours(project, e) {
    
        project.maxCreditsHour = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeChosenhours(project, e) {
    
        project.chosenCreditHour = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeCredits(project, e) {
    
        project.creditsPenalty = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      onChangeDeadlineType(project, e) {
    
        project.deadline = e.target.value;
        this.setState({
          task: {
            name: project.name,
            description: project.description,
            status: project.status,
            yearsOfExperience: project.yearsOfExperience,
            requiredSkills: project.requiredSkills,
            type: project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline: project.deadline,
            candidateRole:project.candidateRole
          }
        });
      }
      async deletetask(e,taska){
          const cookies = new Cookies();
          const token = cookies.get('token');
          const {project}=this.props.match.params;
          const {task}=this.props.match.params;
          axios.delete('http://localhost:5000/api/consultancies/project/tasks/' + {project}.project+'/'+{task}.task, {},{headers: {
            Authorization: token
          }
        }).then(res =>{
            
              axios.put('http://localhost:5000/api/consultancies/update/projects',{headers: {
                Authorization: token
              }
            }).then(res=>{
                axios.get('http://localhost:5000/api/consultancies/approvedProjects', {
                    headers: {
                      Authorization: token
                    }
                  })
                    .then(res => {
                      const projects = res.data.data;
       
            ReactDOM.render(
                <ApprovedProject projects={projects}/>,
                document.getElementById('root'))
                    })
        })
        })

      }
      async updateproject(e, projecta) {
        const cookies = new Cookies();
        const token = cookies.get('token');
        var words = this.state.temp.split(',');
        projecta.status = "Approved";
        if (this.state.temp) {
          projecta.requiredSkills = words
        }
        projecta.contractSigned = this.state.type;
        const {project}=this.props.match.params;
        const {task}=this.props.match.params;
        
        let task2 = {
          name: projecta.name,
          description: projecta.description,
          status: projecta.status,
          type: projecta.type,
          deadline: projecta.deadline,
          hours: projecta.hours,
          minCreditsHour: projecta.minCreditsHour,
          maxCreditsHour: projecta.maxCreditsHour,
          chosenCreditHour: projecta.chosenCreditHour,
          creditsPenalty: projecta.creditsPenalty,
          yearsOfExperience: projecta.yearsOfExperience,
          contractSigned: projecta.contractSigned,
          requiredSkills: projecta.requiredSkills,
          projectcycle: projecta.projectcycle,
          percentage: projecta.percentage,
          candidateRole:projecta.candidateRole
        }
        this.setState({
          temp: ''
        })

        axios.put('http://localhost:5000/api/consultancies/project/tasks/' + {project}.project+'/'+{task}.task, task2, {
          headers: {
            Authorization: token
          }
        });
        this.rerender(token);
    
      }
      rerender(token){

      const {task}=this.props.match.params;
        const {project}=this.props.match.params;
        console.log({task}.task);
        console.log({project}.project);
        
        axios.get('http://localhost:5000/api/consultancies/task/'+{task}.task, {
          headers: {
            Authorization: token
          }
        })
          .then(res => {
            const task = res.data.data;
            console.log(task);
            this.setState({task});
            console.log(this.state.task);
          })
      }
    componentDidMount() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const {task}=this.props.match.params;
        const {project}=this.props.match.params;
        console.log({task}.task);
        console.log({project}.project);
        
        axios.get('http://localhost:5000/api/consultancies/task/'+{task}.task, {
          headers: {
            Authorization: token
          }
        })
          .then(res => {
            const task = res.data.data;
            console.log(task);
            this.setState({task});
            console.log(this.state.task);
          })
      }
      render() {
        return (
          <ul>
            {
              <p>
    
                <div className="form-group">
                  <label>Task Name: </label>
                  <input type="text"
                    className="content-editable"
                    value={this.state.task.name}
                    onChange={(e) => this.onChangeProjectName(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Project Description: </label>
                  <input type="text"
                    className="form-control"
                    value={this.state.task.description}
                    onChange={(e) => this.onChangeProjectDescription(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Required Years of Experience: </label>
                  <input type="number"
                    className="form-control"
                    value={this.state.task.yearsOfExperience}
                    onChange={(e) => this.onChangeYearsofExperience(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Hours: </label>
                  <input type="number"
                    className="form-control"
                    value={this.state.task.hours}
                    onChange={(e) => this.onChangehours(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Minimum Credit Hours: </label>
                  <input type="number"
                    className="form-control"
                    value={this.state.task.minCreditsHour}
                    onChange={(e) => this.onChangeMinhours(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Maximum Credit Hours: </label>
                  <input type="number"
                    className="form-control"
                    value={this.state.task.maxCreditsHour}
                    onChange={(e) => this.onChangeMaxhours(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Chosen Credit Hours: </label>
                  <input type="number"
                    className="form-control"
                    value={this.state.task.chosenCreditHour}
                    onChange={(e) => this.onChangeChosenhours(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Credits Penalty: </label>
                  <input type="number"
                    className="form-control"
                    value={this.state.task.creditsPenalty}
                    onChange={(e) => this.onChangeCredits(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Project type: </label>
                  <input type="text"
                    className="content-editable"
                    value={this.state.task.type}
                    onChange={(e) => this.onChangeProjectType(this.state.task, e)}
                  />
                </div>
                <div className="form-group">
                  <label>Project deadline: </label>
                  <input type="date"
                    className="content-editable"
                    value={this.state.task.deadline}
                    onChange={(e) => this.onChangeDeadlineType(this.state.task, e)}
                  />
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input"
                    type="radio"
                    name="priorityOptions"
                    id="true"
                    value="true"
                    checked={this.state.type === 'true'}
                    onChange={this.onChangeType}
                  />
                  <label className="form-check-label">Signed Contract</label>
                </div>
                <div className="list">
    
                  <p> Required Skills</p>
                  {this.state.task.requiredSkills.map(requiredSkills => {
                    return <li>{requiredSkills}</li>
                  })}
                  <form name="myForm">
                    <input type="text"
                      className="form-control"
                      value={this.state.temp}
                      onChange={(e) => this.onChangeSkills(this.state.task, e)}
                    />
                
    
                  </form>
                </div>
    
    
                <button type='update' onClick={(event) => this.updateproject(event, this.state.task)}>Update</button><br />
               <br/>
                <button type='update' onClick={(event) => this.deletetask(event, this.state.task)}>Delete</button><br />

              </p>   }
    
          </ul>
        )
      }
    };