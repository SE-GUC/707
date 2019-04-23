import axios from "axios";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import Cookies from "universal-cookie";
export default class approvedtasks extends Component {
  constructor(props) {
    super(props);


    this.state = {
      tasks: [],
      updatedCycle:{description:'',
      status:'',
      percentage:''
    },
    update:false,
    task:{}
    };
    
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const usertype=cookies.get("usertype")
    if(usertype !== "candidate"){
      alert("Invalid Access")
      window.location.replace("/")
    }
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
update(task){
  this.setState({update:true,task:task})
}
 render(){
   if(this.state.update===true)
   return(
               <ul>
                  <p>Task Life Cycle</p>
              {this.state.task.taskcycle.map(cycle => (
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
                <input type="submit" value="Update Cycle" className="btn btn-primary" onClick={this.onSubmit.bind(this,this.state.task._id)}/> 

                </p>
              ))}
              </ul>
   );
   else
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
              <th>Update Task Cycle</th>
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
                    onClick={this.update.bind(this, task)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </ul>
    );
   
 }
  
} 