import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
export default class tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }
  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .get(
        "http://localhost:5000/api/candidates/tasks" ,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
          axios.get( "http://localhost:5000/api/candidates/pendingTasks",
          {
            headers: {
              Authorization: token
            }
          }).then(res1=>{
            const tasks = res.data.data;
            const pendingTasks = res1.data.data;
            const result = this.manageTasks(tasks,pendingTasks)
            this.setState({ tasks: result });      
          }).catch(e =>{
            alert(e)
        });
        
      }).catch(e =>{
        alert(e)
    });
  }
  manageTasks(tasks, pendingTasks){
      const result=[]
      tasks.forEach(element => {
        element["buttonId"] = "notpending"
          pendingTasks.forEach(pt => {
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
        "http://localhost:5000/api/candidates/task/" + id,{},
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
        "http://localhost:5000/api/candidates/task/" + id,
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
             
              <br />
              <input
                type="button"
                className="btn btn-primary"
                onClick={task.buttonId === "pending"? this.onSubmitDisapply.bind(this, task._id) : 
                this.onSubmitApply.bind(this, task._id)}
                value = {task.buttonId === "pending"? "Disapply" : 
                "Apply"}
              >
              </input>
            </p>
          </li>
        ))}
      </ul>
    );
  }
}
