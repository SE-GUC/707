import axios from "axios";
import React, { Component } from "react";
import Table from "react-bootstrap/Table";
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
        "http://localhost:5000/api/admins/project/tasks/" +
          this.props.projectID,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        const tasks = res.data.data;
        this.setState({ tasks });
      });
  }
  onSubmit(id) {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios
      .delete(
        "http://localhost:5000/api/admins/project/tasks/" +
          this.props.projectID +
          "/" +
          id,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        this.rerender(token);
      }).catch(e =>{
        alert(e)
    });
  }
  rerender(token) {
    axios
      .get(
        "http://localhost:5000/api/admins/project/tasks/" +
          this.props.projectID,
        {
          headers: {
            Authorization: token
          }
        }
      )
      .then(res => {
        const tasks = res.data.data;
        this.setState({ tasks });
      }).catch(e =>{
        alert(e)
    });
  }

  render(){
return(
  <ul>
        <Table responsive striped bordered hover variant="dark">
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
              <th>Project Type</th>
              <th>Signed Contract</th>
              <th>Required Skills</th>
              <th>Project Deadline</th>
              <th>Status</th>
              <th>Candidate Role</th>
              <th>Task Cycle</th>
              <th>Delete</th>
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
                    <li>
                      Description: {cycle.description}
                      <br />
                      Status: {cycle.status}
                      <br />
                      Percentage: {cycle.percentage}
                    </li>
                  ))}
                </td>

               
                <td>
                  {" "}
                  <button
                    id="btn2"
                    className="btn btn-primary"
                    onClick={this.onSubmit.bind(this, task._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </ul>
);

  }
//   render() {
//     if(!(this.state.tasks === []))
//     return (
//       <ul>
//         {this.state.tasks.map(task => (
//           <li>
//             <p>
//               Name: {task.name}
//               <br />
//               Description: {task.description}
//               <br />
//               Type: {task.type}
//               <br />
//               Deadline: {task.deadline}
//               <br />
//               Hours: {task.hours}
//               <br />
//               Min Credits/Hr: {task.minCreditsHour}
//               <br />
//               Max Credits/Hr: {task.maxCreditsHour}
//               <br />
//               Chosen Credit Hour: {task.chosenCreditHour}
//               <br />
//               Penalty: {task.creditsPenalty}
//               <br />
//               Years of Experience: {task.yearsOfExperience}
//               <br />
//               Contract Signed: {task.contractSigned}
//               <br />
//               Candidate Role: {task.candidateRole}
//               <br />
//               Required Skills:{" "}
//               {task.requiredSkills.map(requiredSkills => (
//                 <li>{requiredSkills}</li>
//               ))}
//               <br />
//               Status: {task.status} <br />
//               Life Cycle:{" "}
//               {task.taskcycle.map(cycle => (
//                 <li>
//                   Description: {cycle.description}
//                   <br />
//                   Status: {cycle.status}
//                   <br />
//                   Percentage: {cycle.percentage}
//                 </li>
//               ))}
//               <br />
//               <button
//                 type="button"
//                 className="btn btn-danger"
//                 onClick={this.onSubmit.bind(this, task._id)}
//               >
//                 Delete
//               </button>
//             </p>
//           </li>
//         ))}
//       </ul>
//     )
//     else
//       return(
//       <p>NO TASKS FOR THIS PROJECT</p>
//      )
//   }
}
