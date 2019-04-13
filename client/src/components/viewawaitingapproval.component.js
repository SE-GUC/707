import React, { Component } from 'react';
import Cookies from 'universal-cookie';
const axios = require("axios");


export default class awaitingProjects extends Component {
  constructor(props) {
    super(props);
    this.onChangeType=this.onChangeType.bind(this);
    

    this.state = {
      temp:'',
      projects: [],
      type:false,
      updatedProject:{
        name:'',
        description:'',
        status:'',
        yearsOfExperience:'',
        type:'',
        requiredSkills:[],
        hours: '',
        minCreditsHour: '',
        maxCreditsHour: '',
        chosenCreditHour: '',
        creditsPenalty: '',
        deadline:''
      }
    }
}
  
      onChangeProjectName(project,e) {
        project.name=e.target.value;        
        this.setState({
            updatedProject:{
              name: project.name,
              description:project.description,
              status:project.status,
              yearsOfExperience:project.yearsOfExperience,
              requiredSkills:project.requiredSkills,
              type:project.type,
              hours: project.hours,
              minCreditsHour: project.minCreditsHour,
              maxCreditsHour: project.maxCreditsHour,
              chosenCreditHour: project.chosenCreditHour,
              creditsPenalty: project.creditsPenalty,
              deadline:project.deadline
         } });
        // console.log(this.state.updatedProject.name);
    }
    onChangeProjectDescription(project,e) {
      project.description=e.target.value;        
      this.setState({
          updatedProject:{
            name: project.name,
            description:project.description,
            status:project.status,
            yearsOfExperience:project.yearsOfExperience,
            requiredSkills:project.requiredSkills,
            type:project.type,
            hours: project.hours,
            minCreditsHour: project.minCreditsHour,
            maxCreditsHour: project.maxCreditsHour,
            chosenCreditHour: project.chosenCreditHour,
            creditsPenalty: project.creditsPenalty,
            deadline:project.deadline
       } });
  }
  onChangeProjectType(project,e) {
    project.type=e.target.value;        
    this.setState({
        updatedProject:{
          name: project.name,
          description:project.description,
          status:project.status,
          yearsOfExperience:project.yearsOfExperience,
          requiredSkills:project.requiredSkills,
          type:project.type,
          hours: project.hours,
          minCreditsHour: project.minCreditsHour,
          maxCreditsHour: project.maxCreditsHour,
          chosenCreditHour: project.chosenCreditHour,
          creditsPenalty: project.creditsPenalty,
          deadline:project.deadline
     } });
}
  onChangeStatus(project,e) {
    
    project.status=e.target.value;        
    this.setState({
        updatedProject:{
          name: project.name,
          description:project.description,
          status:project.status,
          yearsOfExperience:project.yearsOfExperience,
          requiredSkills:project.requiredSkills,
          type:project.type,
          hours: project.hours,
          minCreditsHour: project.minCreditsHour,
          maxCreditsHour: project.maxCreditsHour,
          chosenCreditHour: project.chosenCreditHour,
          creditsPenalty: project.creditsPenalty,
          deadline:project.deadline
     } });
            
        }
        onChangeSkills(project,e) {
          this.setState({
            temp:e.target.value
          })       
          project.requiredSkills=this.state.temp.split(',');
          this.setState({
              updatedProject:{
                name: project.name,
                description:project.description,
                status:project.status,
                yearsOfExperience:project.yearsOfExperience,
                requiredSkills:project.requiredSkills,
                type:project.type,
                hours: project.hours,
                minCreditsHour: project.minCreditsHour,
                maxCreditsHour: project.maxCreditsHour,
                chosenCreditHour: project.chosenCreditHour,
                creditsPenalty: project.creditsPenalty,
                deadline:project.deadline
           } });
                  
              }
        save(e,project,foo) {
          const Req=project.requiredSkills;
          console.log(Req);
          console.log(foo);
         Req.push(foo);
         project.requiredSkills.push(foo);
         this.setState({
           updatedProject:{
             name: project.name,
             description:project.description,
             status:project.status,
             yearsOfExperience:project.yearsOfExperience,
             requiredSkills:project.requiredSkills,
             type:project.type,
             hours: project.hours,
             minCreditsHour: project.minCreditsHour,
             maxCreditsHour: project.maxCreditsHour,
             chosenCreditHour: project.chosenCreditHour,
             creditsPenalty: project.creditsPenalty,
             deadline:project.deadline
        } });
       }
       onChangeType(e) {
        
                this.setState({
                    type: e.target.value
                });
            }
        onChangeYearsofExperience(project,e) {
          
          project.yearsOfExperience=e.target.value;        
          this.setState({
              updatedProject:{
                name: project.name,
                description:project.description,
                status:project.status,
                yearsOfExperience:project.yearsOfExperience,
                requiredSkills:project.requiredSkills,
                type:project.type,
                hours: project.hours,
                minCreditsHour: project.minCreditsHour,
                maxCreditsHour: project.maxCreditsHour,
                chosenCreditHour: project.chosenCreditHour,
                creditsPenalty: project.creditsPenalty,
                deadline:project.deadline
           } });
                  
              }
              onChangehours(project,e) {
                
                project.hours=e.target.value;        
                this.setState({
                    updatedProject:{
                      name: project.name,
                      description:project.description,
                      status:project.status,
                      yearsOfExperience:project.yearsOfExperience,
                      requiredSkills:project.requiredSkills,
                      type:project.type,
                      hours: project.hours,
                      minCreditsHour: project.minCreditsHour,
                      maxCreditsHour: project.maxCreditsHour,
                      chosenCreditHour: project.chosenCreditHour,
                      creditsPenalty: project.creditsPenalty,
                      deadline:project.deadline
                 } });   
                    }
                    onChangeMinhours(project,e) {
                      
                      project.minCreditsHour=e.target.value;        
                      this.setState({
                          updatedProject:{
                            name: project.name,
                            description:project.description,
                            status:project.status,
                            yearsOfExperience:project.yearsOfExperience,
                            requiredSkills:project.requiredSkills,
                            type:project.type,
                            hours: project.hours,
                            minCreditsHour: project.minCreditsHour,
                            maxCreditsHour: project.maxCreditsHour,
                            chosenCreditHour: project.chosenCreditHour,
                            creditsPenalty: project.creditsPenalty,
                            deadline:project.deadline
                       } }); 
                          }
                          onChangeMaxhours(project,e) {
                            
                            project.maxCreditsHour=e.target.value;        
                            this.setState({
                                updatedProject:{
                                  name: project.name,
                                  description:project.description,
                                  status:project.status,
                                  yearsOfExperience:project.yearsOfExperience,
                                  requiredSkills:project.requiredSkills,
                                  type:project.type,
                                  hours: project.hours,
                                  minCreditsHour: project.minCreditsHour,
                                  maxCreditsHour: project.maxCreditsHour,
                                  chosenCreditHour: project.chosenCreditHour,
                                  creditsPenalty: project.creditsPenalty,
                                  deadline:project.deadline
                             } });
                             }
                             onChangeChosenhours(project,e) {
                              
                              project.chosenCreditHour=e.target.value;        
                              this.setState({
                                  updatedProject:{
                                    name: project.name,
                                    description:project.description,
                                    status:project.status,
                                    yearsOfExperience:project.yearsOfExperience,
                                    requiredSkills:project.requiredSkills,
                                    type:project.type,
                                    hours: project.hours,
                                    minCreditsHour: project.minCreditsHour,
                                    maxCreditsHour: project.maxCreditsHour,
                                    chosenCreditHour: project.chosenCreditHour,
                                    creditsPenalty: project.creditsPenalty,
                                    deadline:project.deadline
                               } });
                                }
                                onChangeCredits(project,e) {
                                  
                                  project.creditsPenalty=e.target.value;        
                                  this.setState({
                                      updatedProject:{
                                        name: project.name,
                                        description:project.description,
                                        status:project.status,
                                        yearsOfExperience:project.yearsOfExperience,
                                        requiredSkills:project.requiredSkills,
                                        type:project.type,
                                        hours: project.hours,
                                        minCreditsHour: project.minCreditsHour,
                                        maxCreditsHour: project.maxCreditsHour,
                                        chosenCreditHour: project.chosenCreditHour,
                                        creditsPenalty: project.creditsPenalty,
                                        deadline:project.deadline
                                   } });
                                  }
                                  onChangeDeadlineType(project,e) {
                                    
                                    project.deadline=e.target.value;        
                                    this.setState({
                                        updatedProject:{
                                          name: project.name,
                                          description:project.description,
                                          status:project.status,
                                          yearsOfExperience:project.yearsOfExperience,
                                          requiredSkills:project.requiredSkills,
                                          type:project.type,
                                          hours: project.hours,
                                          minCreditsHour: project.minCreditsHour,
                                          maxCreditsHour: project.maxCreditsHour,
                                          chosenCreditHour: project.chosenCreditHour,
                                          creditsPenalty: project.creditsPenalty,
                                          deadline:project.deadline
                                     } });
                                    }
      componentDidMount() {
         const cookies = new Cookies();
         const token= cookies.get('token')
        axios.get('http://localhost:5000/api/admins/awaitingprojects', { headers: {
            Authorization: token.data}
          })
          .then(res => {
            const projects = res.data.data;
            this.setState({ projects });
          })
      }
      rerender(token) {
       axios.get('http://localhost:5000/api/admins/awaitingprojects', { headers: {
           Authorization: token.data}
         })
         .then(res => {
           const projects = res.data.data;
           this.setState({ projects });
         })
     }
   async updateproject(e,project){
       const cookies=new Cookies();
       const token= cookies.get('token');
       var words = this.state.temp.split(',');
       project.status="Approved";
       if(this.state.temp){
         project.requiredSkills=words
       }
       project.contractSigned=this.state.type;
 let project2={
  name: project.name,
  description:project.description,
  status:project.status,
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
  projectcycle: project.projectcycle,
      percentage: project.percentage,
  tasks:project.tasks
 }
 this.setState({
  temp:''  
 })
    console.log(this.state.updatedProject.description);
    console.log(this.state.updatedProject.name);
    console.log(project._id);
       axios.put('http://localhost:5000/api/admins/project/'+project._id,project2,{ headers: {
        Authorization: token.data}});
        this.rerender(token);

   }

      render() {
        return (
          <ul>
            { this.state.projects.map(project => <li>
             
              
               <div className="form-group"> 
                        <label>Project Name: </label>
                        <input  type="text"
                                className="content-editable"
                                value={project.name}
                                onChange={(e) => this.onChangeProjectName(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Project Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={project.description}
                                onChange={(e) => this.onChangeProjectDescription(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Required Years of Experience: </label>
                        <input  type="number"
                                className="form-control"
                                value={project.yearsOfExperience}
                                onChange={(e) => this.onChangeYearsofExperience(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Hours: </label>
                        <input  type="number"
                                className="form-control"
                                value={project.hours}
                                onChange={(e) => this.onChangehours(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Minimum Credit Hours: </label>
                        <input  type="number"
                                className="form-control"
                                value={project.minCreditsHour}
                                onChange={(e) => this.onChangeMinhours(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Maximum Credit Hours: </label>
                        <input  type="number"
                                className="form-control"
                                value={project.maxCreditsHour}
                                onChange={(e) => this.onChangeMaxhours(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Chosen Credit Hours: </label>
                        <input  type="number"
                                className="form-control"
                                value={project.chosenCreditHour}
                                onChange={(e) => this.onChangeChosenhours(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Credits Penalty: </label>
                        <input  type="number"
                                className="form-control"
                                value={project.creditsPenalty}
                                onChange={(e) => this.onChangeCredits(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Project type: </label>
                        <input  type="text"
                                className="content-editable"
                                value={project.type}
                                onChange={(e) => this.onChangeProjectType(project, e)}
                                />
                    </div>
                    <div className="form-group"> 
                        <label>Project deadline: </label>
                        <input  type="date"
                                className="content-editable"
                                value={project.deadline}
                                onChange={(e) => this.onChangeDeadlineType(project, e)}
                                />
                    </div>
                    <div className="form-check form-check-inline">
                                <input  className="form-check-input" 
                                        type="radio" 
                                        name="priorityOptions" 
                                        id="true" 
                                        value="true" 
                                        checked={this.state.type==='true'} 
                                        onChange={this.onChangeType}
                                        />
                                <label className="form-check-label">Signed Contract</label>
                            </div>
                            <div className="list">

              <p> Required Skills</p>
              {project.requiredSkills.map(requiredSkills=> {  
                      return <li>{requiredSkills}</li>
                 })}
              <form name="myForm"> 
              <input  type="text"
                                className="form-control"
                                value={this.state.temp}
                                onChange={(e) => this.onChangeSkills(project, e)}
                                />

          
              </form>
            </div>
                            
                        
               <button type='update' onClick={(event)=>this.updateproject(event,project)}>Approve</button><br/>
              </li>)}

          </ul>
        )
      }
    };