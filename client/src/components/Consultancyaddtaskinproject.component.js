import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class addtaskinproject extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          description:"",
          type:"",
          deadline:"",
          hours:"",
          minCreditsHour: "",
          maxCreditsHour: "",
          creditsPenalty: "",
          yearsOfExperience: "",
          candidateRole: "",
          contractSigned: "",
          requiredSkills: ""
        };
      }

      namechanged = e => {
          this.setState({
            name: e.target.value
          });
      };

      descriptionchanged = e => {
        this.setState({
            description: e.target.value
        });
    };

    typechanged = e => {
        this.setState({
            type: e.target.value
        });
    };

    deadlinechanged = e => {
        this.setState({
            deadline: e.target.value
        });
    };

    hourschanged = e => {
        this.setState({
            hours: e.target.value
        });
    };
    minCreditsHourchanged = e => {
        this.setState({
            minCreditsHour: e.target.value
        });
    };
    maxCreditsHourchanged = e => {
        this.setState({
            maxCreditsHour: e.target.value
        });
    };
    creditsPenaltychanged = e => {
        this.setState({
            creditsPenalty: e.target.value
        });
    };
    yearsOfExperiencechanged = e => {
        this.setState({
            yearsOfExperience: e.target.value
        });
    };
    candidateRolechanged = e => {
        this.setState({
            candidateRole: e.target.value
        });
    };
    contractSignedchanged = e => {
        this.setState({
            contractSigned: e.target.value
        });
    };
    creditsPenaltychanged = e => {
        this.setState({
            creditsPenalty: e.target.value
        });
    };

    requiredSkillschanged = e => {
        var requiredSkill = e.target.value.split(",");
        this.setState({
            requiredSkills: requiredSkill
        });
      };

      addtask = (e) => {
          e.preventDefault();
        const cookies = new Cookies();
        const token = cookies.get("token");
        const {project}=this.props.match.params
        if(this.state.requiredSkills===""){
          var task={
            name:this.state.name,
            description:this.state.description,
          type:this.state.type,
          deadline:this.state.deadline,
          hours:this.state.hours,
          minCreditsHour: this.state.minCreditsHour,
          maxCreditsHour: this.state.maxCreditsHour,
          creditsPenalty: this.state.creditsPenalty,
          yearsOfExperience: this.state.yearsOfExperience,
          candidateRole: this.state.candidateRole,
          contractSigned: Boolean(this.state.contractSigned),
        }
      }
        else{
        var task={
            name:this.state.name,
            description:this.state.description,
          type:this.state.type,
          deadline:this.state.deadline,
          hours:this.state.hours,
          minCreditsHour: this.state.minCreditsHour,
          maxCreditsHour: this.state.maxCreditsHour,
          creditsPenalty: this.state.creditsPenalty,
          yearsOfExperience: this.state.yearsOfExperience,
          candidateRole: this.state.candidateRole,
          contractSigned: Boolean(this.state.contractSigned),
          requiredSkills: this.state.requiredSkills
        }
      }
        axios
          .post("http://localhost:5000/api/consultancies/project/tasks/"+{project}.project,task,{
            headers: {
              Authorization: token
            }
          })
          .then(alert("Task is added")
        );
        this.setState({
            name: "",
          description:"",
          type:"",
          deadline:"",
          hours:"",
          minCreditsHour: "",
          maxCreditsHour: "",
          creditsPenalty: "",
          yearsOfExperience: "",
          candidateRole: "",
          contractSigned: "",
          requiredSkills: ""
        })
        axios
        .put("http://localhost:5000/api/consultancies/update/projects",{},{
          headers: {
            Authorization: token
          }
        })

      };

  render() {
    {const cookies = new Cookies();
      const usertype = cookies.get("usertype");
      if(usertype !== "consultancy"){
      alert("Invalid access");
      window.location.replace("/");
    }}
    return (
      
      <div style={{ marginTop: 10 }}>
        <h3>Insert Task Info</h3>
        <form onSubmit={this.onSubmit}>
        <div className="form-group">
            <label>Name: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={e => this.namechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={e => this.descriptionchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Type: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.type}
              onChange={e => this.typechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Deadline: {this.state.deadline}</label>
            <input
              type="date"
              className="form-control"
              value={this.state.deadline}
              onChange={e => this.deadlinechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>hours: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.hours}
              onChange={e => this.hourschanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Minimum Credits Hour: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.minCreditsHour}
              onChange={e => this.minCreditsHourchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Maximum Credits Hour: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.maxCreditsHour}
              onChange={e => this.maxCreditsHourchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Credits Penalty: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.creditsPenalty}
              onChange={e => this.creditsPenaltychanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Minimum Years Of Experience: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.yearsOfExperience}
              onChange={e => this.yearsOfExperiencechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Candidate Role: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.candidateRole}
              onChange={e => this.candidateRolechanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Contract Signed: </label>
            <input
              type="text"
              className="form-control"
              value={String(this.state.contractSigned)}
              onChange={e => this.contractSignedchanged(e)}
            />
          </div>
          <div className="form-group">
            <label>Required Skills: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.requiredSkills}
              onChange={e => this.requiredSkillschanged(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Add Task"
              className="btn btn-primary"
              onClick={this.addtask}
            />
          </div>
        
        
        
        </form>
      </div>
    );
  }
}
