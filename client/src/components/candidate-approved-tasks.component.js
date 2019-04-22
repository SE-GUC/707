import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class approvedtasks extends Component {
  constructor(props) {
    super(props);


    this.state = {
      tasks: [],
      updatedCycle:{description:'',
      status:'',
      percentage:''
    }
    };
    
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get(
        "http://localhost:5000/api/candidates/approvedTasks" ,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {

            const tasks = res.data.data;
            console.log(tasks)
            this.setState({ tasks });      
         
        
      });
  }

 onChangeDescription(cycle,e){
   cycle.description=e.target.value
  this.setState({updatedCycle:{
   description:cycle.description,
   percentage:cycle.percentage,
   status:cycle.status
}})
 }

 onChangePercentage(cycle,e){
  cycle.percentage=e.target.value
  this.setState({updatedCycle:{
    description:cycle.description,
    percentage:cycle.percentage,
    status:cycle.status
 }})
 }
 onChangeStatus(cycle,e){
  cycle.status=e.target.value
  this.setState({updatedCycle:{
    description:cycle.description,
    percentage:cycle.percentage,
    status:cycle.status
 }}) }
 
 onSubmit(taskID){
   const cookies = new Cookies();
   const token= cookies.get('token');
  //  const updatedCycle = {
  //      description: this.state.cycleDescription,
  //      status: this.state.cycleStatus,
  //      percentage: this.state.cyclePercentage
  //  };
   axios.get('http://localhost:5000/api/candidates/project/task/'+ taskID, { headers: {
    Authorization: token}})
    .then(res => {
              console.log(res.data.data[0]._id)
              const mainProject= res.data.data[0]
              console.log(this.state.updatedCycle)
        axios.put('http://localhost:5000/api/candidates/project/tasks/'+mainProject._id+'/'+taskID,this.state.updatedCycle,{ headers: {
          Authorization: token}}).then(res=> {
            alert('Updated Successfully!')
            axios.put('http://localhost:5000/api/candidates/update/tasks',{},{ headers: {
              Authorization: token}}).then(res=>{}).catch(e =>{
                alert(e)
            });
          }).catch(e =>{
            alert(e)
        });
    }
    ).catch(e =>{
      alert(e)
  });

 }
  render() {
    return (
      <ul>
        {this.state.tasks.map(task => (
          <li>
            <p>
              Name: {task.name}
              <br />
              Description: {task.description}
              <br />
              Type: {task.type}
              <br />
              Deadline: {task.deadline}
              <br />
              Hours: {task.hours}
              <br />
              Min Credits/Hr: {task.minCreditsHour}
              <br />
              Max Credits/Hr: {task.maxCreditsHour}
              <br />
              Chosen Credit Hour: {task.chosenCreditHour}
              <br />
              Penalty: {task.creditsPenalty}
              <br />
              Years of Experience: {task.yearsOfExperience}
              <br />
              Contract Signed: {task.contractSigned}
              <br />
              Candidate Role: {task.candidateRole}
              <br />
              Required Skills:{" "}
              {task.requiredSkills.map(requiredSkills => (
                <li>{requiredSkills}</li>
              ))}
              <br />
              Status: {task.status} 
              <br />
              Life Cycle:{" "}
              {task.taskcycle.map(cycle => (
                <p>
                
                <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                        className="form-control"
                        value={cycle.description}
                        onChange={(e) =>this.onChangeDescription(cycle,e)}
                        />
                </div>
                
               <label>Status: </label>
              <br></br>
              <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="Proceeding"
                value="Proceeding"
                checked={cycle.status === "Proceeding"}
                onChange={(e) =>this.onChangeStatus(cycle,e)}
              />
              <label className="form-check-label">Proceeding</label>
            </div>
            <br></br>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priorityOptions"
                id="Finished"
                value="Finished"
                checked={cycle.status === "Finished"}
                onChange={(e) =>this.onChangeStatus(cycle,e)}
              />
              <label className="form-check-label">Finished</label>
            </div>
            <br />
                <div className="form-group"> 
                <label> Percentage: </label>
                <input  type="number"
                        className="form-control"
                        value={cycle.percentage}
                        onChange={(e) =>this.onChangePercentage(cycle,e)}
                        />
                </div>
                <input type="submit" value="Update Cycle" className="btn btn-primary" onClick={this.onSubmit.bind(this,task._id)}/> 

                </p>
              ))}

              <br />
             
              <br />
              
            </p>
          </li>
        ))}
      </ul>
    );
  }
} 