import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie";
import Table from "react-bootstrap/Table";

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
    const usertype= cookies.get("usertype");
    if(usertype !== "candidate"){
      alert("Invalid Access")
      window.location.replace("/")
    }
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
 
  render(){
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
              <th> </th>
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
                  <input
                type="button"
                className="btn btn-primary"
                onClick={task.buttonId === "pending"? this.onSubmitDisapply.bind(this, task._id) : 
                this.onSubmitApply.bind(this, task._id)}
                value = {task.buttonId === "pending"? "Disapply" : 
                "Apply"}
              >
              </input>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </ul>
    );
  }
  // render() {
  //   return (
  //     <ul>
  //       {this.state.tasks.map(task => (
  //         <li>
  //           <p>
  //             Name: {task.name}
  //             <br />
  //             Description: {task.description}
  //             <br />
  //             Type: {task.type}
  //             <br />
  //             Deadline: {task.deadline}
  //             <br />
  //             Hours: {task.hours}
  //             <br />
  //             Min Credits/Hr: {task.minCreditsHour}
  //             <br />
  //             Max Credits/Hr: {task.maxCreditsHour}
  //             <br />
  //             Chosen Credit Hour: {task.chosenCreditHour}
  //             <br />
  //             Penalty: {task.creditsPenalty}
  //             <br />
  //             Years of Experience: {task.yearsOfExperience}
  //             <br />
  //             Contract Signed: {task.contractSigned}
  //             <br />
  //             Candidate Role: {task.candidateRole}
  //             <br />
  //             Required Skills:{" "}
  //             {task.requiredSkills.map(requiredSkills => (
  //               <li>{requiredSkills}</li>
  //             ))}
  //             <br />
             
  //             <br />
  //             <input
  //               type="button"
  //               className="btn btn-primary"
  //               onClick={task.buttonId === "pending"? this.onSubmitDisapply.bind(this, task._id) : 
  //               this.onSubmitApply.bind(this, task._id)}
  //               value = {task.buttonId === "pending"? "Disapply" : 
  //               "Apply"}
  //             >
  //             </input>
  //           </p>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  //}
}
